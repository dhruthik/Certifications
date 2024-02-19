package com.example.SpringMongoProject;
import com.example.SpringMongoProject.Repo.Userrepo;
import com.example.SpringMongoProject.document.Users;
import com.example.SpringMongoProject.document.Certification;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Arrays;
import java.util.List;

public class UserDataInitializer {


    @Bean
    CommandLineRunner runner(Userrepo repository, MongoTemplate mongoTemplate) {
        return args -> {
            List<Users> usersList = List.of(
                    new Users(
                            1,
                            "John Doe",
                            "2890786547",
                            "Software Developer",
                            4,
                            "abc123123",
                            List.of(
                                    new Certification("certificateId1", "Associate", 0, "$75", "Associates",
                                            "Entry-level", "0-6 months", "None", "", ""),
                                    new Certification("certificateId2", "AI Associate", 1, "$75", "Associates",
                                            "Entry-level", "1-2 years", "None", "2023-12-01", ""),
                                    new Certification("certificateId3", "Admin", 2, "$200", "Admins",
                                            "Mid-level", "1-2 years", "Administrator credential", "2023-02-01",
                                            "2023-07-31")
                            )

                    )
                    // Add other users as well
            );

            for (Users newUser : usersList) {
                if (userExists(repository, newUser)) {
                    System.out.println("User already exists");
                } else {
                    repository.insert(newUser);
                    System.out.println("User added");
                }
            }
        };
    }

    private boolean userExists(Userrepo repository, Users user) {
        // Check if a user email already exists in the repository
        return repository.existsByemail(user.getEmail());
    }
}