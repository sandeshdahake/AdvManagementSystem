package com.ams.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ams.service.BannerTypeService;
import com.ams.web.rest.errors.BadRequestAlertException;
import com.ams.web.rest.util.HeaderUtil;
import com.ams.web.rest.util.PaginationUtil;
import com.ams.service.dto.BannerTypeDTO;
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
 * REST controller for managing BannerType.
 */
@RestController
@RequestMapping("/api")
public class BannerTypeResource {

    private final Logger log = LoggerFactory.getLogger(BannerTypeResource.class);

    private static final String ENTITY_NAME = "bannerType";

    private final BannerTypeService bannerTypeService;

    public BannerTypeResource(BannerTypeService bannerTypeService) {
        this.bannerTypeService = bannerTypeService;
    }

    /**
     * POST  /banner-types : Create a new bannerType.
     *
     * @param bannerTypeDTO the bannerTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bannerTypeDTO, or with status 400 (Bad Request) if the bannerType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/banner-types")
    @Timed
    public ResponseEntity<BannerTypeDTO> createBannerType(@Valid @RequestBody BannerTypeDTO bannerTypeDTO) throws URISyntaxException {
        log.debug("REST request to save BannerType : {}", bannerTypeDTO);
        if (bannerTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new bannerType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BannerTypeDTO result = bannerTypeService.save(bannerTypeDTO);
        return ResponseEntity.created(new URI("/api/banner-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /banner-types : Updates an existing bannerType.
     *
     * @param bannerTypeDTO the bannerTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bannerTypeDTO,
     * or with status 400 (Bad Request) if the bannerTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the bannerTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/banner-types")
    @Timed
    public ResponseEntity<BannerTypeDTO> updateBannerType(@Valid @RequestBody BannerTypeDTO bannerTypeDTO) throws URISyntaxException {
        log.debug("REST request to update BannerType : {}", bannerTypeDTO);
        if (bannerTypeDTO.getId() == null) {
            return createBannerType(bannerTypeDTO);
        }
        BannerTypeDTO result = bannerTypeService.save(bannerTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bannerTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /banner-types : get all the bannerTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of bannerTypes in body
     */
    @GetMapping("/banner-types")
    @Timed
    public ResponseEntity<List<BannerTypeDTO>> getAllBannerTypes(Pageable pageable) {
        log.debug("REST request to get a page of BannerTypes");
        Page<BannerTypeDTO> page = bannerTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/banner-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /banner-types/:id : get the "id" bannerType.
     *
     * @param id the id of the bannerTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bannerTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/banner-types/{id}")
    @Timed
    public ResponseEntity<BannerTypeDTO> getBannerType(@PathVariable Long id) {
        log.debug("REST request to get BannerType : {}", id);
        BannerTypeDTO bannerTypeDTO = bannerTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bannerTypeDTO));
    }

    /**
     * DELETE  /banner-types/:id : delete the "id" bannerType.
     *
     * @param id the id of the bannerTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/banner-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteBannerType(@PathVariable Long id) {
        log.debug("REST request to delete BannerType : {}", id);
        bannerTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
