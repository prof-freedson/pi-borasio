package com.borasio_back.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        // Carrega as variáveis do arquivo env.local e as define como propriedades do sistema
        // Isso deve ser feito ANTES de iniciar a aplicação Spring para que o
        // application.properties possa usar os valores.
        Dotenv dotenv = Dotenv.configure().filename("env.local").ignoreIfMissing().load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        SpringApplication.run(BackendApplication.class, args);
    }

}

