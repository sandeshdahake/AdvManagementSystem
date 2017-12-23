package com.ams.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ams.service.SubscriptionPeriodService;
import com.ams.web.rest.errors.BadRequestAlertException;
import com.ams.web.rest.util.HeaderUtil;
import com.ams.web.rest.util.PaginationUtil;
import com.ams.service.dto.SubscriptionPeriodDTO;
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
 * REST controller for managing SubscriptionPeriod.
 */
@RestController
@RequestMapping("/api")
public class SubscriptionPeriodResource {

    private final Logger log = LoggerFactory.getLogger(SubscriptionPeriodResource.class);

    private static final String ENTITY_NAME = "subscriptionPeriod";

    private final SubscriptionPeriodService subscriptionPeriodService;

    public SubscriptionPeriodResource(SubscriptionPeriodService subscriptionPeriodService) {
        this.subscriptionPeriodService = subscriptionPeriodService;
    }

    /**
     * POST  /subscription-periods : Create a new subscriptionPeriod.
     *
     * @param subscriptionPeriodDTO the subscriptionPeriodDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subscriptionPeriodDTO, or with status 400 (Bad Request) if the subscriptionPeriod has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/subscription-periods")
    @Timed
    public ResponseEntity<SubscriptionPeriodDTO> createSubscriptionPeriod(@Valid @RequestBody SubscriptionPeriodDTO subscriptionPeriodDTO) throws URISyntaxException {
        log.debug("REST request to save SubscriptionPeriod : {}", subscriptionPeriodDTO);
        if (subscriptionPeriodDTO.getId() != null) {
            throw new BadRequestAlertException("A new subscriptionPeriod cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubscriptionPeriodDTO result = subscriptionPeriodService.save(subscriptionPeriodDTO);
        return ResponseEntity.created(new URI("/api/subscription-periods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /subscription-periods : Updates an existing subscriptionPeriod.
     *
     * @param subscriptionPeriodDTO the subscriptionPeriodDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subscriptionPeriodDTO,
     * or with status 400 (Bad Request) if the subscriptionPeriodDTO is not valid,
     * or with status 500 (Internal Server Error) if the subscriptionPeriodDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/subscription-periods")
    @Timed
    public ResponseEntity<SubscriptionPeriodDTO> updateSubscriptionPeriod(@Valid @RequestBody SubscriptionPeriodDTO subscriptionPeriodDTO) throws URISyntaxException {
        log.debug("REST request to update SubscriptionPeriod : {}", subscriptionPeriodDTO);
        if (subscriptionPeriodDTO.getId() == null) {
            return createSubscriptionPeriod(subscriptionPeriodDTO);
        }
        SubscriptionPeriodDTO result = subscriptionPeriodService.save(subscriptionPeriodDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subscriptionPeriodDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /subscription-periods : get all the subscriptionPeriods.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of subscriptionPeriods in body
     */
    @GetMapping("/subscription-periods")
    @Timed
    public ResponseEntity<List<SubscriptionPeriodDTO>> getAllSubscriptionPeriods(Pageable pageable) {
        log.debug("REST request to get a page of SubscriptionPeriods");
        Page<SubscriptionPeriodDTO> page = subscriptionPeriodService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/subscription-periods");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /subscription-periods/:id : get the "id" subscriptionPeriod.
     *
     * @param id the id of the subscriptionPeriodDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subscriptionPeriodDTO, or with status 404 (Not Found)
     */
    @GetMapping("/subscription-periods/{id}")
    @Timed
    public ResponseEntity<SubscriptionPeriodDTO> getSubscriptionPeriod(@PathVariable Long id) {
        log.debug("REST request to get SubscriptionPeriod : {}", id);
        SubscriptionPeriodDTO subscriptionPeriodDTO = subscriptionPeriodService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(subscriptionPeriodDTO));
    }

    /**
     * DELETE  /subscription-periods/:id : delete the "id" subscriptionPeriod.
     *
     * @param id the id of the subscriptionPeriodDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/subscription-periods/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubscriptionPeriod(@PathVariable Long id) {
        log.debug("REST request to delete SubscriptionPeriod : {}", id);
        subscriptionPeriodService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
