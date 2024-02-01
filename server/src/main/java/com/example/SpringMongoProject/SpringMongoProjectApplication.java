package com.example.SpringMongoProject;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import javax.management.Query;

@SpringBootApplication
public class SpringMongoProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringMongoProjectApplication.class, args);

	}

	@Bean
	CommandLineRunner runner(Userrepo repository, MongoTemplate mongoTemplate){

			return args -> {
				Users user = new Users(

						 3,
						"John Doe",
						 28,
						 "1994-05-15",
						 "john.doe@example.com",
						 "John",
						 "Doe",
						 "1234567890",
						"Software Developer",
						"123 Main Street, Cityville",
						3
				);



//				repository.findUserByEmail(email)
//						.ifPresentOrElse(s-> {
//					System.out.println( user + " already exists");
//				}, ()-> {
//					System.out.println("Inserting user " + user);
 					repository.insert(user);
//
//				});

			};





	}

}
