package com.ams.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ams.service.ClientSubscriptionService;
import com.ams.web.rest.errors.BadRequestAlertException;
import com.ams.web.rest.util.HeaderUtil;
import com.ams.web.rest.util.PaginationUtil;
import com.ams.service.dto.ClientSubscriptionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ClientSubscription.
 */
@RestController
@RequestMapping("/api")
public class ClientSubscriptionResource {

    private final Logger log = LoggerFactory.getLogger(ClientSubscriptionResource.class);

    private static final String ENTITY_NAME = "clientSubscription";

    private final ClientSubscriptionService clientSubscriptionService;

    public ClientSubscriptionResource(ClientSubscriptionService clientSubscriptionService) {
        this.clientSubscriptionService = clientSubscriptionService;
    }

    /**
     * POST  /client-subscriptions : Create a new clientSubscription.
     *
     * @param clientSubscriptionDTO the clientSubscriptionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clientSubscriptionDTO, or with status 400 (Bad Request) if the clientSubscription has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/client-subscriptions")
    @Timed
    public ResponseEntity<ClientSubscriptionDTO> createClientSubscription(@Valid @RequestBody ClientSubscriptionDTO clientSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to save ClientSubscription : {}", clientSubscriptionDTO);
        if (clientSubscriptionDTO.getId() != null) {
            throw new BadRequestAlertException("A new clientSubscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientSubscriptionDTO result = clientSubscriptionService.save(clientSubscriptionDTO,false);
        return ResponseEntity.created(new URI("/api/client-subscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /client-subscriptions : Updates an existing clientSubscription.
     *
     * @param clientSubscriptionDTO the clientSubscriptionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clientSubscriptionDTO,
     * or with status 400 (Bad Request) if the clientSubscriptionDTO is not valid,
     * or with status 500 (Internal Server Error) if the clientSubscriptionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/client-subscriptions")
    @Timed
    public ResponseEntity<ClientSubscriptionDTO> updateClientSubscription(@Valid @RequestBody ClientSubscriptionDTO clientSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to update ClientSubscription : {}", clientSubscriptionDTO);
        if (clientSubscriptionDTO.getId() == null) {
            return createClientSubscription(clientSubscriptionDTO);
        }
        ClientSubscriptionDTO result = clientSubscriptionService.save(clientSubscriptionDTO, true);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clientSubscriptionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /client-subscriptions : get all the clientSubscriptions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of clientSubscriptions in body
     */
    @GetMapping("/client-subscriptions")
    @Timed
    public ResponseEntity<List<ClientSubscriptionDTO>> getAllClientSubscriptions(Pageable pageable) {
        log.debug("REST request to get a page of ClientSubscriptions");
        Page<ClientSubscriptionDTO> page = clientSubscriptionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/client-subscriptions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /client-subscriptions/:id : get the "id" clientSubscription.
     *
     * @param id the id of the clientSubscriptionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clientSubscriptionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/client-subscriptions/{id}")
    @Timed
    public ResponseEntity<ClientSubscriptionDTO> getClientSubscription(@PathVariable Long id) {
        log.debug("REST request to get ClientSubscription : {}", id);
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(clientSubscriptionDTO));
    }

    /**
     * DELETE  /client-subscriptions/:id : delete the "id" clientSubscription.
     *
     * @param id the id of the clientSubscriptionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/client-subscriptions/{id}")
    @Timed
    public ResponseEntity<Void> deleteClientSubscription(@PathVariable Long id) {
        log.debug("REST request to delete ClientSubscription : {}", id);
        clientSubscriptionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET  /client-subscriptions/{cityName}/{planName} : get all the clientSubscriptions by city name and plan name.
     *
     * @param cityName the city information
     * @param cityName the city information
     * @return the ResponseEntity with status 200 (OK) and the list of clientSubscriptions in body
     */
    @GetMapping("/client-subscriptions/{cityName}/{planName}")
    @Timed
    public ResponseEntity<List<ClientSubscriptionDTO>> getAllClientSubscriptionsForWidget(@PathVariable String cityName, @PathVariable String  planName ) {
        log.debug("REST request to get a list of  ClientSubscriptions for widgets");
        List<ClientSubscriptionDTO> list = clientSubscriptionService.findAllByCityByPlan(cityName, planName);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/client-subscriptions/url/{cityName}/{planName}")
    @Timed
    public ResponseEntity<List<Object>> findUrlByCityNameByPlanName(@PathVariable String cityName, @PathVariable String  planName ) {
        log.debug("REST request to get a list of  ClientSubscriptions for widgets");
        List<Object> list = clientSubscriptionService.findUrlByCityByPlan(cityName, planName);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


}
