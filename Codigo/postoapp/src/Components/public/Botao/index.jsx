import './Botao.scss'

const Botao = ({type, text, botaoSubmit, altura}) => {
    return(
        <>
        <button style={{height: altura}} onClick={botaoSubmit} className='botao' type={type}>{text}</button>
        </>
    )
}

export default Botao