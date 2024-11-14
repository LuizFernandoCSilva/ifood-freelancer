package com.maonamassa.maonamassa.Contract.Controller.DTO;

import java.util.UUID;

import lombok.Data;

@Data
public class OfertaRequest {

  private String contratanteEmail; // Email do contratante
  private UUID profissionalId;    // ID do profissional
  private String detalhes;        // Detalhes da oferta
  private String valor;           // Valor da oferta
  

  
}

