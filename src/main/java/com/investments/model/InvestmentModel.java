    package com.investments.model;

    // CORREÇÃO: Importar o enum correto
    import com.investments.enums.EnumInvestmentType;
    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.Setter;

    import java.math.BigDecimal;
    import java.time.LocalDate;

    @Entity
    @Table(name = "investments")
    @Getter
    @Setter
    public class InvestmentModel {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private EnumInvestmentType type;

        @Column(nullable = false)
        private String symbol;

        @Column(nullable = false)
        private Integer quantity;

        @Column(nullable = false, precision = 19, scale = 4)
        private BigDecimal purchasePrice;

        @Column(nullable = false)
        private LocalDate purchaseDate;

        @Column(precision = 19, scale = 4)
        private BigDecimal marketPrice;
    }
    