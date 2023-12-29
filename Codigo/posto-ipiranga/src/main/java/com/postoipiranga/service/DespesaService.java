package com.postoipiranga.service;

import com.postoipiranga.controller.dto.DespesaDTO;
import com.postoipiranga.model.DespesaModel;
import com.postoipiranga.repository.DespesaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {
    private final DespesaRepository despesaRepository;

    public DespesaService(DespesaRepository despesaRepository) {
        this.despesaRepository = despesaRepository;
    }

    @Transactional
    public DespesaModel save(final DespesaDTO despesaDTO) throws Exception {

        final var despesa = new DespesaModel();
        despesa.setData(dateFormat(LocalDate.now()));
        despesa.setValor(despesaDTO.getValor());
        despesa.setDescricao(despesaDTO.getDescricao());

        return despesaRepository.save(despesa);

    }

    public List<DespesaModel> findAll() {
        return despesaRepository.findAll();
    }

    public boolean existsById(final long id) {
        return despesaRepository.existsById(id);
    }

    public Optional<DespesaModel> findById(final Long id) {
        return despesaRepository.findById(id);
    }

    @Transactional
    public Optional<DespesaModel> delete(final Long id) throws Exception {
        final var despesa = despesaRepository.findById(id);
        if (despesa.isEmpty()) {
            throw new RuntimeException("Despesa com o id " + id + "não existe.");
        }
        despesaRepository.deleteById(id);
        return despesa;
    }

    public DespesaModel editDespesa(final long id, final DespesaDTO data){
        final var despesa = despesaRepository.findById(id);

        if(despesa.isEmpty()){
            return null;
        }

        despesa.get().setDescricao(data.getDescricao());
        despesa.get().setValor(data.getValor());

        return despesaRepository.save(despesa.get());

    }

    public String dateFormat(LocalDate date) {

        final var pattern = "dd/MM/yyyy";
        final var formatter = DateTimeFormatter.ofPattern(pattern);

        return date.format(formatter);
    }
}
