package com.example.SpringMongoProject.Services;
import com.example.SpringMongoProject.Repo.Userrepo;
import com.example.SpringMongoProject.document.Users;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service

public class UserService {

    private final Userrepo userrepo;
    public boolean userExistsByEmail(String email) {
        return userrepo.existsByemail(email);
    }
    public Users addUser(Users user) {
        if (userExistsByEmail(user.getEmail())) {
            return null;
        }
        // User does not exist, add the new user

        return userrepo.save(user);
    }


    public List<Users> getAllUsers(){
        return userrepo.findAll();
    }

    public Optional<Users> getUserById(int userId) {
        return userrepo.findById(userId);
    }


}
