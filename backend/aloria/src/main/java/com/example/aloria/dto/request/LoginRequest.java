package com.example.aloria.dto.request;

import lombok.Data;
import javax.validation.constraints.NotBlank;  // Change from jakarta.validation to javax.validation

@Data
public class LoginRequest {
    
    @NotBlank(message = "Username or email is required")
    private String identifier;
    
    @NotBlank(message = "Password is required")
    private String password;
}