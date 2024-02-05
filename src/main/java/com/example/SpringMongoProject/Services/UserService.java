package com.example.SpringMongoProject.Services;

import com.example.SpringMongoProject.Repo.Userrepo;
import com.example.SpringMongoProject.document.Users;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service

public class UserService {

    private final Userrepo userrepo;

    public List<Users> getAllUsers(){
        return userrepo.findAll();

    }
}
