package com.maonamassa.maonamassa.Repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maonamassa.maonamassa.Entities.ProfissionalEntity;

public interface ProfissionalRepository  extends JpaRepository<ProfissionalEntity, UUID> {
    Optional<ProfissionalEntity> findByEmail(String email);
}
