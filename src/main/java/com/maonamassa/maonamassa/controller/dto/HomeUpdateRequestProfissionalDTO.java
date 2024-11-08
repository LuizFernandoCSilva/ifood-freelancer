package com.maonamassa.maonamassa.controller.dto;

import lombok.Data;

@Data
public class HomeUpdateRequestProfissionalDTO {
  private String email;
  private String phone;
  private String address;
  private String disponibilidade;
  private String areaAtuacao;
}
