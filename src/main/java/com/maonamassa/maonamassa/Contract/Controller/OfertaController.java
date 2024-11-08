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

    // Endpoint para criar a oferta
    @PostMapping
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

    @GetMapping("/{id}")
    public ResponseEntity<List<FindOFertasResponse>> getOffers(@PathVariable UUID id) {
        try{
            return ResponseEntity.ok(ofertaService.getOfertas(id));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
