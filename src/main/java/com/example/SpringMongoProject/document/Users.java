package com.example.SpringMongoProject.document;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.management.Query;
import java.time.LocalDate;
import java.util.List;

@Data
@Document
public class Users {
    private int id;
    private String employeeName;
    private String phoneNumber;
    private String position;
    private String address;
    private int experience;
    private String email;
    private List<Certification> certifications;

    public Users(int id, String employeeName,
                 String phoneNumber, String position, String address,
                 int experience, String email,List<Certification> certifications) {
        this.id = id;
        this.employeeName = employeeName;
        this.phoneNumber = phoneNumber;
        this.position = position;
        this.address = address;
        this.experience = experience;
        this.email = email;
        this.certifications = certifications;
    }


}


