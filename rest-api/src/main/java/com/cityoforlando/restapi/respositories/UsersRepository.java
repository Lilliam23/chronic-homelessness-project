package com.cityoforlando.restapi.respositories;


import com.cityoforlando.restapi.models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends MongoRepository<Users, String> {
    @Query("{ 'username' : ?0 }")
    Optional<List<Users>> findByName(String name);
    @Query("{ 'id' : ?0 }")
    Optional<Users> findById(String id);
}
