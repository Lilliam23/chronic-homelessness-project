package com.cityoforlando.restapi.controllers;

import com.cityoforlando.restapi.models.Users;
import com.cityoforlando.restapi.services.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UsersController {
    private final UsersService userService;

    public UsersController(UsersService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Users> addUser(@RequestBody Users user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.addUsers(user));
    }

    @CrossOrigin
    @PutMapping
    public ResponseEntity updateUser(@RequestBody Users user) {
        userService.updateUsers(user);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @GetMapping("")
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @CrossOrigin
    @GetMapping("/username/{username}")
    public ResponseEntity<List<Users>> getUsersByName(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUsersByName(username));
    }

    @CrossOrigin
    @GetMapping("/id/{id}")
    public ResponseEntity<Users> getUsersById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUsersById(id));
    }

    @CrossOrigin
    @DeleteMapping("/id/{id}")
    public ResponseEntity deleteUsers(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
