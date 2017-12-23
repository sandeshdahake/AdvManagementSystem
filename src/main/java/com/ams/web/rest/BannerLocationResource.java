package com.ams.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ams.service.BannerLocationService;
import com.ams.web.rest.errors.BadRequestAlertException;
import com.ams.web.rest.util.HeaderUtil;
import com.ams.web.rest.util.PaginationUtil;
import com.ams.service.dto.BannerLocationDTO;
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
 * REST controller for managing BannerLocation.
 */
@RestController
@RequestMapping("/api")
public class BannerLocationResource {

    private final Logger log = LoggerFactory.getLogger(BannerLocationResource.class);

    private static final String ENTITY_NAME = "bannerLocation";

    private final BannerLocationService bannerLocationService;

    public BannerLocationResource(BannerLocationService bannerLocationService) {
        this.bannerLocationService = bannerLocationService;
    }

    /**
     * POST  /banner-locations : Create a new bannerLocation.
     *
     * @param bannerLocationDTO the bannerLocationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bannerLocationDTO, or with status 400 (Bad Request) if the bannerLocation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/banner-locations")
    @Timed
    public ResponseEntity<BannerLocationDTO> createBannerLocation(@Valid @RequestBody BannerLocationDTO bannerLocationDTO) throws URISyntaxException {
        log.debug("REST request to save BannerLocation : {}", bannerLocationDTO);
        if (bannerLocationDTO.getId() != null) {
            throw new BadRequestAlertException("A new bannerLocation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BannerLocationDTO result = bannerLocationService.save(bannerLocationDTO);
        return ResponseEntity.created(new URI("/api/banner-locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /banner-locations : Updates an existing bannerLocation.
     *
     * @param bannerLocationDTO the bannerLocationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bannerLocationDTO,
     * or with status 400 (Bad Request) if the bannerLocationDTO is not valid,
     * or with status 500 (Internal Server Error) if the bannerLocationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/banner-locations")
    @Timed
    public ResponseEntity<BannerLocationDTO> updateBannerLocation(@Valid @RequestBody BannerLocationDTO bannerLocationDTO) throws URISyntaxException {
        log.debug("REST request to update BannerLocation : {}", bannerLocationDTO);
        if (bannerLocationDTO.getId() == null) {
            return createBannerLocation(bannerLocationDTO);
        }
        BannerLocationDTO result = bannerLocationService.save(bannerLocationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bannerLocationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /banner-locations : get all the bannerLocations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of bannerLocations in body
     */
    @GetMapping("/banner-locations")
    @Timed
    public ResponseEntity<List<BannerLocationDTO>> getAllBannerLocations(Pageable pageable) {
        log.debug("REST request to get a page of BannerLocations");
        Page<BannerLocationDTO> page = bannerLocationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/banner-locations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /banner-locations/:id : get the "id" bannerLocation.
     *
     * @param id the id of the bannerLocationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bannerLocationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/banner-locations/{id}")
    @Timed
    public ResponseEntity<BannerLocationDTO> getBannerLocation(@PathVariable Long id) {
        log.debug("REST request to get BannerLocation : {}", id);
        BannerLocationDTO bannerLocationDTO = bannerLocationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bannerLocationDTO));
    }

    /**
     * DELETE  /banner-locations/:id : delete the "id" bannerLocation.
     *
     * @param id the id of the bannerLocationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/banner-locations/{id}")
    @Timed
    public ResponseEntity<Void> deleteBannerLocation(@PathVariable Long id) {
        log.debug("REST request to delete BannerLocation : {}", id);
        bannerLocationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
