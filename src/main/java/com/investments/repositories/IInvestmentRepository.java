package com.investments.repositories;

import com.investments.enums.EnumInvestmentType;
import com.investments.model.InvestmentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IInvestmentRepository extends JpaRepository<InvestmentModel, Integer> {

    List<InvestmentModel> findByType(EnumInvestmentType type);
}
