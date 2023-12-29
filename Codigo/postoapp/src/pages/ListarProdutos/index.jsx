import BarraPesquisa from '../../Components/public/BarraPesquisa';
import Tabela from '../../Components/public/Tabela';
import LeftNavMenu from '../../Layout/LeftNavMenu';


const ListarProdutos = () => {
    //LISTA DE TITULOS DAS COLUNAS
    const listaThProdutos = ['ID', 'NOME', 'MARCA', 'UNIDADE DE MEDIDA', 'PREÇO', 'OPÇÕES']

    //LISTA DE TIPO DO INPUT DE CRIAR E EDITAR NA ORDEM
    const listaTypes = ['text', 'text', 'text', 'number'];

    //LISTA DE ATRIBUTOS COMO VEM DO BANCO
    const listaDadosProdutos = ['id', 'nome', 'marca', 'unidadeMedida','preco' ]

    //LISTA DE ATRIBUTOS ALTERADOS NO UPDATE
    const listaUpdate = ['nome', 'marca', 'unidadeMedida', 'preco', 'id']

    //LISTA DE ATRIBUTOS CRIADOS NO CREATE
    const listaCreate = ['nome','marca', 'unidadeMedida', 'preco']
    

    return(
        <main>
            <div className='conteudo-pagina'>
            <div className='col-md-2 text-center' style={{background: 'var(--main-color)', paddingTop: '1rem', padding: '0'}}>
                    <LeftNavMenu />
                </div>
                <div className='topbar col-md-9'>
        
                    <h1 id="titulo">Controle de Produtos</h1>
                    <BarraPesquisa />

                    <Tabela 
                    url={'http://localhost:7000/produtos'}
                    listaTh={listaThProdutos}
                    listaDados={listaDadosProdutos}
                    listaTypes={listaTypes}
                    tipo={'produtos'}
                    listaUpdate={listaUpdate}
                    botaoAdicionar={true}
                    listaCreate={listaCreate}
                    />
                </div>
            </div>
           

        </main>
    )
}

export default ListarProdutos