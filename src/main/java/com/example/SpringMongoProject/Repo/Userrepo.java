package com.example.SpringMongoProject.Repo;
import com.example.SpringMongoProject.document.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Userrepo
        extends MongoRepository<Users, Integer> {
    boolean existsByemail(String email);
    //Optional<Users> findUserByEmail(String email);

}
