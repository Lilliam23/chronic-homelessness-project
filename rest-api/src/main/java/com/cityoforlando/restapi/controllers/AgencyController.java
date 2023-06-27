package com.cityoforlando.restapi.controllers;

import com.cityoforlando.restapi.helpers.EmailHelper;
import com.cityoforlando.restapi.helpers.TokenHelper;
import com.cityoforlando.restapi.helpers.DateHelper;
import com.cityoforlando.restapi.models.Agency;
import com.cityoforlando.restapi.models.AgencyUpdateRequest;
import com.cityoforlando.restapi.services.AgencyService;
import com.cityoforlando.restapi.services.AgencyUpdateRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/agency")
public class AgencyController {
    private final AgencyService agencyService;
    private final AgencyUpdateRequestService agencyUpdateRequestService;

    public AgencyController(AgencyService agencyService, AgencyUpdateRequestService agencyUpdateRequestService) {
        this.agencyService = agencyService;
        this.agencyUpdateRequestService = agencyUpdateRequestService;
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Agency> addAgency(@RequestBody Agency agency) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(agencyService.addAgency(agency));
    }

    @CrossOrigin
    @PostMapping("/request-update")
    public ResponseEntity<List<String>> addAgencyUpdateRequest(@RequestBody List<String> agencyIdsArray) throws IOException {

        for (int i = 0; i < agencyIdsArray.size(); i++) {
            String agencyId = agencyIdsArray.get(i);
            Agency agency = agencyService.getAgencyById(agencyId);
            System.out.println(agency);
            System.out.println(agencyId);
            AgencyUpdateRequest agencyUpdateRequest = new AgencyUpdateRequest();

            agencyUpdateRequest.setAgencyId(agencyId);
            agencyUpdateRequest.setCreatedAt(new Date());
            agencyUpdateRequest.setExpiringAt(DateHelper.currentDateAddDays(7));
            String token = TokenHelper.createToken();
            agencyUpdateRequest.setToken(token);

            AgencyUpdateRequest savedAgencyUpdateRequest = agencyUpdateRequestService.addAgencyUpdateRequest(agencyUpdateRequest);
            System.out.println("update request ID: " + savedAgencyUpdateRequest.getId());

            // Send Email
            String to = agency.getCityContactEmail();
            Boolean test = EmailHelper.SendinblueEmail(to, agency);
            System.out.println("Email Sent " + test + " To: " + to);

        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @CrossOrigin
    @PutMapping
    public ResponseEntity updateAgency(@RequestBody Agency agency) {
        agencyService.updateAgency(agency);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @GetMapping("")
    public ResponseEntity<List<Agency>> getAllAgency() {
        return ResponseEntity.ok(agencyService.getAllAgencies());
    }

    @CrossOrigin
    @GetMapping("/name/{name}")
    public ResponseEntity<List<Agency>> getAgencyByName(@PathVariable String name) {
        return ResponseEntity.ok(agencyService.getAgencyByName(name));
    }
    @CrossOrigin
    @GetMapping("/id/{id}")
    public ResponseEntity<Agency> getAgencyById(@PathVariable String id) {
        return ResponseEntity.ok(agencyService.getAgencyById(id));
    }

    @CrossOrigin
    @DeleteMapping("/id/{id}")
    public ResponseEntity deleteAgency(@PathVariable String id) {
        agencyService.deleteAgency(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
