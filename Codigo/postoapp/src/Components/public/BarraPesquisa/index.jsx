import './BarraPesquisa.scss'
import { faBackspace, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BarraPesquisa =({inputType, inputPlaceholder }) => {

return (

    <div className='input-pesquisa'>
        <FontAwesomeIcon icon={faSearch} style={{ color: '#1879bf', fontSize: '2.2rem', transform: 'scaleX(-1)' }} />
        <input type={inputType} placeholder={inputPlaceholder}/>
    </div>

)

}

export default BarraPesquisa