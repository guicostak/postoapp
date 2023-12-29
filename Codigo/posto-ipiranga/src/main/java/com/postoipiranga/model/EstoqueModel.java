package com.postoipiranga.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Estoque")
@Getter
@Setter
public class EstoqueModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="produto_id", nullable=false)
    private ProductModel productId;
    @Column(name = "nome_produto")
    private String productName;
    @Column(length = 150, nullable = false)
    private String dataAtualizacao;
    @Column(nullable = false)
    private Long quantidade;
}
