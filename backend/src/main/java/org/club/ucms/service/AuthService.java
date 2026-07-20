package org.club.ucms.service;

import org.club.ucms.dto.JwtResponse;
import org.club.ucms.dto.LoginRequest;
import org.club.ucms.dto.RegisterRequest;

public interface AuthService {

    JwtResponse register(RegisterRequest request);

    JwtResponse login(LoginRequest request);

}