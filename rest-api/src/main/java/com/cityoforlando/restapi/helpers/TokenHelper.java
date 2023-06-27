package com.cityoforlando.restapi.helpers;

import java.util.UUID;

public class TokenHelper {

    public static String createToken(){
        String token = UUID.randomUUID().toString().substring(0, 15);
        return token;
    }
}
