import './ItemList.scss'
import { useNavigate } from 'react-router-dom';

const ItemList = ({ icone, categoriaNome, categoriaPath, selecionado, clicado, display}) => {
    const navigate = useNavigate();

    function handleClick () {
        navigate(`/${categoriaPath}`);
    }

    return (
        <div
        onClick={() => {
            handleClick();
            clicado(); 
        }}
        
        style={
            {
              borderRight: selecionado ? '6px solid var(--dark-blue)' : 'none',
              display: display ? 'flex' : 'none',
            }
          }

            className='itemList'
        >
            <div className='col-md-1'>
                {icone}
            </div>

            <div className='col-md-10'>
                <span>{categoriaNome}</span>
            </div>           
        </div>
    )
}


export default ItemList