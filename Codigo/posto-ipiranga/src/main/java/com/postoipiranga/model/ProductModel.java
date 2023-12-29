package com.postoipiranga.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PRODUTO")
@Getter
@Setter
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 150, nullable = false)
    private String nome;
    @Column(length = 150)
    private String marca;
    @Column(length = 150, nullable = false)
    private String unidadeMedida;
    @Column(nullable = false)
    private double preco;

}
