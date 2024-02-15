package com.example.SpringMongoProject.document;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class EmployeeCertification {
    private String cid;
    private String certificationName;
    private String cost;
    private String type;
    private String level;
    private String experience;
    private String prerequisite;

    // Constructors, getters, and setters

    public EmployeeCertification(String cid, String certificationName, String cost, String type, String level,
                                 String experience, String prerequisite) {
        this.cid = cid;
        this.certificationName = certificationName;
        this.cost = cost;
        this.type = type;
        this.level = level;
        this.experience = experience;
        this.prerequisite = prerequisite;
    }
}