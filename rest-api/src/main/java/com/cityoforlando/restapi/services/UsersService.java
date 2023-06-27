package com.cityoforlando.restapi.services;


import com.cityoforlando.restapi.models.Users;
import com.cityoforlando.restapi.respositories.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Users addUsers(Users users) {
       return usersRepository.insert(users);
    }

    public void updateUsers(Users users) {
        usersRepository.findById(users.getId())
                .orElseThrow(() -> new RuntimeException(String.format("Cannot find User by id: %s", users.getId())));

        usersRepository.save(users);
    }

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public List<Users> getUsersByName(String name) {
        return usersRepository.findByName(name).orElseThrow(
                () -> new RuntimeException(String.format("Cannot find User by name: %s", name)));
    }

    public Users getUsersById(String id) {
        return usersRepository.findById(id).orElseThrow(
                () -> new RuntimeException(String.format("Cannot find User by id: %s", id)));
    }

    public void deleteUser(String id) {
        usersRepository.deleteById(id);
    }

}
