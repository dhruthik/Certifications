package com.example.SpringMongoProject;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.management.Query;
import java.time.LocalDate;

@Data
@Document
public class Users {
    private int id;
    private String employeeName;
    private int age;
    private String DOB;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String position;
    private String address;
    private int experience;

    public Users(int id, String employeeName, int age, String DOB, String email, String firstName, String lastName,
                 String phoneNumber, String position, String address, int experience) {
        this.id = id;
        this.employeeName = employeeName;
        this.age = age;
        this.DOB = DOB;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.position = position;
        this.address = address;
        this.experience = experience;
    }

}


