package com.cityoforlando.restapi.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "users")
public class Users {
    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private Date dateCreated;
    private Date dateUpdated;
    private boolean active;

}
