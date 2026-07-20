package org.club.ucms.service;

import org.club.ucms.dto.ClubDTO;
import org.club.ucms.entity.Club;

import java.util.List;

public interface ClubService {

    Club createClub(ClubDTO dto);

    Club updateClub(String id, ClubDTO dto);

    void deleteClub(String id);

    Club getClubById(String id);

    List<Club> getAllClubs();

}