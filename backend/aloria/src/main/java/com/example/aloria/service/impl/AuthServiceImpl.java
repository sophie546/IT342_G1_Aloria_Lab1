package com.example.aloria.service.impl;

import com.example.aloria.dto.request.RegisterRequest;
import com.example.aloria.dto.response.AuthResponse;
import com.example.aloria.model.User;
import com.example.aloria.repository.UserRepository;
import com.example.aloria.security.JwtUtil;
import com.example.aloria.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    private Set<String> tokenBlacklist = new HashSet<>();
    
    @Override
    public AuthResponse registerUser(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {  
            throw new RuntimeException("Email is already registered!");
        }
        
        // Create new user
        User user = new User();
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        User savedUser = userRepository.save(user);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser);
        
        return new AuthResponse(
            token, 
            savedUser.getUserId(), 
            savedUser.getFirstname(), 
            savedUser.getLastname(), 
            savedUser.getEmail()
        );
    }

    @Override
    public String authenticate(String identifier, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(identifier, password)
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Find by email only (since identifier will be email)
        User user = userRepository.findByEmail(identifier);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + identifier);
        }
        
        return jwtUtil.generateToken(user);
    }
    
    // REMOVED: getUserByIdentifier method that uses findByUsername
    
    @Override
    public boolean validateToken(String token) {
        if (tokenBlacklist.contains(token)) {
            return false;
        }
        return jwtUtil.validateToken(token);
    }
    
    @Override
    public User getUserFromToken(String token) {
        // Extract email from token (since we use email as subject)
        String email = jwtUtil.extractUsername(token);
        
        // Find user by email
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return user;
    }
    
    @Override
    public void logout(String token) {
        tokenBlacklist.add(token);
    }
    
    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }
}