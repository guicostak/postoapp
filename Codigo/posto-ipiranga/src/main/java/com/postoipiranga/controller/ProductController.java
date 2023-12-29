package com.postoipiranga.controller;

import com.postoipiranga.controller.dto.MessageDTO;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/produtos")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts() {

        try {
            final var response = productService.findAll();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable @Valid final long id) {

        try {
            if(productService.existsById(id)){
                final var response = productService.findById(id);
                return ResponseEntity.ok(response);
            }else{
                final var message = new MessageDTO("Product with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("detalhado/{id}")
    public ResponseEntity<?> getProductByIdDetalhado(@PathVariable @Valid final long id) {

        try {
            if(productService.existsById(id)){
                final var response = productService.findProductDetalhado(id);
                return ResponseEntity.ok(response);
            }else{
                final var message = new MessageDTO("Product with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("detalhados")
    public ResponseEntity<?> getProductsByIdDetalhados() {

        try {
            final var response = productService.findProductsDetalhados();
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody @Valid final ProductModel productModel) {

        try {
            final var response = productService.save(productModel);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable final long id, @RequestBody @Valid final ProductModel productModel) {

        try {

            if (productService.existsById(id)) {
                productModel.setId(id);
            } else {
                final var message = new MessageDTO("Product with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }

            final var response = productService.save(productModel);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable final long id) {

        try {

            if (productService.existsById(id)) {

                final var response = productService.delete(id);

                return ResponseEntity.ok(response);
            } else {
                final var message = new MessageDTO("Product with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e);
        }
    }
}
