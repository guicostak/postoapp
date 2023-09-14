import Formulario from "../../Layout/Cadastro/Formulario"
import './Cadastro.scss'
import Logo from "../../Components/public/Logo"
import BotaoCadastroLogin from "../../Components/public/BotaoCadastroLogin"

const Cadastro = () => {
    return(
        <main className="cadastro">
              <Logo 
            maxw={'18rem'}
            />
            <Formulario />
           <BotaoCadastroLogin
           path={'/'}
           text={'Login >>'} 
           rightPosition={0}
           />
        </main>
    )
}

export default Cadastro