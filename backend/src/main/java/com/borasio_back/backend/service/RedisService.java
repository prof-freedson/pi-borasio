package com.borasio_back.backend.service;

import org.springframework.stereotype.Service;

@Service
public class RedisService {
    public void setValue(String key, String value) {
        // Implement Redis set logic here
    }

    public String getValue(String key) {
        // Implement Redis get logic here
        return "dummy";
    }
}
