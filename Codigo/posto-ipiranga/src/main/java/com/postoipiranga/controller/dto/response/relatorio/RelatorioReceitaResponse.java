package com.postoipiranga.controller.dto.response.relatorio;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class RelatorioReceitaResponse {

    @JsonProperty("receitas")
    private List<RelatorioReceitas> receitas;

    @JsonProperty("valor_total")
    private Double valorTotal;
}
