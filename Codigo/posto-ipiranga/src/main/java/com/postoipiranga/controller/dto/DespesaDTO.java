package com.postoipiranga.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DespesaDTO {

    @JsonProperty("descricao")
    private String descricao;
    @JsonProperty("valor")
    private Double valor;
}
