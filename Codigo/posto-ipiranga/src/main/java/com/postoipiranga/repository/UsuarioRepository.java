package com.postoipiranga.repository;
import com.postoipiranga.helper.PerfilCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.postoipiranga.model.UsuarioModel;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long>{
    boolean existsById(Long id);

    boolean existsByPerfil(PerfilCliente perfil);
    UsuarioModel findByEmail(String email);
}
