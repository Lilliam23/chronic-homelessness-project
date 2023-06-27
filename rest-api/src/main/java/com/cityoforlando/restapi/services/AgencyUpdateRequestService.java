package com.cityoforlando.restapi.services;

import com.cityoforlando.restapi.models.AgencyUpdateRequest;
import com.cityoforlando.restapi.respositories.AgencyUpdateRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgencyUpdateRequestService {
    @Autowired
    private AgencyUpdateRequestRepository agencyUpdateRequestRepository;

    public AgencyUpdateRequest addAgencyUpdateRequest(AgencyUpdateRequest agencyUpdateRequest) {
        return agencyUpdateRequestRepository.save(agencyUpdateRequest);
    }
}
