package com.postoipiranga.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "DESPESA")
@Getter
@Setter
public class DespesaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 150, nullable = false)
    private String data;
    @Column(nullable = false)
    private String descricao;
    @Column(nullable = false)
    private Double valor;
}
