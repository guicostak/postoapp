import './listausuarios.scss'
import { faBackspace, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Textfield from '../../Components/public/Textfield';
import BarraPesquisa from '../../Components/public/BarraPesquisa';
import Tabela from '../../Components/public/Tabela';
import LeftNavMenu from '../../Layout/LeftNavMenu';
import Usuario from '../../Components/ListarUsuarios/Usuario';

const ListarUsuarios = () => {

    return(
        <main className="container-fluid">
            <div className='row'  id="listausuarios">
            <div className='col-md-2 text-center' style={{background: 'var(--main-color)', paddingTop: '1rem'}}>
                  <LeftNavMenu />
            </div>
            <div className='topbar col-md-9'>
       
                <h1 id="titulo">Listagem de Usuários</h1>
                <BarraPesquisa
                vetor={ <FontAwesomeIcon icon={faSearch} style={{ color: '#1879bf', fontSize: '2.2rem', transform: 'scaleX(-1)' }} />}
                />
            <Tabela />
            </div>
            </div>
           

        </main>
    )
}

export default ListarUsuarios