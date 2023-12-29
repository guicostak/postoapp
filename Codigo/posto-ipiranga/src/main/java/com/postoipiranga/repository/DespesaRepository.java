package com.postoipiranga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.postoipiranga.model.DespesaModel;
import com.postoipiranga.model.EstoqueModel;

@Repository
public interface DespesaRepository extends JpaRepository<DespesaModel, Long> {

    @Query("SELECT SUM(d.valor) FROM DespesaModel d")
    Double somarValores();
}
