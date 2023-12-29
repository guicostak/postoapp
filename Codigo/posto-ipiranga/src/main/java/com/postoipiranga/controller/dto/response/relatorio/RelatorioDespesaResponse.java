package com.postoipiranga.controller.dto.response.relatorio;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class RelatorioDespesaResponse {

    @JsonProperty("despesas")
    private List<RelatorioDespesas> despesas;
    @JsonProperty("valor_total")
    private double valorTotal;
}
