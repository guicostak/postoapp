package com.postoipiranga.service.relatorio.strategy;

import com.postoipiranga.controller.dto.response.relatorio.RelatorioReceitaResponse;
import com.postoipiranga.controller.dto.response.relatorio.RelatorioReceitas;
import com.postoipiranga.model.ReceitaModel;
import com.postoipiranga.model.enums.TipoRelatorioEnum;
import com.postoipiranga.repository.EstoqueRepository;
import com.postoipiranga.repository.ReceitaRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class EmitirRelatorioReceitasStrategy implements RelatorioStrategy<RelatorioReceitaResponse> {

    private final EstoqueRepository estoqueRepository;

    private final ReceitaRepository receitaRepository;

    public EmitirRelatorioReceitasStrategy(EstoqueRepository estoqueRepository, ReceitaRepository receitaRepository) {
        this.estoqueRepository = estoqueRepository;
        this.receitaRepository = receitaRepository;
    }

    @Override
    public RelatorioReceitaResponse execute() {

        final var receitas = receitaRepository.findAll();
        final var response = new RelatorioReceitaResponse();
        final var listaReceitas = new ArrayList<RelatorioReceitas>();

        for (ReceitaModel receitaModel : receitas) {
            var receitaResponse = new RelatorioReceitas();
            receitaResponse.setData(receitaModel.getDataTransacao());
            receitaResponse.setValor(receitaModel.getProductId().getPreco());
            receitaResponse.setProduto(receitaModel.getProductId().getNome());
            receitaResponse.setQuantidade(receitaModel.getQuantidade());

            listaReceitas.add(receitaResponse);
        }

        final var valorTotal = receitaRepository.somarValores();

        response.setReceitas(listaReceitas);
        response.setValorTotal(valorTotal);

        return response;
    }

    @Override
    public TipoRelatorioEnum applyTo() {
        return TipoRelatorioEnum.RECEITA;
    }
}
