package com.maonamassa.maonamassa.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.maonamassa.maonamassa.controller.dto.HomeRequestDTO;
import com.maonamassa.maonamassa.controller.dto.HomeResponseDTO;
import com.maonamassa.maonamassa.Repositories.ContratanteRepository;
import com.maonamassa.maonamassa.Repositories.ProfissionalRepository;

@Service
public class HomeService {
  
  @Autowired
  private ContratanteRepository contratanteRepository;

  @Autowired
  private ProfissionalRepository profissionalRepository;

  public HomeResponseDTO execute(HomeRequestDTO request) {
    return profissionalRepository.findByEmail(request.getEmail())
        .map(profissional -> new HomeResponseDTO(profissional.getName()))
        .orElseGet(() -> contratanteRepository.findByEmail(request.getEmail())
            .map(contratante -> new HomeResponseDTO(contratante.getName()))
            .orElse(new HomeResponseDTO()));
  }
}
