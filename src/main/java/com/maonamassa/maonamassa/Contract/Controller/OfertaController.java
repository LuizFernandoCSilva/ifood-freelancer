package com.maonamassa.maonamassa.Contract.Controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.maonamassa.maonamassa.Contract.Controller.DTO.FindOFertasResponse;
import com.maonamassa.maonamassa.Contract.Controller.DTO.OfertaRequest;
import com.maonamassa.maonamassa.Contract.Entities.OfertaEntity;
import com.maonamassa.maonamassa.Contract.Services.OfertaService;

@RestController
@RequestMapping("/offers")
public class OfertaController {

    @Autowired
    private OfertaService ofertaService;

    
    @PostMapping("/contratante")
    public ResponseEntity<OfertaEntity> fazerOferta(@RequestBody OfertaRequest ofertaRequest) {
        System.out.println("OfertaController.fazerOferta");
        System.out.println("ofertaRequest: " + ofertaRequest);
        // Criar a oferta
        try{
        OfertaEntity oferta = ofertaService.criarOferta(
            ofertaRequest.getContratanteEmail(),
            ofertaRequest.getProfissionalId(),
            ofertaRequest.getDetalhes(), // Assuming there's an additional detail to be passed
            ofertaRequest.getValor()
        );
        return ResponseEntity.ok(oferta);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/profissional/{id}")
    public ResponseEntity<List<FindOFertasResponse>> getOffers(@PathVariable UUID id) {
        try{
            return ResponseEntity.ok(ofertaService.getOfertas(id));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/profissional/accept/{id}")
    public ResponseEntity<FindOFertasResponse> acceptOffer(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(ofertaService.acceptOffer(id));
        } catch (IllegalArgumentException ex) {
            // Captura erro de UUID inválido
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/profissional/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable UUID id) {
        try {
            ofertaService.deleteOffer(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException ex) {
            // Captura erro de UUID inválido
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
