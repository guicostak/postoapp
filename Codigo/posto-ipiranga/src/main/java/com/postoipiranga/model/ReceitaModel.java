package com.postoipiranga.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "RECEITA")
@Getter
@Setter
public class ReceitaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private ProductModel productId;
    @Column(length = 150, nullable = false)
    private String dataTransacao;
    @Column(nullable = false)
    private Long quantidade;
    @Column(nullable = false)
    private double precoTotal;
}
