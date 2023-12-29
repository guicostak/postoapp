package com.postoipiranga.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class MessageDTO {

    @JsonProperty("message")
    private String message;

    public MessageDTO(final String message){
        this.message = message;
    }
}
