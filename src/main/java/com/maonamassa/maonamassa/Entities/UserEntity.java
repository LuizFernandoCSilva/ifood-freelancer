package com.maonamassa.maonamassa.Entities;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;
import java.util.UUID;

import org.hibernate.validator.constraints.Length;

import com.maonamassa.maonamassa.Enums.MetododePagamento;

@Data
@MappedSuperclass
public abstract class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  @NotBlank()
  @Schema(description = "Nome do usuário", example = "João")
  private String name;

  @NotBlank()
  @Schema(description = "Email do usuário", example = "joao@gmail.com")
  private String email;

  @NotBlank()
  @Length(min = 10, max = 100, message = "O campo (password) deve ter entre 10 e 100 caracteres")
  @Schema(example = "1234567891", minLength = 10, maxLength = 100, requiredMode = RequiredMode.REQUIRED, description = "Senha do candidato")
  private String password;

  @NotBlank()
  @Schema(description = "Telefone do usuário", example = "11999999999")
  private String phone;

  @NotBlank()
  @Schema(description = "Endereço do usuário", example = "Rua dos Bobos, 0")
  private String address;

  @NotEmpty()
  @Schema(description = "Métodos de pagamento do usuário", example = "CARTAO_DE_CREDITO")
  private List<MetododePagamento> pagamento;

  @Schema(description = "Usuário logado", example = "true")
  private Boolean logado;

}
