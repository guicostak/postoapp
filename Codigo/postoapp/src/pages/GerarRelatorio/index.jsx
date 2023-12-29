import LeftNavMenu from '../../Layout/LeftNavMenu';
import './GerarRelatorio.scss'
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Botao from '../../Components/public/Botao';
import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { PDFDocument } from 'pdf-lib';

const GerarRelatorio = () => {
    const [opcoesRelatorio, setOpcoesRelatorio] = useState([
        {
            name: 'despesa',
            selecionado: false
        },
        {
            name: 'receita',
            selecionado: false
        },
        {
            name: 'estoque',
            selecionado: false
        }
      ]);
      const [dadosRelatorio, setDadosRelatorio] = useState({
        despesas: [],
        receitas: [],
        estoque: [],
      });
      const [previewDisplay, setPreviewDisplay] = useState(
        {
            despesa: false,
            receita: false,
            estoque: false

        }
      );
      
      
      function buscarDadosRelatorio() {
        const opcoesSelecionadas = opcoesRelatorio.filter(opcao => opcao.selecionado);
    
        if (opcoesSelecionadas.length === 0) {
            alert("Selecione pelo menos uma opção para gerar o relatório.");
            return;
        }
    
        // Create an array of promises for all selected options
        const promessas = opcoesSelecionadas.map(opcao => {
      
            const apiUrl = `http://localhost:7000/relatorios?tipoRelatorio=${opcao.name.toUpperCase()}`;
            return fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
             
                    return { opcao: opcao, data: data };
                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                });
        });
    
        // Fetch all selected options concurrently
        Promise.all(promessas)
            .then(results => {
                const novosDadosRelatorio = { ...dadosRelatorio };
    
                // Initialize flags for each section
                const previewDisplayUpdate = { ...previewDisplay };
                opcoesSelecionadas.forEach(opcao => {
                    if (opcao.name === 'despesa') {
                        novosDadosRelatorio.despesas = results.find(result => result.opcao.name === 'despesa').data.despesas;
                        previewDisplayUpdate.despesas = true;
                    } else if (opcao.name === 'receita') {
                        novosDadosRelatorio.receitas = results.find(result => result.opcao.name === 'receita').data.receitas;
                        previewDisplayUpdate.receitas = true;
                    } else if (opcao.name === 'estoque') {
                        novosDadosRelatorio.estoque = results.find(result => result.opcao.name === 'estoque').data;
                        previewDisplayUpdate.estoque = true;
                    }
                });
    
                // Update state variables in one go
                setDadosRelatorio(novosDadosRelatorio);
                setPreviewDisplay(previewDisplayUpdate);
            });
    }
    
            

    const handleCheckboxChange = (index) => {
        const updatedOpcoesRelatorio = [...opcoesRelatorio];
        updatedOpcoesRelatorio[index].selecionado = !updatedOpcoesRelatorio[index].selecionado;
        setOpcoesRelatorio(updatedOpcoesRelatorio);
      
        const previewDisplayUpdate = { ...previewDisplay };    
        previewDisplayUpdate[opcoesRelatorio[index].name] = updatedOpcoesRelatorio[index].selecionado;
        setPreviewDisplay(previewDisplayUpdate);
      };
      

      const baixarRelatorios = async () => {
        const selectedReports = opcoesRelatorio
            .filter(opcao => opcao.selecionado)
            .map(opcao => {
                const tableSelector = `.table-${opcao.name}`;
                const table = document.querySelector(tableSelector);
    
                if (table) {
                    const pdfOptions = {
                        margin: 10,
                        filename: `Relatorio_${opcao.name}.pdf`,
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                    };
    
                    return html2pdf()
                        .from(table)
                        .set(pdfOptions)
                        .outputPdf('arraybuffer'); // Generate PDF as ArrayBuffer
                }
            });
    
        const pdfBuffers = await Promise.all(selectedReports);
    
        const mergedPdf = await PDFDocument.create();
    
        for (const pdfBuffer of pdfBuffers) {
            const pdf = await PDFDocument.load(pdfBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }
    
        const mergedPdfData = await mergedPdf.save();
    
        // Create an anchor element to trigger the download for the merged PDF
        const blob = new Blob([mergedPdfData], { type: 'application/pdf' });
        const blobURL = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = blobURL;
        a.download = 'Relatorio_Controle.pdf';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    
        // Clean up by revoking the blob URL
        URL.revokeObjectURL(blobURL);
    };
    

    return(
        <main className="container-fluid" >
            <div className='row'  id="listausuarios">
            <div className='col-md-2 text-center' style={{background: 'var(--main-color)', paddingTop: '1rem', padding: '0'}}>
                  <LeftNavMenu />
            </div>
            <div className='topbar col-md-9' style={{paddingBottom: '5rem'}}>
                <h1 id="titulo">Geração de Relatório</h1>
                <div className='card-relatorio'> 
                <div className="opcao-relatorio">
                            <input
                            type="checkbox"
                            checked={opcoesRelatorio[0].selecionado}
                            onChange={() => handleCheckboxChange(0)}
                            />
                             <span style={{cursor: 'pointer'}} onClick={() => handleCheckboxChange(0)}>Gerar relatório de despesas</span>
                            <FontAwesomeIcon icon={faFile} style={{ color: 'var(--dark-blue)' }} />
                        </div>
                        <div className="opcao-relatorio">
                            <input
                            type="checkbox"
                            checked={opcoesRelatorio[1].selecionado}
                            onChange={() => handleCheckboxChange(1)}
                            />
                              <span style={{cursor: 'pointer'}} onClick={() => handleCheckboxChange(1)}>Gerar relatório de receitas</span>
                            <FontAwesomeIcon icon={faFile} style={{ color: 'var(--dark-blue)' }} />
                        </div>
                        <div className="opcao-relatorio">
                            <input
                            type="checkbox"
                            checked={opcoesRelatorio[2].selecionado}
                            onChange={() => handleCheckboxChange(2)}
                            />
                            <span style={{cursor: 'pointer'}} onClick={() => handleCheckboxChange(2)}>Gerar relatório de estoque e produtos</span>
                            <FontAwesomeIcon icon={faFile} style={{ color: 'var(--dark-blue)' }} />
                        </div>
                    <div className='col-md-6'>
                        <Botao
                        text={'Gerar relatório'}
                        altura={'7vh'}
                        type={'submit'}
                        classe={'botao-relatorio'}
                        botaoSubmit={buscarDadosRelatorio}
                        />
                    </div>
                    <div className='preview-relatório'>

                    <table className='table table-relatorio table-despesa' style={{ display: previewDisplay.despesa ? 'table' : 'none' }}>
                        <thead>
                            <tr>
                            <th style={{color: 'white', backgroundColor: '#1879bf', fontWeight: '800', fontSize: '1.3rem'}} colSpan="3">Relatório de Despesas</th>
                            </tr>
                            <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosRelatorio.despesas.map((despesa, index) => (
                            <tr key={index}>
                                <td>{despesa.descricao}</td>
                                <td>{despesa.valor}</td>
                                <td>{despesa.data}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                    

                    <table className='table table-relatorio table-receita' style={{ display: previewDisplay.receita ? 'table' : 'none' }}>
                        <thead>
                            <tr>
                            <th style={{color: 'white', backgroundColor: '#1879bf', fontWeight: '800', fontSize: '1.3rem'}} colSpan="4">Relatório de Receitas</th>
                            </tr>
                            <tr>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor Unitário</th>
                            <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosRelatorio.receitas.map((receita, index) => (
                            <tr key={index}>
                                <td>{receita.produto}</td>
                                <td>{receita.quantidade}</td>
                                <td>{receita.valor_unitario}</td>
                                <td>{receita.data}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>


                    <table className='table table-relatorio table-estoque' style={{ display: previewDisplay.estoque ? 'table' : 'none' }}>
                        <thead>
                            <tr>
                            <th style={{color: 'white', backgroundColor: '#1879bf', fontWeight: '800', fontSize: '1.3rem'}} colSpan="5">Relatório de Estoque</th>
                            </tr>
                            <tr>
                            <th>Produto</th>
                            <th>Marca</th>
                            <th>Unidade de medida</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosRelatorio.estoque.map((estoque, index) => (
                            <tr key={index}>
                                <td>{estoque.descricao}</td>
                                <td>{estoque.marca}</td>
                                <td>{estoque.unidade_medida}</td>
                                <td>{estoque.quantidade}</td>
                                <td>{estoque.valor}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='col-md-6'>
                        <Botao
                        text={'Baixar relatórios'}
                        altura={'7vh'}
                        type={'submit'}
                        classe={'botao-relatorio'}
                        botaoSubmit={baixarRelatorios}
                        />
                    </div>

                    </div>
                </div>
            </div>
            </div>
           

        </main>
    )
}

export default GerarRelatorio