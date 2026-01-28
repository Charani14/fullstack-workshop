package com.example.demoforstage3.repository;


import com.example.demoforstage3.entity.User;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public class UserRepository {

    private final Map<Integer, User> userDatabase = new HashMap<>();

    public void save(User user) {
        userDatabase.put(user.getId(), user);
        System.out.println("Saved user: " + user);
    }

    public Optional<User> findById(int id) {
        return Optional.ofNullable(userDatabase.get(id));
    }

    public Map<Integer, User> findAll() {
        return userDatabase;
    }
}

