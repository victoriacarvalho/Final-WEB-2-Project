package com.investments.dtos;

import com.investments.enums.EnumInvestmentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
// A importação @PastOrPresent foi removida
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateInvestmentDTO(
        @NotNull EnumInvestmentType type,
        @NotBlank String symbol,
        @NotNull @Positive Integer quantity,
        @NotNull @Positive BigDecimal purchasePrice,
        @NotNull LocalDate purchaseDate
) {
}
