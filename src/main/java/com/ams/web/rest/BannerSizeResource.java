package com.ams.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ams.service.BannerSizeService;
import com.ams.web.rest.errors.BadRequestAlertException;
import com.ams.web.rest.util.HeaderUtil;
import com.ams.web.rest.util.PaginationUtil;
import com.ams.service.dto.BannerSizeDTO;
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
 * REST controller for managing BannerSize.
 */
@RestController
@RequestMapping("/api")
public class BannerSizeResource {

    private final Logger log = LoggerFactory.getLogger(BannerSizeResource.class);

    private static final String ENTITY_NAME = "bannerSize";

    private final BannerSizeService bannerSizeService;

    public BannerSizeResource(BannerSizeService bannerSizeService) {
        this.bannerSizeService = bannerSizeService;
    }

    /**
     * POST  /banner-sizes : Create a new bannerSize.
     *
     * @param bannerSizeDTO the bannerSizeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bannerSizeDTO, or with status 400 (Bad Request) if the bannerSize has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/banner-sizes")
    @Timed
    public ResponseEntity<BannerSizeDTO> createBannerSize(@Valid @RequestBody BannerSizeDTO bannerSizeDTO) throws URISyntaxException {
        log.debug("REST request to save BannerSize : {}", bannerSizeDTO);
        if (bannerSizeDTO.getId() != null) {
            throw new BadRequestAlertException("A new bannerSize cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BannerSizeDTO result = bannerSizeService.save(bannerSizeDTO);
        return ResponseEntity.created(new URI("/api/banner-sizes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /banner-sizes : Updates an existing bannerSize.
     *
     * @param bannerSizeDTO the bannerSizeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bannerSizeDTO,
     * or with status 400 (Bad Request) if the bannerSizeDTO is not valid,
     * or with status 500 (Internal Server Error) if the bannerSizeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/banner-sizes")
    @Timed
    public ResponseEntity<BannerSizeDTO> updateBannerSize(@Valid @RequestBody BannerSizeDTO bannerSizeDTO) throws URISyntaxException {
        log.debug("REST request to update BannerSize : {}", bannerSizeDTO);
        if (bannerSizeDTO.getId() == null) {
            return createBannerSize(bannerSizeDTO);
        }
        BannerSizeDTO result = bannerSizeService.save(bannerSizeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bannerSizeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /banner-sizes : get all the bannerSizes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of bannerSizes in body
     */
    @GetMapping("/banner-sizes")
    @Timed
    public ResponseEntity<List<BannerSizeDTO>> getAllBannerSizes(Pageable pageable) {
        log.debug("REST request to get a page of BannerSizes");
        Page<BannerSizeDTO> page = bannerSizeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/banner-sizes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /banner-sizes/:id : get the "id" bannerSize.
     *
     * @param id the id of the bannerSizeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bannerSizeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/banner-sizes/{id}")
    @Timed
    public ResponseEntity<BannerSizeDTO> getBannerSize(@PathVariable Long id) {
        log.debug("REST request to get BannerSize : {}", id);
        BannerSizeDTO bannerSizeDTO = bannerSizeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bannerSizeDTO));
    }

    /**
     * DELETE  /banner-sizes/:id : delete the "id" bannerSize.
     *
     * @param id the id of the bannerSizeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/banner-sizes/{id}")
    @Timed
    public ResponseEntity<Void> deleteBannerSize(@PathVariable Long id) {
        log.debug("REST request to delete BannerSize : {}", id);
        bannerSizeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
