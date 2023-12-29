import './ListarEstoque.scss'
import BarraPesquisa from '../../Components/public/BarraPesquisa';
import Tabela from '../../Components/public/Tabela';
import LeftNavMenu from '../../Layout/LeftNavMenu';


const ListarEstoque = () => {
    //LISTA DE TITULOS DAS COLUNAS
    const listaTh = ['ID','QUANTIDADE', 'NOME DO PRODUTO','DATA DE ATUALIZAÇÃO', 'OPÇÕES']

    //LISTA DE TIPO DO INPUT DE CRIAR E EDITAR NA ORDEM
    const listaTypes = ['number'];

    //LISTA DE ATRIBUTOS COMO VEM DO BANCO
    const listaDados = ['id', 'quantidade', 'nome_produto', 'data_atualizacao' ]

     //LISTA DE ATRIBUTOS ALTERADOS NO UPDATE
     const listaUpdate = ['quantidade' , 'id']

    return(
        <main>
            <div className='conteudo-pagina'>
            <div className='col-md-2 text-center' style={{background: 'var(--main-color)', paddingTop: '1rem', padding: '0'}}>
                    <LeftNavMenu />
                </div>
                <div className='topbar col-md-9'>
        
                    <h1 id="titulo">Controle de Estoque</h1>
                    <BarraPesquisa />

                    <Tabela 
                    url={'http://localhost:7000/estoque'}
                    listaTh={listaTh}
                    listaDados={listaDados}
                    listaTypes={listaTypes}
                    tipo={'estoque'}
                    listaUpdate={listaUpdate}
                    botaoAdicionar={false}
                    />
                </div>
            </div>
           

        </main>
    )
}

export default ListarEstoque