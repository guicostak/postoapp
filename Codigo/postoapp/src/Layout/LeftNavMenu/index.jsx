import Logo from "../../Components/public/Logo"
import ItemList from "../../Components/public/ItemList"
import { faUser, faGasPump, faBoxesStacked, faSackDollar , faMoneyCheckDollar, faFile, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Usuario from "../../Components/ListarUsuarios/Usuario";
import { useEffect, useState } from 'react';
import './LeftNavMenu.scss'
import { useNavigate } from 'react-router-dom';

const LeftNavMenu = () => {
    const [dadosUsuario, setDadosUsuario] = useState({
        nomeCompleto: "",
        perfil: "",
        email: "",
        telefone: "",
        statusUsuario: "",
        senha: ""
      });
      const perfil = localStorage.getItem('perfil');
    const [selectedItem, setSelectedItem] = useState(localStorage.getItem('itemMenu'));
    const navigate = useNavigate();

    const alterarSelecionado = (selecionado) => {
      localStorage.setItem('itemMenu', selecionado);
    }

    const logout = () => {
      localStorage.clear();
      navigate('/');
    }

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:7000/usuarios/${localStorage.getItem('userID')}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error('Não foi possível enviar os dados');
            }
      
            const responseData = await response.json();
            
      
            setDadosUsuario((prevDadosUsuario) => ({
              ...prevDadosUsuario,
              nomeCompleto: responseData.nomeCompleto,
              perfil: responseData.perfil,
              email: responseData.email,
              telefone: responseData.telefone,
              statusUsuario: responseData.status,
              senha: responseData.senha,
            }));

            localStorage.setItem('userData', JSON.stringify({
                nomeCompleto: responseData.nomeCompleto,
                perfil: responseData.perfil,
                email: responseData.email,
                telefone: responseData.telefone,
                statusUsuario: responseData.status,
                senha: responseData.senha,
              }));
        

          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao enviar os dados',
              text: error.message,
            });
          }
        };
      
        fetchUserData(); 
      
      }, []); 

    return(
   
        <div className="left-menu" style={{paddingTop: '5rem'}}>
            <div onClick={logout} className="logout-btn">
              <span>Sair</span>
              <FontAwesomeIcon icon={faRightFromBracket} style={{ color: 'var(--dark-blue)' }} />
            </div>

            <Logo 
            maxw={'10rem'}
            />
           
          
            <Usuario 
            email = {dadosUsuario.email}
            />
           
           
            <ItemList
              icone={<FontAwesomeIcon icon={faUser} style={{ color: 'var(--dark-blue)' }} />}
              categoriaNome={'Controle de Usuários'}
              categoriaPath={'listausuarios'}
              selecionado={selectedItem === 'listausuarios'} 
              clicado={() => alterarSelecionado('listausuarios')} 
              display={ perfil === 'ADMINISTRADOR'}
            />

            <ItemList
              icone={<FontAwesomeIcon icon={faGasPump} style={{ color: 'var(--dark-blue)' }} />}
              categoriaNome={'Controle de Produtos'}
              categoriaPath={'listaprodutos'}
              selecionado={selectedItem === 'listaprodutos'} 
              clicado={() => alterarSelecionado('listaprodutos')} 
              display={'true'}
            />

            <ItemList
              icone={<FontAwesomeIcon icon={faBoxesStacked} style={{ color: 'var(--dark-blue)' }} />}
              categoriaNome={'Controle de Estoque'}
              categoriaPath={'listaestoque'}
              selecionado={selectedItem === 'listaestoque'} 
              clicado={() => alterarSelecionado('listaestoque')} 
              display={ perfil === 'GERENTE' || perfil === 'ADMINISTRADOR'}
            />

             <ItemList
              icone={<FontAwesomeIcon icon={faSackDollar} style={{ color: 'var(--dark-blue)' }} />}
              categoriaNome={'Controle de Receitas'}
              categoriaPath={'listareceitas'}
              selecionado={selectedItem === 'listareceitas'} 
              clicado={() => alterarSelecionado('listareceitas')} 
              display={ perfil === 'GERENTE' || perfil === 'ADMINISTRADOR'}
            />

            <ItemList
              icone={<FontAwesomeIcon icon={faMoneyCheckDollar} style={{ color: 'var(--dark-blue)' }} />}
              categoriaNome={'Controle de Despesas'}
              categoriaPath={'listadespesas'}
              selecionado={selectedItem === 'listadespesas'} 
              clicado={() => alterarSelecionado('listadespesas')} 
              display={ perfil === 'GERENTE' || perfil === 'ADMINISTRADOR'}
            />

            <ItemList
              icone={<FontAwesomeIcon icon={faFile} style={{ color: 'var(--dark-blue)' }} />}
              categoriaNome={'Geração de Relatórios'}
              categoriaPath={'relatorios'}
              selecionado={selectedItem === 'relatorios'} 
              clicado={() => alterarSelecionado('relatorios')} 
              display={ perfil === 'GERENTE' || perfil === 'ADMINISTRADOR'}
            />
        
        </div>

    )
}

export default LeftNavMenu