package com.maonamassa.maonamassa.utils;

import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class ExperienciaNaPlataforma {
  
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Schema(description = "Descrição da experiência na plataforma", example = "Desenvolvedor Java")
  private String descricao;
}
