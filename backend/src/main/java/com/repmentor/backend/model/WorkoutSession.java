package com.repmentor.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "workout_sessions")
public class WorkoutSession {
    @Id
    private String id;
    private String googleId;
    private String exercise;
    private int repCount;
    private LocalDateTime date;
}