package com.maonamassa.maonamassa.security;

import java.io.IOException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.maonamassa.maonamassa.providers.JWTContratanteProvider;
import com.maonamassa.maonamassa.providers.JWTProfissionalProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityUserFilter extends OncePerRequestFilter {
  
  @Autowired
  private JWTProfissionalProvider jwtProfissionalProvider;

  @Autowired
  private JWTContratanteProvider jwtContratanteProvider;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    
    String header = request.getHeader("Authorization");

    if (header != null) {
      var token = validateTokenBasedOnPath(request, header);
      
      if (token != null) {
        // Set the user ID attribute based on the type of user
        if (request.getRequestURI().startsWith("/profissional")) {
          request.setAttribute("profissionalId", token.getSubject());
        } else if (request.getRequestURI().startsWith("/contratante")) {
          request.setAttribute("contratanteId", token.getSubject());
        }

        // Define the roles based on the token claims
        var roles = token.getClaim("type").asList(String.class);
        var grants = roles.stream()
          .map(role -> new SimpleGrantedAuthority("TYPE_" + role.toUpperCase()))
          .collect(Collectors.toList());

        // Set the authentication in the security context
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(token.getSubject(), null, grants);
        SecurityContextHolder.getContext().setAuthentication(auth);
      } else {
        // Token is invalid or null, set response to unauthorized
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return;
      }
    }

    // Continue the filter chain
    filterChain.doFilter(request, response);
  }

  /**
   * Valida o token baseado no path da requisição
   * @param request HttpServletRequest atual
   * @param header Cabeçalho "Authorization" com o token
   * @return Token JWT decodificado ou null se inválido
   */
  private DecodedJWT validateTokenBasedOnPath(HttpServletRequest request, String header) {
    if (request.getRequestURI().startsWith("/profissional")) {
      return jwtProfissionalProvider.validateToken(header);
    } else if (request.getRequestURI().startsWith("/contratante")) {
      return jwtContratanteProvider.validateToken(header);
    }
    return null;
  }
}
