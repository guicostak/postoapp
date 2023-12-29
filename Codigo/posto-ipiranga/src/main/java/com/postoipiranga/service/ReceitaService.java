package com.postoipiranga.service;

import com.postoipiranga.controller.dto.ReceitaDTO;
import com.postoipiranga.controller.dto.response.ReceitaResponseDTO;
import com.postoipiranga.model.EstoqueModel;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.model.ReceitaModel;
import com.postoipiranga.repository.EstoqueRepository;
import com.postoipiranga.repository.ReceitaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {
    private final ReceitaRepository receitaRepository;
    private final EstoqueRepository estoqueRepository;
    private final ProductService productService;

    public ReceitaService(EstoqueRepository estoqueRepository, ProductService productService, ReceitaRepository receitaRepository) {
        this.estoqueRepository = estoqueRepository;
        this.productService = productService;
        this.receitaRepository = receitaRepository;
    }

    @Transactional
    public ReceitaModel save(ReceitaDTO receitaDTO) throws Exception {
        Optional<ProductModel> producReceita = productService.findById(receitaDTO.getProductId());
        if (producReceita.isEmpty()) {
            throw new Exception("Nao possui esse produto");
        }
        modificarEstoqueMais(receitaDTO, producReceita.get());

        ReceitaModel receitaModel = new ReceitaModel();
        receitaModel.setDataTransacao(Date.valueOf(LocalDate.now()).toString());
        receitaModel.setProductId(producReceita.get());
        receitaModel.setQuantidade(receitaDTO.getQuantidade());
        receitaModel.setPrecoTotal(producReceita.get().getPreco());
        receitaModel.setPrecoTotal(receitaDTO.getQuantidade() * producReceita.get().getPreco());

        return receitaRepository.save(receitaModel);

    }

    @Transactional
    public ReceitaModel save(final long id, final ReceitaDTO receitaDTO) throws Exception {

        final var receita = this.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Receita não encontrado"));

        final var estoque = estoqueRepository.findByProductId(receita.getProductId());

        if(receitaDTO.getQuantidade() > estoque.get().getQuantidade()){
            throw new Exception("A quantidade de produtos vendidos não pode ser maior que o estoque");
        }

        estoque.get().setQuantidade((estoque.get().getQuantidade() + receita.getQuantidade())
                - receitaDTO.getQuantidade());

        estoqueRepository.save(estoque.get());

        receita.setQuantidade(receitaDTO.getQuantidade());
        receita.setDataTransacao(Date.valueOf(LocalDate.now()).toString());

        return receitaRepository.save(receita);
    }

    public void modificarEstoqueMais(ReceitaDTO receitaDTO, ProductModel productModel) throws Exception {
        Optional<EstoqueModel> estoqueReceita = estoqueRepository.findByProductId(productModel);
        if (estoqueReceita.isEmpty()) {
            EstoqueModel estoqueModel = new EstoqueModel();
            estoqueModel.setProductId(productModel);
            estoqueModel.setQuantidade(0L);
            estoqueModel.setDataAtualizacao(dateFormat(LocalDate.now()));
            estoqueRepository.save(estoqueModel);
        } else {
            if (estoqueReceita.get().getQuantidade() < receitaDTO.getQuantidade()) {
                throw new Exception("Vendendo mais produtos do que disponivel !!");
            }
            estoqueReceita.get().setDataAtualizacao(dateFormat(LocalDate.now()));
            estoqueReceita.get().setQuantidade(estoqueReceita.get().getQuantidade() - receitaDTO.getQuantidade());
            estoqueRepository.save(estoqueReceita.get());
        }
    }

    public List<ReceitaModel> findAll() {
        return receitaRepository.findAll();
    }

    public List<ReceitaResponseDTO> findReceitas() {
        final var receitas = receitaRepository.findAll();
        final var receitaList = new ArrayList<ReceitaResponseDTO>();

        if (!receitas.isEmpty()) {
            for (ReceitaModel receitaModel : receitas) {
                final var receitaDTO = new ReceitaResponseDTO();
                receitaDTO.setId(receitaModel.getId());
                receitaDTO.setDataTransacao(dateFormat(LocalDate.parse(receitaModel.getDataTransacao())));
                receitaDTO.setNome(receitaModel.getProductId().getNome());
                receitaDTO.setQuantidade(receitaModel.getQuantidade());
                receitaDTO.setPreco(receitaModel.getProductId().getPreco());
                receitaDTO.setPrecoTotal(receitaModel.getPrecoTotal());

                receitaList.add(receitaDTO);
            }
        }

        return receitaList;
    }

    public boolean existsById(long id) {
        return receitaRepository.existsById(id);
    }

    public Optional<ReceitaModel> findById(Long id) {
        return receitaRepository.findById(id);
    }

    @Transactional
    public Optional<ReceitaModel> delete(Long id) {
        Optional<ReceitaModel> receitaModelDeletado = receitaRepository.findById(id);
        if (receitaModelDeletado.isEmpty()) {
            throw new Error("Nao existe receita !");
        }

        receitaModelDeletado.get().getQuantidade();
        receitaModelDeletado.get().getProductId().getId();

        modificarEstoqueMenos(receitaModelDeletado.get(), receitaModelDeletado.get().getProductId());

        receitaRepository.deleteById(id);
        return receitaModelDeletado;
    }

    public void modificarEstoqueMenos(ReceitaModel receitaModelDeletado, ProductModel productModel) {
        Optional<EstoqueModel> estoqueReceita = estoqueRepository.findByProductId(productModel);
        if (estoqueReceita.isEmpty()) {
            EstoqueModel estoqueModel = new EstoqueModel();
            estoqueModel.setProductId(productModel);
            estoqueModel.setQuantidade(receitaModelDeletado.getQuantidade());
            estoqueModel.setDataAtualizacao(receitaModelDeletado.getDataTransacao());
            estoqueRepository.save(estoqueModel);
        } else {
            estoqueReceita.get().setDataAtualizacao(receitaModelDeletado.getDataTransacao());
            estoqueReceita.get().setQuantidade(estoqueReceita.get().getQuantidade() + receitaModelDeletado.getQuantidade());
            estoqueRepository.save(estoqueReceita.get());
        }
    }

    public String dateFormat(LocalDate date) {

        String pattern = "dd/MM/yyyy";
        final var formatter = DateTimeFormatter.ofPattern(pattern);

        return date.format(formatter);
    }
}
