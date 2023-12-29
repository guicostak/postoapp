package com.postoipiranga.controller.dto.response;

import lombok.Data;

@Data
public class ReceitaResponseDTO {

    private Long id;
    private String nome;
    private double preco;

    private String dataTransacao;

    private Long quantidade;

    private double precoTotal;
}
