package com.maonamassa.maonamassa.Contract.Controller.DTO;

import java.util.UUID;

import lombok.Data;

@Data
public class FindOFertasResponse {

  private UUID id;
  private String contratanteEmail;
  private String detalhes;
  private String valor;
}
