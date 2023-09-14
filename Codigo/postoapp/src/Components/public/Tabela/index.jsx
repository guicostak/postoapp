import './Tabela.scss'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Tabela = () => {
  const [listaUsuarios, setListaUsuarios] = useState([]);


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
        const response = await fetch('http://localhost:7000/usuarios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Não foi possível obter os dados');
        }

        const responseData = await response.json();
        console.log(responseData);

        const usuarios = responseData.map((usuario) => ({
          nomeCompleto: usuario.nomeCompleto,
          perfil: usuario.perfil,
          email: usuario.email,
          telefone: usuario.telefone,
          status: usuario.status,
          senha: usuario.senha,
          id: usuario.id
        }));

        setListaUsuarios(usuarios);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao obter os dados',
          text: error.message,
        });
      }
    };

    fetchUserData();
  }, []);

  const handleStatusChange = (index) => {
    if (listaUsuarios[index].status === true) {
      listaUsuarios[index].status = false;
    } else {
      listaUsuarios[index].status = true;
    }
    
    listaUsuarios[index].telefone = listaUsuarios[index].telefone.replace(/\D/g, '');
    console.log(listaUsuarios[index])  

    fetch(`http://localhost:7000/usuarios/${listaUsuarios[index].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listaUsuarios[index]),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update user data');
        }
      })
      .then((updatedUserData) => {
        console.log('User data updated:', updatedUserData);
        Swal.fire('Dados atualizados com sucesso!', '', 'success');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        Swal.fire('Erro ao atualizar dados', error.message, 'error');
      });

  };

  const handlePerfilChange = (index, value) => {
    listaUsuarios[index].perfil = value;

    listaUsuarios[index].telefone = listaUsuarios[index].telefone.replace(/\D/g, '');
    console.log(listaUsuarios[index])
   
    fetch(`http://localhost:7000/usuarios/${listaUsuarios[index].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listaUsuarios[index]),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update user data');
        }
      })
      .then((updatedUserData) => {
        console.log('User data updated:', updatedUserData);
        Swal.fire('Dados atualizados com sucesso!', '', 'success');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        Swal.fire('Erro ao atualizar dados', error.message, 'error');
      });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NOME</th>
          <th scope="col">STATUS</th>
          <th scope="col">EMAIL</th>
          <th scope="col">TELEFONE</th>
          <th scope="col">PERFIL</th>
        </tr>
      </thead>
      <tbody>
        {listaUsuarios.map((usuario, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{usuario.nomeCompleto}</td>
            <td style={{ width: '13vw' }}>
              <div className="form-check form-switch">
                <input
                  onChange={() => handleStatusChange(index)}
                  className="form-check-input"
                  type="checkbox"
                  id={`statusSwitch${index}`}
                  checked={usuario.status}
                />
                <label className="form-check-label" htmlFor={`statusSwitch${index}`}>
                  {usuario.status ? 'Ativo' : 'Inativo'}
                </label>
              </div>
            </td>
            <td>{usuario.email}</td>
            <td>{formatarTelefone(usuario.telefone)}</td>
            <td className='seleciona'>
              <select
                id='formSelect'
                className="form-select"
                value={usuario.perfil}
                onChange={(e) => handlePerfilChange(index, e.target.value)}
              >
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                <option value="CONSULTA">CONSULTA</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tabela;
