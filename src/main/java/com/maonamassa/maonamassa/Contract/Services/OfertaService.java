package com.maonamassa.maonamassa.Contract.Services;

import java.util.UUID;
import java.util.Date;
import java.util.stream.Collectors;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maonamassa.maonamassa.Contract.Controller.DTO.FindOFertasResponse;
import com.maonamassa.maonamassa.Contract.Entities.OfertaEntity;
import com.maonamassa.maonamassa.Contract.Repositories.RepositoryOfertas;
import com.maonamassa.maonamassa.Entities.ContratanteEntity;
import com.maonamassa.maonamassa.Entities.ProfissionalEntity;
import com.maonamassa.maonamassa.Repositories.ContratanteRepository;
import com.maonamassa.maonamassa.Repositories.ProfissionalRepository;

@Service
public class OfertaService {

    @Autowired
    private  RepositoryOfertas ofertaRepository;
    
    @Autowired
    private  ContratanteRepository contratanteRepository; // Para buscar o usuário (contratante)
    
    @Autowired
    private  ProfissionalRepository profissionalRepository; // Para buscar o profissional

    public OfertaEntity criarOferta(String contratanteEmail, UUID profissionalId, String descricao, String valor) {
        try{
        // Buscar o contratante pelo email
        ContratanteEntity contratante = contratanteRepository.findByEmail(contratanteEmail)
                .orElseThrow(() -> new IllegalArgumentException("Contratante não encontrado"));

        // Buscar o profissional pelo ID
        ProfissionalEntity profissional = profissionalRepository.findById(profissionalId)
                .orElseThrow(() -> new IllegalArgumentException("Profissional não encontrado"));

        // Criar a oferta e associar os dados
        OfertaEntity oferta = new OfertaEntity();
        oferta.setContratante(contratante); // Associando o contratante à oferta
        oferta.setProfissional(profissional); // Associando o profissional à oferta
        oferta.setDescricao(descricao); // Descrição da oferta
        oferta.setValor(valor); // Valor da oferta
        oferta.setDataOferta(new Date()); // Data da oferta
        // Definir o prazo de conclusão da oferta ( 7 dias a partir da data atual)
        Date prazoConclusao = new Date(System.currentTimeMillis() + 7L * 24 * 60 * 60 * 1000);
        oferta.setPrazoConclusao(prazoConclusao); // Prazo de conclusão da oferta
        oferta.setAceita(false); // Inicialmente a oferta não foi aceita

        // Salvar a oferta no banco de dados
        return ofertaRepository.save(oferta);
    }catch(Exception e){
        e.printStackTrace();
        return null;
        }
    }   

    public List<FindOFertasResponse> getOfertas(UUID id) {
        try{
        // Buscar todas as ofertas
        List<OfertaEntity> ofertas = ofertaRepository.findAll();

        // Mapear as ofertas para o DTO
        return ofertas.stream().map(oferta -> {
            FindOFertasResponse response = new FindOFertasResponse();
            response.setId(oferta.getId()); // Mapeando o ID da oferta
            response.setContratanteEmail(oferta.getContratante().getEmail()); // Assumindo que `OfertaEntity` tem um relacionamento com `Contratante` que possui um email
            response.setDetalhes(oferta.getDescricao()); // Mapeando o campo de detalhes da oferta
            response.setValor(oferta.getValor()); // Mapeando o campo de valor da oferta
            return response;
        }).collect(Collectors.toList());
    }catch(Exception e){
        e.printStackTrace();
        return null;
        }
    }

    public FindOFertasResponse acceptOffer(UUID id) {
        try{
        // Buscar a oferta pelo ID
        OfertaEntity oferta = ofertaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Oferta não encontrada"));

        // Aceitar a oferta
        oferta.setAceita(true);

        // Mapear a oferta para o DTO
        FindOFertasResponse response = new FindOFertasResponse();
        response.setId(oferta.getId()); // Mapeando o ID da oferta
        return response;
    }catch(Exception e){
        e.printStackTrace();
        return null;
        }
    }
    
    public void deleteOffer(UUID id) {
        try{
        // Buscar a oferta pelo ID
        OfertaEntity oferta = ofertaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Oferta não encontrada"));

        // Deletar a oferta
        ofertaRepository.delete(oferta);
    }catch(Exception e){
        e.printStackTrace();
        }
    }
}

