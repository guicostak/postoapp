import './ListarUsuarios.scss'
import { faBackspace, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Textfield from '../../Components/public/Textfield';
import BarraPesquisa from '../../Components/public/BarraPesquisa';
import Tabela from '../../Components/public/Tabela';
import LeftNavMenu from '../../Layout/LeftNavMenu';

const ListarUsuarios = () => {
    const listaThUsuarios = [
        'ID',
        'NOME',
        'EMAIL',
        'TELEFONE', 
        'STATUS', 
        'PERFIL'
    ]
    const listaDadosUsuarios = [
        'nomeCompleto',
        'perfil',
        'email', 
        'telefone',
        'status',
        'senha',
        'id'
    ]

    return(
        <main>
          <div className='conteudo-pagina'>
            <div className='col-md-2 text-center' style={{background: 'var(--main-color)', paddingTop: '1rem', padding: '0'}}>
                  <LeftNavMenu />
            </div>
            <div className='topbar col-md-9'>
       
                <h1 id="titulo">Listagem de Usuários</h1>
                <BarraPesquisa
                vetor={ <FontAwesomeIcon icon={faSearch} style={{ color: '#1879bf', fontSize: '2.2rem', transform: 'scaleX(-1)' }} />}
                />
            <Tabela 
            url={'http://localhost:7000/usuarios'}
            selectAtivo={true}
            checkAtivo={true}
            listaTh={listaThUsuarios}
            listaDados={listaDadosUsuarios}
            isUsuario={true}
            botaoAdicionar={false}
            />
            </div>
            </div>
           

        </main>
    )
}

export default ListarUsuarios