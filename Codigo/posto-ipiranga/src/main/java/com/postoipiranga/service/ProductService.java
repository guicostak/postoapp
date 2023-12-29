package com.postoipiranga.service;

import com.postoipiranga.bean.ProductBean;
import com.postoipiranga.model.EstoqueModel;
import com.postoipiranga.model.ProductModel;
import com.postoipiranga.repository.EstoqueRepository;
import com.postoipiranga.repository.ProductRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    @PersistenceContext
    private EntityManager emf;
    private final EstoqueRepository estoqueRepository;

    public ProductService(ProductRepository productRepository, EntityManager emf, EstoqueRepository estoqueRepository) {
        this.productRepository = productRepository;
        this.emf = emf;
        this.estoqueRepository = estoqueRepository;
    }

    @Transactional
    public ProductModel save(ProductModel productModel) {
        ProductModel productModelFinal = productRepository.save(productModel);

        EstoqueModel estoqueModel = new EstoqueModel();
        estoqueModel.setProductId(productModelFinal);
        estoqueModel.setQuantidade(0L);
        estoqueModel.setProductName(productModelFinal.getNome());
        estoqueModel.setDataAtualizacao(String.valueOf(Date.valueOf(LocalDate.now())));
        estoqueRepository.save(estoqueModel);

        return productModelFinal;
    }

    public List<ProductModel> findAll() {
        return productRepository.findAll();
    }

    public boolean existsById(long id) {
        return productRepository.existsById(id);
    }

    public Optional<ProductModel> findById(Long id) {
        return productRepository.findById(id);
    }

    @Transactional
    public Optional<ProductModel> delete(Long id) throws Exception {
        Optional<ProductModel> productModelDeletado = productRepository.findById(id);
        if (productModelDeletado.isEmpty()) {
            throw new Exception("Nao existe produto !!");
        }

        Optional<EstoqueModel> estoqueModelDeletado = estoqueRepository.findByProductId(productModelDeletado.get());
        estoqueRepository.delete(estoqueModelDeletado.get());

        productRepository.deleteById(id);
        return productModelDeletado;
    }

    public ProductBean findProductDetalhado(Long id) {
        StringBuilder queryBuilder = new StringBuilder("SELECT e.produto_id as id, ");
        queryBuilder.append("e.quantidade, ");
        queryBuilder.append("p.nome, p.marca, p.preco, p.unidade_medida ");
        queryBuilder.append("FROM estoque as e, produto as p ");
        queryBuilder.append("WHERE e.produto_id = p.id ");
        queryBuilder.append("AND p.id = :id ");

        Query query = emf.createNativeQuery(queryBuilder.toString());
        query.setParameter("id", id);
        query.unwrap(NativeQuery.class).addScalar("id").addScalar("quantidade")
                .addScalar("nome").addScalar("marca").addScalar("preco").addScalar("unidade_medida");
        Object[] result = (Object[]) query.getSingleResult();
        ProductBean productBean = new ProductBean(result);
        return productBean;
    }

    public List<ProductBean> findProductsDetalhados() {
        StringBuilder queryBuilder = new StringBuilder("SELECT e.produto_id as id, ");
        queryBuilder.append("e.quantidade, ");
        queryBuilder.append("p.nome, p.marca, p.preco, p.unidade_medida ");
        queryBuilder.append("FROM estoque as e, produto as p ");
        queryBuilder.append("WHERE e.produto_id = p.id ");

        Query query = emf.createNativeQuery(queryBuilder.toString());
        query.unwrap(NativeQuery.class).addScalar("id").addScalar("quantidade")
                .addScalar("nome").addScalar("marca").addScalar("preco").addScalar("unidade_medida");
        List<Object[]> result = query.getResultList();
        List<ProductBean> listaProdutos = result.stream().map(i -> new ProductBean(i)).toList();
        return listaProdutos;
    }
}
