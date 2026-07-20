package org.club.ucms.repository;

import org.club.ucms.entity.Club;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepository extends MongoRepository<Club, String> {

    boolean existsByClubName(String clubName);

}