package com.maonamassa.maonamassa.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration

@EnableMethodSecurity
public class SecurityConfig {


  
  private static final String[] SWAGGER_LIST = {
    "/swagger-ui/**",
    "/v3/api-docs/**",
    "/swagger-resources/**"
  };

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(auth -> {
        auth.requestMatchers("/user/create/profissional","/user/create/contratante").permitAll()
            .requestMatchers("/auth/login").permitAll()
            .requestMatchers("/home").permitAll()
            .requestMatchers(SWAGGER_LIST).permitAll();

        auth.anyRequest().authenticated();
      });

      return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
  }
}
