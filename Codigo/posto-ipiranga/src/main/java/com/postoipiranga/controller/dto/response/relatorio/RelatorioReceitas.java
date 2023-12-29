package com.postoipiranga.controller.dto.response.relatorio;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RelatorioReceitas {

    @JsonProperty("data")
    private String data;

    @JsonProperty("produto")
    private String produto;

    @JsonProperty("quantidade")
    private Long quantidade;

    @JsonProperty("valor_unitario")
    private Double valor;
}
