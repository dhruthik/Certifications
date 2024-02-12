package com.example.SpringMongoProject.Controller;
import com.example.SpringMongoProject.Repo.Userrepo;
import com.example.SpringMongoProject.Services.UserService;
import com.example.SpringMongoProject.document.Users;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("users")
@AllArgsConstructor

public class UserController {

    private final UserService userService;

    @GetMapping
    public List<Users> fetchAllUsers(){
        return userService.getAllUsers();

    }

    @GetMapping("/{userId}")

    public ResponseEntity<Users> getUserById(@PathVariable int userId) {
        Optional<Users> user = userService.getUserById(userId);

        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    private boolean userExists(Userrepo repository, Users user) {
        // Check if a user email already exists in the repository
        return repository.existsByemail(user.getEmail());
    }

    @PostMapping("/add")
    public Users addUser(@RequestBody Users user) {

        return userService.addUser(user);
    }

}
