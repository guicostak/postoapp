package com.postoipiranga.controller;

import com.postoipiranga.controller.dto.EstoqueDTO;
import com.postoipiranga.controller.dto.MessageDTO;
import com.postoipiranga.service.EstoqueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/estoque")
public class EstoqueController {
    private final EstoqueService estoqueService;

    public EstoqueController(EstoqueService estoqueService) {
        this.estoqueService = estoqueService;

    }

    @GetMapping
    public ResponseEntity<?> getAllEstoque() {

        try {
            final var response = estoqueService.findAll();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEstoqueById(@PathVariable @Valid final long id) {

        try {
            if (estoqueService.existsById(id)) {
                final var response = estoqueService.findById(id);
                return ResponseEntity.ok(response);
            } else {
                final var message = new MessageDTO("Product with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody @Valid final EstoqueDTO estoqueDTO) {

        try {
            final var response = estoqueService.save(estoqueDTO);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable final long id, @RequestBody @Valid final EstoqueDTO estoqueDTO) {

        try {

            if (estoqueService.existsById(id)) {
                estoqueDTO.setId(id);
            } else {
                final var message = new MessageDTO("Estoque with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }

            final var response = estoqueService.save(id, estoqueDTO);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable final long id) {

        try {

            if (estoqueService.existsById(id)) {

                final var response = estoqueService.delete(id);

                return ResponseEntity.ok(response);
            } else {
                final var message = new MessageDTO("Estoque with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }
}
