package com.example.aloria.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long userId;
    private String firstname;
    private String lastname;
    private String email;
    
    public AuthResponse(String token, Long userId, String firstname, String lastname, String email) {
        this.token = token;
        this.userId = userId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.type = "Bearer";
    }
}