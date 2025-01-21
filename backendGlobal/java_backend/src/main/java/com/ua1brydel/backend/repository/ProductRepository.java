package com.ua1brydel.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ua1brydel.backend.model.Product;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByCategory(String category);
}
