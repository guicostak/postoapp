package com.postoipiranga.service.relatorio.strategy;

import com.postoipiranga.model.enums.TipoRelatorioEnum;

public interface RelatorioStrategy<T> {

    T execute();

    TipoRelatorioEnum applyTo();
}
