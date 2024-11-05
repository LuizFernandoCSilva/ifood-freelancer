package com.maonamassa.maonamassa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maonamassa.maonamassa.Services.LoginUsersService;
import com.maonamassa.maonamassa.controller.dto.LoginUserRequestDTO;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/auth")
public class LoginUsersController {

  @Autowired
  private LoginUsersService loginCandidateService;
  
  @PostMapping("/login")
  public ResponseEntity<Object> login(@RequestBody LoginUserRequestDTO userLogin) {
    System.out.println("Login User Request: " + userLogin);
   try{
    var token = this.loginCandidateService.execute(userLogin);
    return ResponseEntity.ok().body(token);
   }catch (Exception e) {
     return ResponseEntity.status(500).body(e.getMessage());
   }
  }
}
