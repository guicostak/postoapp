import './BotaoCadastroLogin.scss'
import { Link } from 'react-router-dom';

const BotaoCadastroLogin = ({path, text, rightPosition, leftPosition}) => {
    return(
      <Link to={path}> <button style={{right: rightPosition, left: leftPosition, borderTopLeftRadius: rightPosition == 0 ? '10px' : '', borderTopRightRadius: leftPosition == 0 ? '10px' : ''}} className="botao-cadastro-login" type="button">{text}</button> </Link> 
    )
}

export default BotaoCadastroLogin;