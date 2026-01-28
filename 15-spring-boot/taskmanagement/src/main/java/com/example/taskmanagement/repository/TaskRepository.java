package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.Task;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface TaskRepository extends ReactiveCrudRepository<Task, Long> {

    // Optional: custom reactive queries
    Flux<Task> findByCompleted(String completed);

    Flux<Task> findByTitleContainingIgnoreCase(String title);
}


