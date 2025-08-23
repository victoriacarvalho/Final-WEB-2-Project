
package com.investments.dtos;

import com.investments.enums.EnumInvestmentType;
import java.math.BigDecimal;
import java.util.Map;

public record PortfolioSummaryDTO(
        BigDecimal totalInvested,
        Map<EnumInvestmentType, BigDecimal> totalByType,
        long assetCount
) {
}