package com.example.SpringMongoProject.Repo;
import com.example.SpringMongoProject.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface Userrepo
        extends MongoRepository<Users, Integer> {
    boolean existsByemail(String email);
    //Optional<Users> findUserByEmail(String email);

}
