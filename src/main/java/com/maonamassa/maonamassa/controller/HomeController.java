package com.maonamassa.maonamassa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.maonamassa.maonamassa.Services.HomeService;
import com.maonamassa.maonamassa.controller.dto.HomeRequestDTO;
import com.maonamassa.maonamassa.controller.dto.HomeResponseDTO;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/home")
public class HomeController {

  @Autowired
  private HomeService homeService;

@GetMapping
@Operation(summary = "Home", description = "Home page")
public ResponseEntity<HomeResponseDTO> home(@RequestHeader("email") String email) {
    try {
        HomeResponseDTO response = homeService.execute(new HomeRequestDTO(email));
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        e.printStackTrace();
        HomeResponseDTO errorResponse = HomeResponseDTO.builder()
                                                       .name("Erro interno no servidor: " + e.getMessage())
                                                       .build();
        return ResponseEntity.status(500).body(errorResponse);
    }
}

}
