package com.repmentor.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.repmentor.backend.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByGoogleId(String googleId);
}