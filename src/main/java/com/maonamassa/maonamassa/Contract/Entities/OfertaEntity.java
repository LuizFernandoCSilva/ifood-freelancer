package com.maonamassa.maonamassa.Contract.Entities;

import java.util.UUID;

import com.maonamassa.maonamassa.Entities.ContratanteEntity;
import com.maonamassa.maonamassa.Entities.ProfissionalEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class OfertaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String descricao; // Descrição da oferta
    private String valor; // Valor da oferta

    // Relacionamento com Contratante
    @ManyToOne
    @JoinColumn(name = "contratante_id", nullable = false) // A coluna 'contratante_id' será usada para o FK
    private ContratanteEntity contratante;

    // Relacionamento com Profissional
    @ManyToOne
    @JoinColumn(name = "profissional_id", nullable = false) // A coluna 'profissional_id' será usada para o FK
    private ProfissionalEntity profissional;
}
