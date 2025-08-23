package com.investments.controller;

import com.investments.dtos.CreateInvestmentDTO;
import com.investments.dtos.InvestmentDTO;
import com.investments.dtos.PortfolioSummaryDTO;
import com.investments.dtos.UpdateInvestmentDTO;
import com.investments.enums.EnumInvestmentType;
import com.investments.service.InvestmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/investments")
public class InvestmentController {

    private final InvestmentService service;

    public InvestmentController(InvestmentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<InvestmentDTO> create(@Valid @RequestBody CreateInvestmentDTO createDTO) {
        InvestmentDTO created = service.create(createDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @GetMapping
    public ResponseEntity<List<InvestmentDTO>> listAll(@RequestParam(required = false) EnumInvestmentType type) {
        return ResponseEntity.ok(service.listAll(type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestmentDTO> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestmentDTO> update(@PathVariable Integer id, @Valid @RequestBody UpdateInvestmentDTO updateDTO) {
        return ResponseEntity.ok(service.update(id, updateDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<PortfolioSummaryDTO> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }
}