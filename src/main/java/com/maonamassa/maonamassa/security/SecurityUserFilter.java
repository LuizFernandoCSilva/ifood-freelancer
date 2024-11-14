package com.maonamassa.maonamassa.security;

import java.io.IOException;
import java.util.List;
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
        if (request.getRequestURI().contains("/profissional")) {
          request.setAttribute("profissionalId", token.getSubject());
        } else if (request.getRequestURI().contains("/contratante")) {
          request.setAttribute("contratanteId", token.getSubject());
        }

        var rolesClaim = token.getClaim("type");
        var role = rolesClaim.asString();  // Aqui a claim "type" é tratada como uma string

        // Agora você pode mapear a string para uma autoridade (role)
        var grants = List.of(new SimpleGrantedAuthority("TYPE_" + role.toUpperCase()));

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
    try {
      if (request.getRequestURI().contains("/profissional")) {
        return jwtProfissionalProvider.validateToken(header);
      } else if (request.getRequestURI().contains("/contratante")) {
        return jwtContratanteProvider.validateToken(header);
      }
    } catch (Exception e) {
      System.err.println("Token validation failed: " + e.getMessage());
    }
    return null;
  }
}
