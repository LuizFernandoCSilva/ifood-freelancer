package com.maonamassa.maonamassa.Services;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.maonamassa.maonamassa.Entities.ContratanteEntity;
import com.maonamassa.maonamassa.Entities.ProfissionalEntity;
import com.maonamassa.maonamassa.Repositories.ContratanteRepository;
import com.maonamassa.maonamassa.Repositories.ProfissionalRepository;
import com.maonamassa.maonamassa.controller.dto.AuthUserResponseDTO;
import com.maonamassa.maonamassa.controller.dto.LoginUserRequestDTO;

import org.slf4j.Logger;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class LoginUsersService {

    private static final Logger logger = LoggerFactory.getLogger(LoginUsersService.class);

    @Value("${jwt.secret}")
    private String secretKey;

    @Autowired
    private ContratanteRepository contratanteRepository;

    @Autowired
    private ProfissionalRepository profissionalRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthUserResponseDTO execute(LoginUserRequestDTO userLogin) throws Exception {

        logger.info("Tentando logar usuário com email: {}", userLogin.getEmail());
        // Tenta encontrar o usuário como Contratante
        var contratante = contratanteRepository.findByEmail(userLogin.getEmail());
        if (contratante.isPresent()) {
            logger.info("Usuário Contratante encontrado: {}", contratante.get());
            return authenticateContratante(contratante.get(), userLogin.getPassword());
        }

        // Tenta encontrar o usuário como Profissional
        var profissional = profissionalRepository.findByEmail(userLogin.getEmail());
        if (profissional.isPresent()) {
            logger.info("Usuário Profissional encontrado: {}", profissional.get());
            return authenticateProfissional(profissional.get(), userLogin.getPassword());
        }

        // Se nenhum usuário for encontrado, lança uma exceção
        logger.warn("Usuário não encontrado com email: {}", userLogin.getEmail());
        throw new RuntimeException("Not found");
    }

    private AuthUserResponseDTO authenticateContratante(ContratanteEntity contratante, String rawPassword) throws Exception {
        var passwordMatch = passwordEncoder.matches(rawPassword, contratante.getPassword());
        if (!passwordMatch) {
            throw new Exception("Email/Password incorrect");
        }

        contratante.setLogado(true);
        return generateToken(contratante.getId(), "contratante");
    }

    private AuthUserResponseDTO authenticateProfissional(ProfissionalEntity profissional, String rawPassword) throws Exception {
        var passwordMatch = passwordEncoder.matches(rawPassword, profissional.getPassword());
        if (!passwordMatch) {
            throw new Exception("Email/Password incorrect");
        }
        profissional.setLogado(true);
        return generateToken(profissional.getId(), "profissional");
    }

    private AuthUserResponseDTO generateToken(UUID userId, String userType) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        var expiresIn = Instant.now().plus(Duration.ofMinutes(30));
        var token = JWT.create()
            .withIssuer("maona_massa")
            .withSubject(userId.toString())
            .withExpiresAt(java.util.Date.from(expiresIn))
            .withClaim("type", userType) 
            .sign(algorithm);
        
        return AuthUserResponseDTO.builder()
            .token(token)
            .expires_in(expiresIn.toEpochMilli())
            .type(userType)
            .build();
    }
}

