package com.investments.converter;

import com.investments.domain.InvestmentDomain;
import com.investments.dtos.InvestmentDTO;
import com.investments.model.InvestmentModel;
import org.springframework.stereotype.Component;

// A classe agora é um Componente Spring, mas os métodos são estáticos para simplicidade
// Isso evita a necessidade de injetá-la, tratando-a como uma classe utilitária.
@Component
public class InvestmentConverter {

    public InvestmentDomain toDomain(InvestmentModel model) {
        return new InvestmentDomain(
                model.getId(),
                model.getType(),
                model.getSymbol(),
                model.getQuantity(),
                model.getPurchasePrice(),
                model.getPurchaseDate()
        );
    }

    public InvestmentDTO toDTO(InvestmentDomain domain) {
        return new InvestmentDTO(
                domain.getId(),
                domain.getType(),
                domain.getSymbol(),
                domain.getQuantity(),
                domain.getPurchasePrice(),
                domain.getPurchaseDate(),
                domain.getTotalInvested()
        );
    }

    public InvestmentModel toModel(InvestmentDomain domain) {
        InvestmentModel model = new InvestmentModel();
        model.setId(domain.getId());
        model.setType(domain.getType());
        model.setSymbol(domain.getSymbol());
        model.setQuantity(domain.getQuantity());
        model.setPurchasePrice(domain.getPurchasePrice());
        model.setPurchaseDate(domain.getPurchaseDate());
        return model;
    }
}
