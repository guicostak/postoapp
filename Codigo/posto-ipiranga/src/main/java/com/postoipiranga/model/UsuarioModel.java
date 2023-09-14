package com.postoipiranga.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import com.postoipiranga.helper.PerfilCliente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name="USUARIO")
@Getter
@Setter
public class UsuarioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length=150, nullable=false)
    private String nomeCompleto;
    @Enumerated(EnumType.STRING)
    @Column(length=20, nullable=false)
    private PerfilCliente perfil;
    @Column(length=100, nullable=false, unique=true)
    private String email;
    @Column(length=11, nullable=false, unique=true)
    private String telefone;
    @Column(nullable=false)
    private Boolean status;
    @Column(length=150, nullable=false)
    private String senha;

}
