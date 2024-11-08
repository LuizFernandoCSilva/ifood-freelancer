package com.maonamassa.maonamassa.Entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

import com.maonamassa.maonamassa.Contract.Entities.OfertaEntity;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Profissional")
@Schema(description = "Profissional")
public class ProfissionalEntity extends UserEntity {

  @Schema(description = "Área de atuação do profissional", example = "Desenvolvedor de software")
  public String areaAtuacao;

  @Schema(description = "Disponibilidade do profissional", example = "full-time, part-time")
  public String disponibilidade;

  @NotBlank()
  @Schema(description = "CPF do profissional", example = "12345678910")
  public String cpfCnpj;

  @Schema(description = "Descrição do profissional", example = "Desenvolvedor de software com 10 anos de experiência")
  public String descricao;

  // Relacionamento com Ofertas
  @OneToMany(mappedBy = "profissional")
  private List<OfertaEntity> ofertas; // Um profissional pode ter várias ofertas
}
