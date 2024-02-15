package com.example.SpringMongoProject.Controller;

import com.example.SpringMongoProject.Repo.CertificationRepo;
import com.example.SpringMongoProject.document.EmployeeCertification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin

public class CertificationController {

    @Autowired
    CertificationRepo certRepo;

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/certifications")
    public List<EmployeeCertification> getCertifications(@RequestParam("collectionName") String collectionName) {
        System.out.println(collectionName);
        return mongoTemplate.findAll(EmployeeCertification.class, collectionName);
    }
}
