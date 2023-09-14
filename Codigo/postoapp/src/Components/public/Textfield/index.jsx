import './Textfield.scss'

const Textfield = ({vetor, textLabel, inputType, inputPlaceholder, mostrarSenha, inputValue, inputOnchange, idName, maxL}) => {

    
    return(
        <div className="textfield">
            <div className='label-block'>
            {vetor}
            <label>{textLabel}</label>
            </div>
            <div className='input-block'>
            <input autoComplete='off'  maxLength={maxL} id={idName} onChange={inputOnchange} value={inputValue} type={inputType} placeholder={inputPlaceholder}/> {mostrarSenha}
            </div>
        </div>
    )
}

export default Textfield