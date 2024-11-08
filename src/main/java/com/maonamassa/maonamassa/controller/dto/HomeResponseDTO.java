package com.maonamassa.maonamassa.controller.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomeResponseDTO {
  private UUID id;
  private String email;
  private String name;
  private String phone;
  private String address;
  public String disponibilidade;
  public String areaAtuacao;
  public String descricao;
  public String cpfCnpj;
}
