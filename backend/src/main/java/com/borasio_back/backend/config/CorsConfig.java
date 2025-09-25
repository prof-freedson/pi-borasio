package com.borasio_back.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica as regras a todos os endpoints
                .allowedOrigins("http://localhost:3000", "https://borasio.com") // Seus domínios
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Seus métodos permitidos
                .allowedHeaders("*") // Permite todos os headers
                .allowCredentials(true); // Permite credenciais (cookies, headers de autorização)
    }
}