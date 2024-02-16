package com.example.SpringMongoProject.Services;
import com.example.SpringMongoProject.document.Users;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SearchRepoImpl implements SearchRepo{

    @Autowired
    MongoClient mongoClient;
    @Autowired
    MongoConverter converter;

    @Override
    public List<Users> findByText(String text) {
        final List<Users> users = new ArrayList<>();

        MongoDatabase database = mongoClient.getDatabase("certifications");
        MongoCollection<Document> collection = database.getCollection("users");
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$match",
                        new Document("certifications",
                                new Document("$elemMatch",
                                        new Document("certificationName", text)))),
                new Document("$sort",
                        new Document("experience", 1L))));

        result.forEach(doc->users.add(converter.read(Users.class,doc)));

        return users;
    }
}