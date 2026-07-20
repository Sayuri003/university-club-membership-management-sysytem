package org.club.ucms.service.impl;

import lombok.RequiredArgsConstructor;
import org.club.ucms.dto.ClubDTO;
import org.club.ucms.entity.Club;
import org.club.ucms.repository.ClubRepository;
import org.club.ucms.service.ClubService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {

    private final ClubRepository clubRepository;

    @Override
    public Club createClub(ClubDTO dto) {

        if(clubRepository.existsByClubName(dto.getClubName())){
            throw new RuntimeException("Club already exists.");
        }

        Club club = Club.builder()
                .clubName(dto.getClubName())
                .description(dto.getDescription())
                .advisor(dto.getAdvisor())
                .email(dto.getEmail())
                .build();

        return clubRepository.save(club);
    }

    @Override
    public Club updateClub(String id, ClubDTO dto) {

        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        club.setClubName(dto.getClubName());
        club.setDescription(dto.getDescription());
        club.setAdvisor(dto.getAdvisor());
        club.setEmail(dto.getEmail());

        return clubRepository.save(club);
    }

    @Override
    public void deleteClub(String id) {

        clubRepository.deleteById(id);

    }

    @Override
    public Club getClubById(String id) {

        return clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));
    }

    @Override
    public List<Club> getAllClubs() {

        return clubRepository.findAll();
    }
}