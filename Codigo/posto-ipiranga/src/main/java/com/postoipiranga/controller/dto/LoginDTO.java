package com.postoipiranga.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginDTO {

    @JsonProperty("email")
    private String email;

    @JsonProperty("senha")
    private String senha;

}
