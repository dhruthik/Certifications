package com.example.SpringMongoProject;
import com.example.SpringMongoProject.Repo.Userrepo;
import com.example.SpringMongoProject.document.Users;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class SpringMongoProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringMongoProjectApplication.class, args);

	}

	@Bean
	CommandLineRunner runner(Userrepo repository, MongoTemplate mongoTemplate){

			return args -> {
				List<Users> usersList = Arrays.asList(

						new Users(

						 1,
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
						),
						new Users(
								 2,
						 "Jane Smith",
						 32,
						 "1990-08-25",
						"jane.smith@example.com",
						 "Jane",
						 "Smith",
						 "9876543210",
						 "UX Designer",
						 "456 Oak Avenue, Townsville",
						 5
						),
						new Users(
								 3,
						 "Bob Johnson",
						 35,
						 "1987-11-10",
						 "bob.johnson@example.com",
						 "Bob",
						 "Johnson",
						 "4567890123",
						 "Project Manager",
						 "789 Pine Lane, Villageton",
						 8
						),
						new Users(
								 4,
						 "Alice Williams",
						 26,
						 "1996-03-18",
						 "alice.williams@example.com",
						 "Alice",
						 "Williams",
						 "8765432109",
						 "Marketing Specialist",
						 "234 Cedar Road, Hamletville",
						 2
						),
						new Users(
								 5,
						 "David Brown",
						 30,
						 "1992-07-05",
						 "david.brown@example.com",
						 "David",
						 "Brown",
						 "5432109876",
						 "Data Analyst",
						 "567 Birch Street, Suburbia",
						 4
						),
						new Users(
								 6,
						 "Eva Miller",
						 29,
						 "1993-09-12",
						 "eva.miller@example.com",
						 "Eva",
						 "Miller",
						 "2109876543",
						 "HR Specialist",
						 "890 Maple Court, Districtton",
						 6
						),
						new Users(
								 7,
						 "George Taylor",
						 31,
						 "1991-12-28",
						 "george.taylor@example.com",
						 "George",
						 "Taylor",
						 "1098765432",
						 "Sales Representative",
						 "345 Elm Square, Boroughburg",
						 7
						),
						new Users(
								 8,
						 "Hannah Anderson",
						33,
						 "1989-06-08",
						 "hannah.anderson@example.com",
						 "Hannah",
						 "Anderson",
						 "4321098765",
						 "Financial Analyst",
						 "678 Walnut Circle, Townberg",
						 9
						),
						new Users(
								 9,
						 "Isaac Hall",
						 27,
						 "1995-02-20",
						 "isaac.hall@example.com",
						 "Isaac",
						"Hall",
						 "3210987654",
						 "Quality Assurance Engineer",
						 "901 Oak Plaza, Villagetown",
						 3
						),
						new Users(
								 10,
						 "Jasmine Clark",
						 28,
						 "1994-04-07",
						 "jasmine.clark@example.com",
						 "Jasmine",
						 "Clark",
						"8765432101",
						 "Customer Support Specialist",
						 "234 Pine Avenue, Citytown",
						 4
						)
				);

				for (Users newUser : usersList) {
					if (userExists(repository, newUser)) {
						System.out.println("User already exists" );
					} else {
						repository.insert(newUser);
						System.out.println("User added" );
					}
				}

//				repository.findUserByEmail(email)
//						.ifPresentOrElse(s-> {
//					System.out.println( user + " already exists");
//				}, ()-> {
//					System.out.println("Inserting user " + user);
 //					repository.insert(user);
//
//				});

			};

	}

	private boolean userExists(Userrepo repository, Users user) {
		// Check if a user  email already exists in the repository
		return repository.existsByemail( user.getEmail());
	}

}
