package com.postoipiranga.controller;

import com.postoipiranga.model.ProductModel;
import com.postoipiranga.service.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class ProductControllerTest {

    @Mock
    private ProductService productService;
    @InjectMocks
    private ProductController productController;

    @Test
    void getAllProducts_QuandoExistirProdutos_DeveraRetornarSucesso() {

        final var productMock = this.createListOfProductModel();

        Mockito
                .when(productService.findAll())
                .thenReturn(productMock);

        final var result = productController.getAllProducts();

        Assertions.assertTrue(result.getStatusCode().is2xxSuccessful());

    }

    @Test
    void getAllProducts_QuandoNãoExistirProdutos_DeveraRetornarNotFound() {

        Mockito
                .when(productService.findAll());

        final var result = productController.getAllProducts();

        Assertions.assertTrue(result.getStatusCode().is4xxClientError());

    }

    private List<ProductModel> createListOfProductModel() {
        final var product = new ProductModel();

        product.setId(1L);
        product.setNome("Maquina");
        product.setPreco(1500L);
        product.setMarca("Britania");
        product.setUnidadeMedida("Kg");

        final List<ProductModel> products = new ArrayList<>();

        products.add(product);

        return products;
    }
}
