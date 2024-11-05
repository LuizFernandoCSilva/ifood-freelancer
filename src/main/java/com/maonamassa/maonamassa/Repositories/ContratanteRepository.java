package com.maonamassa.maonamassa.Repositories;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.maonamassa.maonamassa.Entities.ContratanteEntity;

public interface ContratanteRepository extends JpaRepository<ContratanteEntity, UUID> {
    Optional<ContratanteEntity> findByEmail(String email);
}
