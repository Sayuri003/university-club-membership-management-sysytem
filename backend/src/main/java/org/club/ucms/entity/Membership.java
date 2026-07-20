package org.club.ucms.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "memberships")
public class Membership {

    @Id
    private String id;

    private String userId;
    private String clubId;

    private MemberPosition position = MemberPosition.MEMBER;
    private MembershipStatus status = MembershipStatus.PENDING;

    private LocalDate joinedDate;
    private String approvedBy;   // Admin user ID
}