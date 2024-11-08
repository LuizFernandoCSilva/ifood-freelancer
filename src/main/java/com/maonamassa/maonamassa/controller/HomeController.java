package com.maonamassa.maonamassa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.maonamassa.maonamassa.Services.HomeService;
import com.maonamassa.maonamassa.controller.dto.HomeRequestDTO;
import com.maonamassa.maonamassa.controller.dto.HomeResponseDTO;
import com.maonamassa.maonamassa.controller.dto.HomeUpdateRequestContratanteDTO;
import com.maonamassa.maonamassa.controller.dto.HomeUpdateRequestProfissionalDTO;
import com.maonamassa.maonamassa.controller.dto.SearchProfissionalRequestDTO;
import com.maonamassa.maonamassa.controller.dto.SearchProfissionalResponseDTO;

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

@PutMapping("/update-profissional")
    public ResponseEntity<HomeResponseDTO> updateProfissional(@RequestBody HomeUpdateRequestProfissionalDTO request) {
       try{
            HomeResponseDTO response = homeService.updateProfissional(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            HomeResponseDTO errorResponse = HomeResponseDTO.builder()
                                                        .name("Erro interno no servidor: " + e.getMessage())
                                                        .build();
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // Endpoint para atualizar informações do contratante
@PutMapping("/update-contratante")
    public ResponseEntity<HomeResponseDTO> updateContratante(@RequestBody HomeUpdateRequestContratanteDTO request) {
        try{
            HomeResponseDTO response = homeService.updateContratante(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            HomeResponseDTO errorResponse = HomeResponseDTO.builder()
                                                        .name("Erro interno no servidor: " + e.getMessage())
                                                        .build();
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/professionals/{areaAtuacao}")
    public ResponseEntity<List<SearchProfissionalResponseDTO>> professionals(@PathVariable("areaAtuacao") String areaAtuacao) {
        try {
            System.out.println("Área de atuação: " + areaAtuacao);
            List<SearchProfissionalResponseDTO> response = homeService.searchProfissionais(new SearchProfissionalRequestDTO(areaAtuacao));
            return ResponseEntity.ok(response);  // Retorna a lista de profissionais
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();  // Retorna apenas o status 500 no caso de erro
        }
    }
}
