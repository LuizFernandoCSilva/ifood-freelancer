package com.maonamassa.maonamassa.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.maonamassa.maonamassa.controller.dto.HomeRequestDTO;
import com.maonamassa.maonamassa.controller.dto.HomeResponseDTO;
import com.maonamassa.maonamassa.controller.dto.HomeUpdateRequestContratanteDTO;
import com.maonamassa.maonamassa.controller.dto.HomeUpdateRequestProfissionalDTO;
import com.maonamassa.maonamassa.controller.dto.SearchProfissionalRequestDTO;
import com.maonamassa.maonamassa.controller.dto.SearchProfissionalResponseDTO;
import com.maonamassa.maonamassa.Repositories.ContratanteRepository;
import com.maonamassa.maonamassa.Repositories.ProfissionalRepository;
import com.maonamassa.maonamassa.Repositories.SearchProfissionalRepository;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class HomeService {
  
  @Autowired
  private ContratanteRepository contratanteRepository;

  @Autowired
  private ProfissionalRepository profissionalRepository;

  @Autowired
  private SearchProfissionalRepository searchProfissionalRepository;

  public HomeResponseDTO execute(HomeRequestDTO request) {
  return profissionalRepository.findByEmail(request.getEmail())
    .map(profissional -> new HomeResponseDTO(profissional.getEmail() ,profissional.getName(), profissional.getPhone(), profissional.getAddress(), profissional.getDisponibilidade(), profissional.getAreaAtuacao(), "0", profissional.getCpfCnpj()))
    .orElseGet(() -> contratanteRepository.findByEmail(request.getEmail())
    .map(contratante -> new HomeResponseDTO(contratante.getEmail(),contratante.getName(), contratante.getPhone(), contratante.getAddress(), "0", "0", contratante.getDescricao(), contratante.getCpfCnpj()))
    .orElse(new HomeResponseDTO()));
  }

  public HomeResponseDTO updateProfissional(HomeUpdateRequestProfissionalDTO request) {
  return profissionalRepository.findByEmail(request.getEmail())
    .map(profissional -> {;
    profissional.setPhone(request.getPhone());
    profissional.setAddress(request.getAddress());
    profissional.setDisponibilidade(request.getDisponibilidade());
    profissional.setAreaAtuacao(request.getAreaAtuacao());
    profissionalRepository.save(profissional);
    return new HomeResponseDTO(profissional.getEmail(),profissional.getName(), profissional.getPhone(), profissional.getAddress(), profissional.getDisponibilidade(), profissional.getAreaAtuacao(), null, profissional.getCpfCnpj());
    })
    .orElse(new HomeResponseDTO());
  }

  public HomeResponseDTO updateContratante(HomeUpdateRequestContratanteDTO request) {
  return contratanteRepository.findByEmail(request.getEmail())
    .map(contratante -> {;
    contratante.setPhone(request.getPhone());
    contratante.setAddress(request.getAddress());
    contratante.setDescricao(request.getDescricao());
    contratanteRepository.save(contratante);
    return new HomeResponseDTO(contratante.getEmail(),contratante.getName(), contratante.getPhone(), contratante.getAddress(), null, null, contratante.getDescricao(), contratante.getCpfCnpj());
    })
    .orElse(new HomeResponseDTO());
  }

  public List<SearchProfissionalResponseDTO> searchProfissionais(SearchProfissionalRequestDTO request) {
    return searchProfissionalRepository.findByAreaAtuacao(request.getAreaAtuacao())
        .stream()
        .map(profissional -> SearchProfissionalResponseDTO.builder()
            .name(profissional.getName())
            .phone(profissional.getPhone())
            .address(profissional.getAddress())
            .disponibilidade(profissional.getDisponibilidade())
            .areaAtuacao(profissional.getAreaAtuacao())
            .build())
        .collect(Collectors.toList());  // Coleta todos os profissionais e os retorna como uma lista
}

}