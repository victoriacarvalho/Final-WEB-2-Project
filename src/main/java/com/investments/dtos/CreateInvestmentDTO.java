package com.investments.dtos;

import com.investments.enums.EnumInvestmentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateInvestmentDTO(
        @NotNull EnumInvestmentType type,
        @NotBlank String symbol,
        @NotNull @Positive Integer quantity,
        @NotNull @Positive BigDecimal purchasePrice,
        @NotNull @PastOrPresent LocalDate purchaseDate
) {
}