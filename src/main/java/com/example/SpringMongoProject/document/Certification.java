package com.example.SpringMongoProject.document;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Certification {
    private String cid;
    private String certificationName;
    private int status;
    private String cost;
    private String type;
    private String level;
    private String experience;
    private String prerequisite;
    private String startDate;
    private String endDate;

    public Certification(String cid, String certificationName, int status, String cost, String type, String level,
                         String experience, String prerequisite, String startDate, String endDate) {
        this.cid = cid;
        this.certificationName = certificationName;
        this.status = status;
        this.cost = cost;
        this.type = type;
        this.level = level;
        this.experience = experience;
        this.prerequisite = prerequisite;
        this.startDate = startDate;
        this.endDate = endDate;
    }


}