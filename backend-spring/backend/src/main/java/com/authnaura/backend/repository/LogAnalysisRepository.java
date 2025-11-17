package com.authnaura.backend.repository;

import com.authnaura.backend.model.LogAnalysis;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogAnalysisRepository extends MongoRepository<LogAnalysis, String> {
    // That's it!

    // Spring Data will auto-generate methods like:
    // .save()
    // .findById()
    // .findAll()
    // .delete()

    // We can add custom queries later just by defining the method name:
    List<LogAnalysis> findByUserId(String userId);
}
