package org.club.ucms.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private String clubId;
    private String title;
    private String description;
    private String venue;

    private LocalDate eventDate;
    private LocalTime eventTime;

    private Integer capacity;
    private Integer registeredCount = 0;

    private String imageUrl;
    private EventStatus status = EventStatus.OPEN;

    private String createdBy;   // Admin user ID
}