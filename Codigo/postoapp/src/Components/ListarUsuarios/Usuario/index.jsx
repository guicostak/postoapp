import { useState, useEffect } from 'react';
import './Usuario.scss'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Usuario = ({email}) => {
    const [dadosUsuario, setDadosUsuario] = useState({
        nomeCompleto: "",
        perfil: "",
        email: "",
        telefone: "",
        statusUsuario: "",
        senha: ""
      });
      const navigate = useNavigate();

    function formatarTelefone(telefone) {
        // Remove todos os caracteres não numéricos do número de telefone
        const numeroLimpo = telefone.replace(/\D/g, '');
      
        // Verifica o comprimento do número e formata de acordo com o padrão desejado
        if (numeroLimpo.length === 11) {
          // Formato para números de telefone com 11 dígitos (DDDCelular)
          return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (numeroLimpo.length === 10) {
          // Formato para números de telefone com 10 dígitos (DDDFixo)
          return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
          // Retorna o número sem formatação se não corresponder a nenhum padrão
          return numeroLimpo;
        }
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
            console.log(responseData);
      
            setDadosUsuario((prevDadosUsuario) => ({
              ...prevDadosUsuario,
              nomeCompleto: responseData.nomeCompleto,
              perfil: responseData.perfil,
              email: responseData.email,
              telefone: formatarTelefone(responseData.telefone),
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
      
        fetchUserData(); // Chama a função quando o componente montar
      
      }, []); 

    const handleClick = async (e) =>{
       
            e.preventDefault();
              Swal.fire({
                title: 'Editar Dados do Usuário',
                html: `
                    <div class="textfield-alterar-dados">
                    <label class="label">Nome Completo </label>
                  <input maxlength="100" id="nome" class="swal2-input" placeholder="Nome Completo" value="${dadosUsuario.nomeCompleto}">
                    </div>
                    
                    <div class="textfield-alterar-dados">
                  <label class="label">Email </label>
                  <input maxlength="100"  id="email" class="swal2-input" placeholder="Email" value="${dadosUsuario.email || ''}">
                  </div>

                  <div class="textfield-alterar-dados">
                  <label class="label">Telefone </label>
                  <input  maxlength="15" id="telefone" class="swal2-input" type="text" placeholder="Telefone" value="${dadosUsuario.telefone || ''}">
                  </div>

                  <div class="textfield-alterar-dados">
                  <label class="label">Senha </label>
                  <input maxlength="50" id="senha" class="swal2-input" placeholder="Senha" type="text" value="${dadosUsuario.senha || ''}">
                  </div> 
                  
                  `,
                confirmButtonText: 'Salvar',
                showCancelButton: true,
                cancelButtonText: 'Excluir',
                cancelButtonColor: '#d33',
                focusConfirm: false,

                preConfirm: () => {
                  let nomeCompleto = document.getElementById('nome').value;
                  let email = document.getElementById('email').value;
                  let telefone = document.getElementById('telefone').value;;
                  let senha = document.getElementById('senha').value;
                  let status = true
                  let perfil = dadosUsuario.perfil     

                  telefone = telefone.replace(/\D/g, '');
              
                  const userData = {
                    nomeCompleto,
                    perfil,
                    email,
                    telefone,
                    status,
                    senha,
                  };

                  console.log(userData)

                  fetch(`http://localhost:7000/usuarios/${localStorage.getItem('userID')}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                  })
                    .then((response) => {
                      if (response.ok) {
                        // Data updated successfully
                        return response.json();
                      } else {
                        // Handle error case here
                        throw new Error('Failed to update user data');
                      }
                    })
                    .then((updatedUserData) => {
                      // Handle the updated user data as needed
                      console.log('User data updated:', updatedUserData);
                      Swal.fire('Dados atualizados com sucesso!', '', 'success');
                      window.location.reload();
                    })
                    .catch((error) => {
                      console.error('Error updating user data:', error);
                      Swal.fire('Erro ao atualizar dados', error.message, 'error');
                    });
            
                },
              }).then(async (result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                  try {
                    const response = await fetch(`http://localhost:7000/usuarios/${localStorage.getItem('userID')}`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },                   
                    });
                
                    if (!response.ok) {
                      throw new Error('Não foi possível enviar os dados');
                    }                                    
                    localStorage.setItem('status', '')
                    navigate('/');
                    
                  } catch (error) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Erro ao enviar os dados',
                      text: error.message,
                    });
                  }
                } 
              });
              
    }
    var truncatedEmail = (email.length > 22) ? email.slice(0, 22) + '...' : email;
    return(
        <div className="col-md-12 usuario container-fluid" style={{}}>
            <span>Logado como: <br/>{truncatedEmail}</span>
            <br/>
            <a onClick={handleClick} id='verPerfil'>Ver perfil</a>
        </div> 
    )
}

export default Usuario