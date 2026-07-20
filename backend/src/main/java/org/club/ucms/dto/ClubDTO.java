package org.club.ucms.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClubDTO {

    private String clubName;
    private String description;
    private String advisor;
    private String email;
}