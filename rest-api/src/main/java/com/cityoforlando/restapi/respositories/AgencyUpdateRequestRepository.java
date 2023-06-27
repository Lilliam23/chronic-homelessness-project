package com.cityoforlando.restapi.respositories;

import com.cityoforlando.restapi.models.Agency;
import com.cityoforlando.restapi.models.AgencyUpdateRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AgencyUpdateRequestRepository extends MongoRepository<AgencyUpdateRequest, String> {
}
