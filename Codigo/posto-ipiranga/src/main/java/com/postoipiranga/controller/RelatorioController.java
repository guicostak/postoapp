package com.postoipiranga.controller;

import com.postoipiranga.service.relatorio.RelatorioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/relatorios")
public class RelatorioController {

    private final RelatorioService relatorioService;

    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @GetMapping()
    public ResponseEntity<?> emitirRelatorio(@RequestParam("tipoRelatorio") final String tipoRelatorio) {

        final var response = relatorioService.emitirRelatorio(tipoRelatorio);

        if(response == null){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(response);
    }
}
