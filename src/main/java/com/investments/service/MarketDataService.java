package com.investments.service;

import org.springframework.stereotype.Service;

@Service // Anotação importante para o Spring encontrá-la
public class MarketDataService {

   
    public double getPrecoDaAcao(String ticker) {
        System.out.println("Buscando preço para: " + ticker);
        return 100.0;
    }
}