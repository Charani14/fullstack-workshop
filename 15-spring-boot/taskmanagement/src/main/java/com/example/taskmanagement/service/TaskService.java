package com.example.taskmanagement.service;

import com.example.taskmanagement.dto.TaskDto;
import com.example.taskmanagement.entity.Task;
import com.example.taskmanagement.repository.TaskRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    // Constructor injection (recommended)
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Create task
    public Mono<Task> createTask(TaskDto taskDto) {
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setCompleted(taskDto.getCompleted());

        return taskRepository.save(task);
    }

    // Update task
    public Mono<Task> updateTask(Long id, TaskDto taskDto) {
        return taskRepository.findById(id)
                .switchIfEmpty(Mono.error(
                        new RuntimeException("Task not found with id " + id)))
                .flatMap(task -> {
                    task.setTitle(taskDto.getTitle());
                    task.setDescription(taskDto.getDescription());
                    task.setCompleted(taskDto.getCompleted());
                    return taskRepository.save(task);
                });
    }

    // Get all tasks
    public Flux<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get task by ID
    public Mono<Task> getTaskById(Long id) {
        return taskRepository.findById(id)
                .switchIfEmpty(Mono.error(
                        new RuntimeException("Task not found with id " + id)));
    }

    // Delete task
    public Mono<Void> deleteTask(Long id) {
        return taskRepository.deleteById(id);
    }
}
