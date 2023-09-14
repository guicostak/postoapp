import './ItemList.scss'
import { useNavigate } from 'react-router-dom';

const ItemList = ({ icone, categoriaNome, categoriaPath }) => {
    const navigate = useNavigate();

    function handleClick () {
        navigate(`/${categoriaPath}`);
    }

    return (
        <div onClick={handleClick} className='itemList nav-item row'>
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