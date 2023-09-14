import Formulario from "../../Layout/Login/Formulario"
import './Login.scss'
import Logo from "../../Components/public/Logo"
import BotaoCadastroLogin from "../../Components/public/BotaoCadastroLogin"

const Cadastro = () => {
    return(
        <main className="login">
              <Logo 

            maxw={'18rem'}
            />

            <Formulario />

            <BotaoCadastroLogin
            path={'/cadastro'}
           text={'<< Cadastrar'} 
           leftPosition={0}
           />
        </main>
    )
}

export default Cadastro