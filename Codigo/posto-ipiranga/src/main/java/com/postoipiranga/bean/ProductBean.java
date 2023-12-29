package com.postoipiranga.bean;

import java.math.BigDecimal;
import java.math.BigInteger;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductBean {
    private Long id;
    private Long quantidade;
    private String nome;
    private String marca;
    private String unidadeMedida;
    private Double preco;

    public ProductBean(Object[] result){
        this.id = (Long) result[0];
        this.quantidade = (Long) result[1];
        this.nome = (String) result[2];
        this.marca = (String) result[3];
        this.preco = (Double) result[4];
        this.unidadeMedida = (String) result[5];
    }

}
