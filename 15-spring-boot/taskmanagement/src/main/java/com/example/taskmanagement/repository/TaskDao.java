package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.Task;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskDao extends ReactiveCrudRepository<Task, Long> {
    // Add reactive query methods if needed
}

