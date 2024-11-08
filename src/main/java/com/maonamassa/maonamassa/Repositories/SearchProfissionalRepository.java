package com.maonamassa.maonamassa.Repositories;

import com.maonamassa.maonamassa.Entities.ProfissionalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SearchProfissionalRepository extends JpaRepository<ProfissionalEntity, UUID> {
    List<ProfissionalEntity> findByAreaAtuacao(String areaAtuacao);
}
