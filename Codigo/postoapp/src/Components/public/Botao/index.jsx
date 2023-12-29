import './Botao.scss'

const Botao = ({type, text, botaoSubmit, altura, classe}) => {
    return(
        <>
        <button style={{ height: altura }} onClick={botaoSubmit} className={`botao ${classe}`} type={type}>
            {text}
        </button>
        </>
    )
}

export default Botao