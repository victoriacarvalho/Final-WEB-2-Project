package com.investments.service;

import com.investments.converter.InvestmentConverter;
import com.investments.domain.InvestmentDomain;
import com.investments.dtos.CreateInvestmentDTO;
import com.investments.dtos.InvestmentDTO;
import com.investments.dtos.PortfolioSummaryDTO;
import com.investments.dtos.UpdateInvestmentDTO;
import com.investments.enums.EnumInvestmentType;
import com.investments.model.InvestmentModel;
import com.investments.repositories.IInvestmentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InvestmentService {

    private final IInvestmentRepository repository;
    private final InvestmentConverter converter;
    private final MarketDataService marketDataService;

    public InvestmentService(IInvestmentRepository repository, InvestmentConverter converter, MarketDataService marketDataService) {
        this.repository = repository;
        this.converter = converter;
        this.marketDataService = marketDataService;
    }

    public InvestmentDTO create(CreateInvestmentDTO createDTO) {
        InvestmentDomain domain = new InvestmentDomain(
                null,
                createDTO.type(), 
                createDTO.symbol(),
                createDTO.quantity(),
                createDTO.purchasePrice(),
                createDTO.purchaseDate(),
                createDTO.purchasePrice() 
        );
        InvestmentModel model = converter.toModel(domain);
        InvestmentModel savedModel = repository.save(model);
        return converter.toDTO(converter.toDomain(savedModel));
    }

    public List<InvestmentDTO> listAll(EnumInvestmentType type) {
        List<InvestmentModel> models;
        if (type != null) {
            models = repository.findByType(type);
        } else {
            models = repository.findAll();
        }
        return models.stream()
                .map(converter::toDomain)
                .map(converter::toDTO)
                .collect(Collectors.toList());
    }

    public InvestmentDTO findById(Integer id) {
        InvestmentModel model = findModelById(id);
        return converter.toDTO(converter.toDomain(model));
    }

    public InvestmentDTO update(Integer id, UpdateInvestmentDTO updateDTO) {
        InvestmentModel model = findModelById(id);
        if (updateDTO.quantity() != null) {
            model.setQuantity(updateDTO.quantity());
        }
        if (updateDTO.purchasePrice() != null) {
            model.setPurchasePrice(updateDTO.purchasePrice());
        }
        InvestmentModel updatedModel = repository.save(model);
        return converter.toDTO(converter.toDomain(updatedModel));
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Investimento com ID " + id + " não encontrado.");
        }
        repository.deleteById(id);
    }

    public PortfolioSummaryDTO getSummary() {
        List<InvestmentDomain> domains = repository.findAll().stream()
                .map(converter::toDomain)
                .toList();

        BigDecimal totalInvested = domains.stream()
                .map(InvestmentDomain::getTotalInvested)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<EnumInvestmentType, BigDecimal> totalByType = domains.stream()
                .collect(Collectors.groupingBy(
                        InvestmentDomain::getType,
                        Collectors.mapping(
                                InvestmentDomain::getTotalInvested,
                                Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                        )
                ));

        return new PortfolioSummaryDTO(totalInvested, totalByType, domains.size());
    }
    
    public void simulateMarketUpdate() {
        marketDataService.updateMarketPrices();
    }

    private InvestmentModel findModelById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Investimento com ID " + id + " não encontrado."));
    }
}
