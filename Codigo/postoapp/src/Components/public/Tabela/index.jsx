import './Tabela.scss'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tabela = ({url, selectAtivo, checkAtivo, listaTh, listaDados, listaTypes, isUsuario, tipo, listaUpdate, botaoAdicionar, listaCreate}) => {
const [lista, setLista] = useState([]);

const [editarDisplay, setEditarDisplay] = useState('none')
const [formValues, setFormValues] = useState({});
const dadosInput = Object.keys(formValues).filter((chave) => chave !== "id" && chave !== "data_atualizacao" && chave !== "nome_produto");
const[titulo, setTitulo] = useState('')

const deleteItem = (e) => {
  Swal.fire({
    title: 'Tem certeza que deseja apagar o item?',
    text: 'Essa ação não pode ser desfeita!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, apagar!',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${url}/${e}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Não foi possível enviar os dados');
          }
          Swal.fire({
            icon: 'success',
            title: 'Item apagado!',
            text: 'O item foi apagado com sucesso.',
          });
          setTimeout(recarregarPagina, 800);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar os dados',
            text: error.message,
          });
        });
    }
  });
};

const editarItem = (item) => {
  setEditarDisplay('flex');
  const formValues = {};
  
  for (const chave in item) {
    if (item.hasOwnProperty(chave) && listaUpdate.includes(chave)) {
      formValues[chave] = item[chave];
    }
  }

  setFormValues(formValues);
  setTitulo('Editar');
}

function criarFormValues(listaCampos) {
  const formValues = {};

  listaCampos.forEach((campo) => {
    if (campo.toLowerCase() !== 'id') {
      formValues[campo] = '';
    }
  });

  return formValues;
}

const criarItem = () => {
  setEditarDisplay('flex');
  setFormValues(criarFormValues(listaCreate))
  setTitulo('Criar')
}

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormValues({
    ...formValues,
    [name]: value,
  });
};


const salvar = () => {

  if(!formValues.id) {
    fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível enviar os dados');
        }
        Swal.fire({
          icon: 'success',
          title: 'Item criado!',
          text: 'O item foi criado com sucesso.',
        });
        setTimeout(recarregarPagina, 800);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao enviar os dados',
          text: error.message,
        });
      });
  }

  else{

  fetch(`${url}/${formValues.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValues), 
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Não foi possível enviar os dados');
      }
      Swal.fire({
        icon: 'success',
        title: 'Item atualizado!',
        text: 'O item foi editado com sucesso.',
      });
      setTimeout(recarregarPagina, 800);
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar os dados',
        text: error.message,
      });
    });
  }
};

function recarregarPagina() {
  window.location.reload();
}

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(url, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Não foi possível obter os dados');
        }

        const responseData = await response.json();
        
        const resposta = responseData.map((item) => {
          const obj = {};
          listaDados.forEach((prop, index) => {
            obj[prop] = item[prop];
          });
          return obj;
        });

        resposta.sort((a, b) => a.id - b.id);

        setLista(resposta);

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao obter os dados',
          text: error.message,
        });
      }
    };

    fetchUserData();
  }, [url]);

  const formatarDinheiro = (valor) => {
    return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  function formatarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');

    if (numeroLimpo.length === 11) {
      return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeroLimpo.length === 10) {
      return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numeroLimpo;
    }
  }   

  const handleStatusChange = (index) => {
    if (lista[index].status === true) {
      lista[index].status = false;
    } else {
      lista[index].status = true;
    }
    
    lista[index].telefone = lista[index].telefone.replace(/\D/g, '');

    fetch(`http://localhost:7000/usuarios/${lista[index].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lista[index]),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update user data');
        }
      })
      .then((updatedUserData) => {    
        Swal.fire('Dados atualizados com sucesso!', '', 'success');
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire('Erro ao atualizar dados', error.message, 'error');
      });
  };

  const handlePerfilChange = (index, value) => {
    lista[index].perfil = value;

    lista[index].telefone = lista[index].telefone.replace(/\D/g, '');

    fetch(`http://localhost:7000/usuarios/${lista[index].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lista[index]),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update user data');
        }
      })
      .then((updatedUserData) => {
        Swal.fire('Dados atualizados com sucesso!', '', 'success');
        window.location.reload();
      })
      .catch((error) => {

        Swal.fire('Erro ao atualizar dados', error.message, 'error');
      });
  };

  return (
    <>
    <table className="table">
    <div className='fundo-modal' style={{display: editarDisplay}}>
      <div className='modal' >
      <span className='xSair' onClick={()=>setEditarDisplay('none')}>X</span>
      <h1>{titulo} {tipo}</h1>
              {dadosInput.map((chave, index) => (
          <div className='textfield-modal' key={index}>
            <label className='label-modal'>{listaTh[index + 1]}</label>
            <input
              className='input-modal'
              type={listaTypes[index]}
              name={chave}
              value={formValues[chave]}
              onChange={handleInputChange}
            />
          </div>
        ))}
      <div className='botoes'>
        <button onClick={salvar} style={{backgroundColor: 'var(--light-blue)'}}>Salvar</button>
        <button style={{backgroundColor: '#d64e4e'}} onClick={()=>setEditarDisplay('none')} >Sair</button>
      </div>
      </div>
    </div>

      <thead>
      <tr>
        {listaTh.map((item, index) => (
          <th key={index} scope="col">{item}</th>
        ))}
      </tr>
      </thead>
      <tbody>
        {lista.map((item, index) => (
          <tr key={index}>
            {
               !isUsuario ? (
                Object.keys(item).map((key) => (
                  <td className='col-md-auto' key={key}>
                  {key === 'valor' || key === 'preco' ? formatarDinheiro(item[key]) : item[key]}
                </td>
                ))
             
              ) : (
                <>
                  <td scope="row">{item.id}</td>
                  <td>{item.nomeCompleto}</td>
                  <td>{item.email}</td>
                  <td>{formatarTelefone(item.telefone)}</td>
                </>
              )
            }
            
            <td className='opcoes col-md-auto' style={!isUsuario ? { display: 'flex' } : { display: 'none' }}> 
            <FontAwesomeIcon onClick={() =>editarItem(item)} className='opcao text-secondary' icon={faPencil} />
            <FontAwesomeIcon onClick={() => deleteItem(item.id)} className='opcao text-danger' icon={faTrash}  />
            </td>
              
            <td style={checkAtivo ? { display: 'flex-box' } : { display: 'none' }}>
              <div className="form-check form-switch">
                <input
                  onChange={() => {
                    // Verifica se o perfil é ADMINISTRADOR antes de inativar
                    if (item.perfil !== "ADMINISTRADOR") {
                      handleStatusChange(index);
                    }
                  }}
                  className="form-check-input"
                  type="checkbox"
                  id={`statusSwitch${index}`}
                  checked={item.status}
                  disabled={item.perfil === "ADMINISTRADOR"}
                  // Adicionei o atributo "disabled" se o perfil for ADMINISTRADOR
                />
                <label className="form-check-label" htmlFor={`statusSwitch${index}`}>
                  {item.status ? 'Ativo' : 'Inativo'}
                </label>
              </div>
            </td>


            <td className='seleciona' style={checkAtivo ? { display: 'flex-box' } : { display: 'none' }}>
              <select
                id='formSelect'
                className="form-select"
                value={item.perfil}
                onChange={(e) => handlePerfilChange(index, e.target.value)}
              >
                {item.perfil === "ADMINISTRADOR" ? (
                  <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                ) : (
                  <>
                    <option value="USUARIO">USUARIO</option>
                    <option value="GERENTE">GERENTE</option>
                  </>
                )}
              </select>
            </td>


          </tr>
        ))}
      </tbody> 
    </table>
       <button style={{display: botaoAdicionar? 'flex' : 'none', backgroundColor: 'var(--light-blue)'}} className='adicionar' onClick={criarItem} >Adicionar item</button>
       </>
  );
}

export default Tabela;
