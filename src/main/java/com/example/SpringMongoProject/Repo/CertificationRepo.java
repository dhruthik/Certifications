package com.example.SpringMongoProject.Repo;

import com.example.SpringMongoProject.document.Certification;
import com.example.SpringMongoProject.document.EmployeeCertification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CertificationRepo extends MongoRepository<EmployeeCertification, String> {

}
