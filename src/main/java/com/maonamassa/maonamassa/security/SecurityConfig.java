package com.maonamassa.maonamassa.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private SecurityUserFilter securityUserFilter;

    private static final String[] SWAGGER_LIST = {
        "/swagger-ui/**",
        "/v3/api-docs/**",
        "/swagger-resources/**"
    };

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Configuração CORS
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> {
                // Permite acesso aos endpoints públicos
                auth.requestMatchers("/user/create/profissional", "/user/create/contratante").permitAll()
                    .requestMatchers("/auth/login").permitAll()
                    .requestMatchers(SWAGGER_LIST).permitAll();
    
                // Define restrições de role
                auth.requestMatchers("/home/profissional/**").hasAuthority("TYPE_PROFISSIONAL")
                    .requestMatchers("/home/contratante/**").hasAuthority("TYPE_CONTRATANTE")
                    .requestMatchers("/offers/profissional/**").hasAuthority("TYPE_PROFISSIONAL")
                    .requestMatchers("/offers/contratante/**").hasAuthority("TYPE_CONTRATANTE");
    
                // Exige autenticação para qualquer outra rota
                auth.anyRequest().authenticated();
            });
    
        // Adiciona o filtro de autenticação customizado antes do filtro de autenticação básica
        http.addFilterBefore(securityUserFilter, BasicAuthenticationFilter.class);
    
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
