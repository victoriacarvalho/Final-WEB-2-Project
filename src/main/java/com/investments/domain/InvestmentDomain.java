
package com.investments.domain;

import com.investments.enums.EnumInvestmentType;
import com.investments.model.InvestmentType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class InvestmentDomain {
    private Integer id;
    private EnumInvestmentType type;
    private String symbol;
    private Integer quantity;
    private BigDecimal purchasePrice;
    private LocalDate purchaseDate;

    public BigDecimal getTotalInvested() {
        if (purchasePrice == null || quantity == null) {
            return BigDecimal.ZERO;
        }
        return purchasePrice.multiply(BigDecimal.valueOf(quantity));
    }

	public InvestmentDomain(Integer id2, InvestmentType type2, String symbol2, Integer quantity2,
			BigDecimal purchasePrice2, LocalDate purchaseDate2) {
		//TODO Auto-generated constructor stub
	}
}