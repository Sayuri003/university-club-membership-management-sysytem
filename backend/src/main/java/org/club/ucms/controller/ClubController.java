package org.club.ucms.controller;

import lombok.RequiredArgsConstructor;
import org.club.ucms.dto.ClubDTO;
import org.club.ucms.entity.Club;
import org.club.ucms.service.ClubService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ClubController {

    private final ClubService clubService;

    // ==========================
    // USER
    // ==========================

    @GetMapping
    public ResponseEntity<List<Club>> getAllClubs(){

        return ResponseEntity.ok(clubService.getAllClubs());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Club> getClubById(@PathVariable String id){

        return ResponseEntity.ok(clubService.getClubById(id));

    }

    // ==========================
    // ADMIN
    // ==========================

    @PostMapping
    public ResponseEntity<Club> createClub(@RequestBody ClubDTO dto){

        return ResponseEntity.ok(clubService.createClub(dto));

    }

    @PutMapping("/{id}")
    public ResponseEntity<Club> updateClub(
            @PathVariable String id,
            @RequestBody ClubDTO dto){

        return ResponseEntity.ok(clubService.updateClub(id,dto));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClub(@PathVariable String id){

        clubService.deleteClub(id);

        return ResponseEntity.ok("Club Deleted Successfully.");

    }

}