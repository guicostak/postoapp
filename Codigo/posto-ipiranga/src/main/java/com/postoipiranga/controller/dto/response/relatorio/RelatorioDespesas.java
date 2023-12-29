package com.postoipiranga.controller.dto.response.relatorio;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RelatorioDespesas {

    @JsonProperty("data")
    private String data;

    @JsonProperty("descricao")
    private String descricao;

    @JsonProperty("valor")
    private double valor;
}
