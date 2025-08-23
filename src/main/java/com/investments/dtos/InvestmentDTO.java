
package com.investments.dtos;

import com.investments.enums.EnumInvestmentType;
import java.math.BigDecimal;
import java.time.LocalDate;

public record InvestmentDTO(
        Integer id,
        EnumInvestmentType type,
        String symbol,
        Integer quantity,
        BigDecimal purchasePrice,
        LocalDate purchaseDate,
        BigDecimal totalInvested
) {
}