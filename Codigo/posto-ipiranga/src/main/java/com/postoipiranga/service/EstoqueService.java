package com.postoipiranga.service;

import com.postoipiranga.controller.dto.EstoqueDTO;
import com.postoipiranga.controller.dto.response.EstoqueResponseDTO;
import com.postoipiranga.model.EstoqueModel;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.repository.EstoqueRepository;
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
public class EstoqueService {

    private final EstoqueRepository estoqueRepository;
    private final ProductService productService;

    public EstoqueService(EstoqueRepository estoqueRepository, ProductService productService) {
        this.estoqueRepository = estoqueRepository;
        this.productService = productService;
    }

    @Transactional
    public EstoqueModel save(EstoqueDTO estoqueDTO) throws Exception {
        Optional<ProductModel> producEstoque = productService.findById(estoqueDTO.getProductId());
        if (producEstoque.isEmpty()) {
            throw new Exception("Nao possui esse produto");
        }
        EstoqueModel estoqueModel = new EstoqueModel();
        estoqueModel.setDataAtualizacao(String.valueOf(Date.valueOf(LocalDate.now())));
        estoqueModel.setProductId(producEstoque.get());
        estoqueModel.setProductName(producEstoque.get().getNome());
        estoqueModel.setQuantidade(estoqueDTO.getQuantidade());
        return estoqueRepository.save(estoqueModel);
    }

    @Transactional
    public EstoqueModel save(final long id, final EstoqueDTO estoqueDTO) throws Exception {

        final var estoque = this.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estoque não encontrado"));

        estoque.setDataAtualizacao(String.valueOf(Date.valueOf(LocalDate.now())));
        estoque.setQuantidade(estoqueDTO.getQuantidade());

        return estoqueRepository.save(estoque);
    }

    public List<EstoqueResponseDTO> findAll() {
        final var estoque = estoqueRepository.findAll();
        final var estoqueList = new ArrayList<EstoqueResponseDTO>();

        if (!estoque.isEmpty()) {
            for (EstoqueModel estoqueModel : estoque) {
                final var estoqueDTO = new EstoqueResponseDTO();
                estoqueDTO.setId(estoqueModel.getId());
                estoqueDTO.setDataAtualizacao(String.valueOf(LocalDate.now()));
                estoqueDTO.setNomeProduto(estoqueModel.getProductName());
                estoqueDTO.setQuantidade(estoqueModel.getQuantidade());

                estoqueList.add(estoqueDTO);
            }
        }

        return estoqueList;
    }

    public boolean existsById(long id) {
        return estoqueRepository.existsById(id);
    }

    public Optional<EstoqueModel> findById(Long id) {
        return estoqueRepository.findById(id);
    }

    @Transactional
    public Optional<EstoqueModel> delete(Long id) {
        Optional<EstoqueModel> estoqueModelDeletado = estoqueRepository.findById(id);

        estoqueModelDeletado
                .ifPresent(estoqueModel
                        -> estoqueModel.setQuantidade(0L));

        estoqueRepository.save(estoqueModelDeletado.get());

        return estoqueModelDeletado;
    }

    public String dateFormat(LocalDate date) {

        String pattern = "dd/MM/yyyy";
        final var formatter = DateTimeFormatter.ofPattern(pattern);

        return date.format(formatter);
    }
}
