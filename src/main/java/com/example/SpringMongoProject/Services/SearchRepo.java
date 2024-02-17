package com.example.SpringMongoProject.Services;

import com.example.SpringMongoProject.document.Users;

import java.util.List;

public interface SearchRepo {

    List<Users> findByText(String text);
}
