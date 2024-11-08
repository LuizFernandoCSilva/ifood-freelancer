package com.maonamassa.maonamassa.Contract.Repositories;

import java.util.UUID;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maonamassa.maonamassa.Contract.Entities.OfertaEntity;

public interface RepositoryOfertas extends JpaRepository<OfertaEntity, UUID> {
  List<OfertaEntity> findByProfissionalId(UUID profissionalId);
}
