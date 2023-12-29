import BarraPesquisa from '../../Components/public/BarraPesquisa';
import Tabela from '../../Components/public/Tabela';
import LeftNavMenu from '../../Layout/LeftNavMenu';


const ListarDespesas = () => {
    //LISTA DE TITULOS DAS COLUNAS
    const listaThProdutos = ['ID', 'DESCRIÇÃO', 'VALOR', 'DATA DE ALTERAÇÃO', 'OPÇÕES']

    //LISTA DE TIPO DO INPUT DE CRIAR E EDITAR NA ORDEM
    const listaTypes = ['text', 'number'];

    //LISTA DE ATRIBUTOS COMO VEM DO BANCO
    const listaDadosProdutos = ['id', 'descricao', 'valor',  'data' ]

    //LISTA DE ATRIBUTOS ALTERADOS NO UPDATE
    const listaUpdate = ['descricao', 'valor', 'id']

    //LISTA DE ATRIBUTOS CRIADOS NO CREATE
    const listaCreate = ['descricao','valor']
    

    return(
        <main>
            <div className='conteudo-pagina'>
            <div className='col-md-2 text-center' style={{background: 'var(--main-color)', paddingTop: '1rem', padding: '0'}}>
                    <LeftNavMenu />
                </div>
                <div className='topbar col-md-9'>
        
                    <h1 id="titulo">Controle de Despesas</h1>
                    <BarraPesquisa />

                    <Tabela 
                    url={'http://localhost:7000/despesas'}
                    listaTh={listaThProdutos}
                    listaDados={listaDadosProdutos}
                    listaTypes={listaTypes}
                    tipo={'despesas'}
                    listaUpdate={listaUpdate}
                    botaoAdicionar={true}
                    listaCreate={listaCreate}
                    />
                </div>
            </div>
           

        </main>
    )
}

export default ListarDespesas