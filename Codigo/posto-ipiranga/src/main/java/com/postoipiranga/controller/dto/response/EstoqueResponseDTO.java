package com.postoipiranga.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class EstoqueResponseDTO {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("data_atualizacao")
    private String dataAtualizacao;

    @JsonProperty("nome_produto")
    private String nomeProduto;

    @JsonProperty("quantidade")
    private Long quantidade;
}
