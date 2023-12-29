package com.postoipiranga.service.relatorio.strategy;

import com.postoipiranga.controller.dto.response.relatorio.RelatorioDespesaResponse;
import com.postoipiranga.controller.dto.response.relatorio.RelatorioDespesas;
import com.postoipiranga.model.DespesaModel;
import com.postoipiranga.model.enums.TipoRelatorioEnum;
import com.postoipiranga.repository.DespesaRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class EmitirRelatorioDespesasStrategy implements RelatorioStrategy<RelatorioDespesaResponse> {

    private final DespesaRepository despesaRepository;

    public EmitirRelatorioDespesasStrategy(DespesaRepository despesaRepository) {
        this.despesaRepository = despesaRepository;
    }

    @Override
    public RelatorioDespesaResponse execute() {

        final var despesas = despesaRepository.findAll();
        final var response = new RelatorioDespesaResponse();
        final var listaDespesas = new ArrayList<RelatorioDespesas>();

        for (DespesaModel despesa : despesas) {
            var despesaResponse = new RelatorioDespesas();
            despesaResponse.setData(despesa.getData());
            despesaResponse.setValor(despesa.getValor());
            despesaResponse.setDescricao(despesa.getDescricao());

            listaDespesas.add(despesaResponse);
        }

        final var valorTotal = despesaRepository.somarValores();

        response.setDespesas(listaDespesas);
        response.setValorTotal(valorTotal);

        return response;
    }

    @Override
    public TipoRelatorioEnum applyTo() {
        return TipoRelatorioEnum.DESPESA;
    }
}
