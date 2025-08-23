package com.investments;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// A anotação @EnableDiscoveryClient foi removida pois não é um microsserviço
@SpringBootApplication
public class InvestmentsApplication {

    public static void main(String[] args) {
        SpringApplication.run(InvestmentsApplication.class, args);
    }

}
