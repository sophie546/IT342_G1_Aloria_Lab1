package com.example.aloria.controller;

import com.example.aloria.dto.request.LoginRequest;
import com.example.aloria.dto.request.RegisterRequest;
import com.example.aloria.dto.request.UpdateProfileRequest;
import com.example.aloria.dto.response.AuthResponse;
import com.example.aloria.model.User;
import com.example.aloria.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"})
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.registerUser(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            String token = authService.authenticate(request.getIdentifier(), request.getPassword());
            User user = authService.getUserFromToken(token);
            AuthResponse response = new AuthResponse(
                token, 
                user.getUserId(), 
                user.getFirstname(), 
                user.getLastname(), 
                user.getEmail()
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials: " + e.getMessage());
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            authService.logout(token);
            return ResponseEntity.ok("Logged out successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Logout failed");
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            
            if (!authService.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid token");
            }
            
            User user = authService.getUserFromToken(token);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest request, 
                                           @RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            
            if (!authService.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid token");
            }
            
            User user = authService.getUserFromToken(token);
            
            // Update fields
            if (request.getFirstname() != null && !request.getFirstname().trim().isEmpty()) {
                user.setFirstname(request.getFirstname().trim());
            }
            
            if (request.getLastname() != null) {
                user.setLastname(request.getLastname().trim());
            }
            
            // Save using AuthService (you'll need to add this method)
            User updatedUser = authService.updateUser(user);
            
            return ResponseEntity.ok(new AuthResponse(
                token,
                updatedUser.getUserId(),
                updatedUser.getFirstname(),
                updatedUser.getLastname(),
                updatedUser.getEmail()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }
}