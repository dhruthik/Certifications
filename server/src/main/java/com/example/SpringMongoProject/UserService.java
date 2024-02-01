package com.example.SpringMongoProject;

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
