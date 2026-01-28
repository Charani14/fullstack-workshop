package com.example.demoforstage3.service;


import com.example.demoforstage3.entity.User;
import com.example.demoforstage3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(int id, String name, String email) {
        User user = new User(id, name, email);
        userRepository.save(user);
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public Map<Integer, User> getAllUsers() {
        return userRepository.findAll();
    }
}

