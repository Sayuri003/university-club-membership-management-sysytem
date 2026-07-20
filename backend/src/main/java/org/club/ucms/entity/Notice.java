package org.club.ucms.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "notices")
public class Notice {

    @Id
    private String id;

    private String clubId;
    private String title;
    private String content;

    private String attachmentUrl;
    private String publishedBy;        // Admin user ID
    private LocalDateTime publishedAt;

    private NoticeStatus status = NoticeStatus.ACTIVE;
}