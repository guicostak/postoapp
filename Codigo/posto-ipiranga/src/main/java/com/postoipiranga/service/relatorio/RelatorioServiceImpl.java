package com.postoipiranga.service.relatorio;

import com.postoipiranga.model.enums.TipoRelatorioEnum;
import com.postoipiranga.service.relatorio.strategy.RelatorioStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class RelatorioServiceImpl implements RelatorioService {

    private final List<RelatorioStrategy> strategies;

    @Autowired
    public RelatorioServiceImpl(List<RelatorioStrategy> strategies) {
        this.strategies = strategies;
    }

    @Override
    public Object emitirRelatorio(String tipoRelatorio) {

        final var response = strategies
                .stream()
                .filter(strategy -> strategy.applyTo().equals(TipoRelatorioEnum.valueOf(tipoRelatorio
                        .toUpperCase(Locale.ROOT))))
                .findFirst();

        return response.map(RelatorioStrategy::execute).orElse(null);
    }
}
