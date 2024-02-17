package com.example.SpringMongoProject.Controller;
import com.example.SpringMongoProject.Repo.Userrepo;
import com.example.SpringMongoProject.Services.UserService;
import com.example.SpringMongoProject.document.Certification;
import com.example.SpringMongoProject.document.Users;
import org.springframework.web.bind.annotation.CrossOrigin;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/kong/api/users")
@AllArgsConstructor

public class UserController {

    private final UserService userService;

    @GetMapping
    public List<Users> fetchAllUsers(){
        return userService.getAllUsers();

    }

    @GetMapping("/{userId}")

    public ResponseEntity<Users> getUserById(@PathVariable int userId) {
        Optional<Users> user = userService.getUserById(userId);

        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    private boolean userExists(Userrepo repository, Users user) {
        // Check if a user email already exists in the repository
        return repository.existsByemail(user.getEmail());
    }

    @PostMapping("/add")
    public Users addUser(@RequestBody Users user) {

        return userService.addUser(user);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Users> updateUser(@PathVariable int userId, @RequestBody Users updatedUser) {
        Optional<Users> existingUser = userService.getUserById(userId);

        if (existingUser.isPresent()) {
            Users userToUpdate = existingUser.get();

            // Update relevant fields of the user (e.g., certifications)
            userToUpdate.setCertifications(updatedUser.getCertifications());
            // Update other fields as needed

            // Save the updated user
            Users updated = userService.updateUser(userToUpdate);

            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{userId}/updateCertifications")
    public ResponseEntity<Users> updateCertifications(@PathVariable int userId, @RequestBody List<Certification> updatedCertifications) {
        Optional<Users> existingUser = userService.getUserById(userId);

        if (existingUser.isPresent()) {
            Users userToUpdate = existingUser.get();

            // Update the user's certifications with the provided list
            userToUpdate.setCertifications(updatedCertifications);

            // Save the updated user
            Users updated = userService.updateUser(userToUpdate);

            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{userId}/update-certification")
    public ResponseEntity<Users> updateCertification(
            @PathVariable int userId,
            @RequestParam String certificationId,
            @RequestBody Certification updatedCertification) {

        Optional<Users> existingUser = userService.getUserById(userId);

        if (existingUser.isPresent()) {
            Users userToUpdate = existingUser.get();

            // Find the certification to update by certificationId
            Optional<Certification> certificationToUpdate = userToUpdate.getCertifications().stream()
                    .filter(certification -> certification.getCid().equals(certificationId))
                    .findFirst();

            if (certificationToUpdate.isPresent()) {
                // Update the found certification
                Certification existingCertification = certificationToUpdate.get();
                existingCertification.setCertificationName(updatedCertification.getCertificationName());
                existingCertification.setStatus(updatedCertification.getStatus());
                existingCertification.setCost(updatedCertification.getCost());
                existingCertification.setType(updatedCertification.getType());
                existingCertification.setLevel(updatedCertification.getLevel());
                existingCertification.setExperience(updatedCertification.getExperience());
                existingCertification.setPrerequisite(updatedCertification.getPrerequisite());
                existingCertification.setStartDate(updatedCertification.getStartDate());
                existingCertification.setEndDate(updatedCertification.getEndDate());

                // Save the updated user
                Users updated = userService.updateUser(userToUpdate);

                return ResponseEntity.ok(updated);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{userId}/addc")
    public ResponseEntity<Users> addCertification(@PathVariable int userId, @RequestBody Certification certification) {
        Optional<Users> existingUser = userService.getUserById(userId);


        if (existingUser.isPresent()) {
            Users userToUpdate = existingUser.get();

            // Check if the certification with the given CID already exists
            boolean certificationExists = userToUpdate.getCertifications()
                    .stream()
                    .anyMatch(newcertification -> newcertification.getCid().equals(certification.getCid()));

            if (!certificationExists) {
                // Add the new certification
                userToUpdate.getCertifications().add(certification);

                // Save the updated user
                Users updated = userService.updateUser(userToUpdate);

                return ResponseEntity.ok(updated);
            }
            else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }

    }

   @DeleteMapping ("/{userId}/deletec")
    public ResponseEntity<Users> deleteCertification(@PathVariable int userId, @RequestParam String certificationId) {
        Optional<Users> existingUser = userService.getUserById(userId);

        if (existingUser.isPresent()) {
            Users userToUpdate = existingUser.get();

            // Remove the certification with the given ID
            userToUpdate.getCertifications().removeIf(certification -> certification.getCid().equals(certificationId));

            // Save the updated user
            Users updated = userService.updateUser(userToUpdate);

            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
