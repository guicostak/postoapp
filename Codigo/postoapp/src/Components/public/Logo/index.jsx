import logo from '../../../assets/img/posto-ipiranga.png'
import './Logo.scss'


const Logo = ({tamanho, maxw}) => {
    return(
    <div className={tamanho}>
        <img className='img-fluid logo' style={{maxWidth: maxw}} src={logo}/>
    </div>
    )
}

export default Logo