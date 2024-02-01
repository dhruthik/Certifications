package com.example.SpringMongoProject;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface Userrepo
        extends MongoRepository<Users, Integer> {
    //Optional<Users> findUserByEmail(String email);

}
