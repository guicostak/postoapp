package com.postoipiranga.service.relatorio.strategy;

import com.postoipiranga.controller.dto.response.relatorio.RelatorioEstoqueResponse;
import com.postoipiranga.model.EstoqueModel;
import com.postoipiranga.model.enums.TipoRelatorioEnum;
import com.postoipiranga.repository.EstoqueRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmitirRelatorioEstoqueStrategy implements RelatorioStrategy<List<RelatorioEstoqueResponse>> {

    private final EstoqueRepository estoqueRepository;

    public EmitirRelatorioEstoqueStrategy(EstoqueRepository estoqueRepository) {
        this.estoqueRepository = estoqueRepository;
    }

    @Override
    public List<RelatorioEstoqueResponse> execute() {

        final var estoques = estoqueRepository.findAll();
        final var responseList = new ArrayList<RelatorioEstoqueResponse>();

        for (EstoqueModel estoqueModel : estoques) {
            var estoqueResponse = new RelatorioEstoqueResponse();
            estoqueResponse.setDescricao(estoqueModel.getProductName());
            estoqueResponse.setMarca(estoqueModel.getProductId().getMarca());
            estoqueResponse.setUnidadeMedida(estoqueModel.getProductId().getUnidadeMedida());
            estoqueResponse.setQuantidade(estoqueModel.getQuantidade());
            estoqueResponse.setValor(estoqueModel.getProductId().getPreco());

            responseList.add(estoqueResponse);
        }

        return responseList;
    }

    @Override
    public TipoRelatorioEnum applyTo() {
        return TipoRelatorioEnum.ESTOQUE;
    }
}
