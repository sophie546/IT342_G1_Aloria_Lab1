package com.example.aloria.dto.request;

import lombok.Data;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class RegisterRequest {
    
    @NotBlank(message = "First name is required")
    @Pattern(regexp = "^[A-Za-z\\s.'-]+$", message = "First name should only contain letters, spaces, and common name characters")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstname;
    
    @NotBlank(message = "Last name is required")
    @Pattern(regexp = "^[A-Za-z\\s.'-]+$", message = "Last name should only contain letters, spaces, and common name characters")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastname;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(regexp = ".*\\d.*", message = "Password must contain at least one number")
    private String password;
}