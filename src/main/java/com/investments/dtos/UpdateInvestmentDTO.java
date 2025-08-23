
package com.investments.dtos;

import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public record UpdateInvestmentDTO(
        @Positive Integer quantity,
        @Positive BigDecimal purchasePrice
) {
}