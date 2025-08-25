// Adicione esta rota ao método routes() em GatewayApiConfig.java

.route("investments-service", r -> r.path("/investments/**")
    .uri("lb://investments"))