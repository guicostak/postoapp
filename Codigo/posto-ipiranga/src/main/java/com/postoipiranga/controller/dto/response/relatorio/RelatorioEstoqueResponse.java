package com.postoipiranga.controller.dto.response.relatorio;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RelatorioEstoqueResponse {

    @JsonProperty("descricao")
    private String descricao;

    @JsonProperty("marca")
    private String marca;

    @JsonProperty("unidade_medida")
    private String unidadeMedida;

    @JsonProperty("quantidade")
    private Long quantidade;

    @JsonProperty("valor")
    private Double valor;
}
