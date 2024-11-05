package com.maonamassa.maonamassa.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.maonamassa.maonamassa.Entities.ContratanteEntity;
import com.maonamassa.maonamassa.Entities.ProfissionalEntity;
import com.maonamassa.maonamassa.Entities.UserEntity;
import com.maonamassa.maonamassa.Repositories.ContratanteRepository;
import com.maonamassa.maonamassa.Repositories.ProfissionalRepository;
import com.maonamassa.maonamassa.controller.dto.UserResponseDTO;

@Service
public class CreateUserService {

    @Autowired
    private ProfissionalRepository profissionalRepository;

    @Autowired
    private ContratanteRepository contratanteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponseDTO execute(UserEntity userRequest) {
        if (userRequest instanceof ProfissionalEntity) {
            return executeP((ProfissionalEntity) userRequest);
        } else if (userRequest instanceof ContratanteEntity) {
            return executeC((ContratanteEntity) userRequest);
        } else {
            throw new IllegalArgumentException("Invalid user type");
        }
    }

    private UserResponseDTO executeP(ProfissionalEntity profissionalRequest) {
        // Verifica se o e-mail já existe
        this.profissionalRepository
            .findByEmail(profissionalRequest.getEmail())
            .ifPresent((existingUser) -> {
                throw new RuntimeException("User already exists");
            });

        // Codifica a senha
        profissionalRequest.setPassword(passwordEncoder.encode(profissionalRequest.getPassword()));

        // Define o usuário como deslogado, uma vez que ainda não logou
        profissionalRequest.setLogado(false);

        // Salva o profissional
        ProfissionalEntity savedUser = this.profissionalRepository.save(profissionalRequest);
       
        // Retorna a resposta com os dados do usuário
        return UserResponseDTO.builder()
                              .email(savedUser.getEmail())
                              .build();
    }

    private UserResponseDTO executeC(ContratanteEntity contratanteRequest) {
        // Verifica se o e-mail já existe
        this.contratanteRepository
            .findByEmail(contratanteRequest.getEmail())
            .ifPresent((existingUser) -> {
                throw new RuntimeException("User already exists");
            });

        // Codifica a senha
        contratanteRequest.setPassword(passwordEncoder.encode(contratanteRequest.getPassword()));

        // Define o usuário como deslogado, uma vez que ainda não logou
        contratanteRequest.setLogado(false);

        // Salva o contratante
        ContratanteEntity savedUser = this.contratanteRepository.save(contratanteRequest);
       
        // Retorna a resposta com os dados do usuário
        return UserResponseDTO.builder()
                              .email(savedUser.getEmail())
                              .build();
    }
}
