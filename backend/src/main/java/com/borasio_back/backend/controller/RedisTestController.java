package com.borasio_back.backend.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.borasio_back.backend.service.RedisService;
@RestController
@RequestMapping("/redis")
public class RedisTestController {

    @Autowired
    private RedisService redisService;

    @GetMapping("/set")
    public String setValue(@RequestParam String key, @RequestParam String value) {
        redisService.setValue(key, value);
        return "Valor salvo!";
    }

    @GetMapping("/get")
    public String getValue(@RequestParam String key) {
        return redisService.getValue(key);
    }
}