package com.maonamassa.maonamassa.controller.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserRequestDTO {
  @NotBlank(message = "Email is mandatory")
  @Email(message = "Email should be valid")
  private String email;
  
  @NotBlank(message = "Password is mandatory")
  private String password;
}
