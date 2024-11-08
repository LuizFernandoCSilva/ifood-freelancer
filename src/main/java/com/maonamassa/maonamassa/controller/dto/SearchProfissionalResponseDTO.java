package com.maonamassa.maonamassa.controller.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SearchProfissionalResponseDTO {
  private UUID id;
  private String name;
  private String phone;
  private String address;
  private String disponibilidade;
  private String areaAtuacao;
}
