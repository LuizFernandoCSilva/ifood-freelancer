package com.maonamassa.maonamassa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maonamassa.maonamassa.Entities.ContratanteEntity;
import com.maonamassa.maonamassa.Entities.ProfissionalEntity;
import com.maonamassa.maonamassa.Services.CreateUserService;
import com.maonamassa.maonamassa.controller.dto.UserResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@Tag(name = "User", description = "User API")
public class UserController {

    @Autowired
    private CreateUserService createUserUseCase;

    @PostMapping("/create/profissional")
    @Operation(summary = "Create Profissional", description = "Create a new profissional user")
    public ResponseEntity<Object> createProfissional(@RequestBody ProfissionalEntity profissional) {
        try {
            UserResponseDTO result = createUserUseCase.execute(profissional);
            return ResponseEntity.ok(result);
        } catch (HttpMessageNotReadableException  e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        }catch (Exception e) {
          e.printStackTrace();
          return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
      }
    }

    @PostMapping("/create/contratante")
    @Operation(summary = "Create Contratante", description = "Create a new contratante user")
    public ResponseEntity<Object> createContratante(@Valid @RequestBody ContratanteEntity contratante) {
        try {
            UserResponseDTO result = createUserUseCase.execute(contratante);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
