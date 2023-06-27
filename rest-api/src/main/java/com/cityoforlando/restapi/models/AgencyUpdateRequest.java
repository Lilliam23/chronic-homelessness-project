package com.cityoforlando.restapi.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "agencies_request_update")
public class AgencyUpdateRequest {
    @Id
    private String id;

    //@Indexed(unique = true)
    private String agencyId;
    private String token;
    private Date createdAt;
    private Date expiringAt;
}
