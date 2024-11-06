package com.maonamassa.maonamassa.Entities;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;

import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Contratante")
@Schema(description = "Contratante")
public class ContratanteEntity extends UserEntity {

  @Schema(description = "Descrição do contratante", example = "Empresa de tecnologia")
  private String descricao;

  @Schema(description = "CPF do contratante", example = "12345678910")
  private String cpfCnpj;

}
