package com.example.aloria.service;

import com.example.aloria.dto.request.RegisterRequest;
import com.example.aloria.dto.response.AuthResponse;
import com.example.aloria.model.User;

public interface AuthService {
    AuthResponse registerUser(RegisterRequest request);
    String authenticate(String identifier, String password);
    boolean validateToken(String token);
    User getUserFromToken(String token);
    void logout(String token);
    User updateUser(User user); 
}