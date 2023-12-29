package com.postoipiranga.controller;

import com.postoipiranga.controller.dto.EstoqueDTO;
import com.postoipiranga.controller.dto.MessageDTO;
import com.postoipiranga.controller.dto.ReceitaDTO;
import com.postoipiranga.service.ReceitaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/receita")
public class ReceitaController {
    private final ReceitaService receitaService;

    public ReceitaController(ReceitaService receitaService) {
        this.receitaService = receitaService;

    }

    @GetMapping
    public ResponseEntity<?> getAllReceita() {

        try {
            final var response = receitaService.findReceitas();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReceitaById(@PathVariable @Valid final long id) {

        try {
            if (receitaService.existsById(id)) {
                final var response = receitaService.findById(id);
                return ResponseEntity.ok(response);
            } else {
                final var message = new MessageDTO("Receita with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createReceita(@RequestBody @Valid final ReceitaDTO receitaDTO) {

        try {
            final var response = receitaService.save(receitaDTO);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReceita(@PathVariable final long id) {

        try {

            if (receitaService.existsById(id)) {

                final var response = receitaService.delete(id);

                return ResponseEntity.ok(response);
            } else {
                final var message = new MessageDTO("Estoque with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReceita(@PathVariable final long id, @RequestBody @Valid final ReceitaDTO receitaDTO) {

        try {

            if (!receitaService.existsById(id)) {
                final var message = new MessageDTO("Receita with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }

            receitaDTO.setProductId(id);

            final var response = receitaService.save(id, receitaDTO);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }
}

