package com.ams.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ams.service.BannerPageService;
import com.ams.web.rest.errors.BadRequestAlertException;
import com.ams.web.rest.util.HeaderUtil;
import com.ams.web.rest.util.PaginationUtil;
import com.ams.service.dto.BannerPageDTO;
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
 * REST controller for managing BannerPage.
 */
@RestController
@RequestMapping("/api")
public class BannerPageResource {

    private final Logger log = LoggerFactory.getLogger(BannerPageResource.class);

    private static final String ENTITY_NAME = "bannerPage";

    private final BannerPageService bannerPageService;

    public BannerPageResource(BannerPageService bannerPageService) {
        this.bannerPageService = bannerPageService;
    }

    /**
     * POST  /banner-pages : Create a new bannerPage.
     *
     * @param bannerPageDTO the bannerPageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bannerPageDTO, or with status 400 (Bad Request) if the bannerPage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/banner-pages")
    @Timed
    public ResponseEntity<BannerPageDTO> createBannerPage(@Valid @RequestBody BannerPageDTO bannerPageDTO) throws URISyntaxException {
        log.debug("REST request to save BannerPage : {}", bannerPageDTO);
        if (bannerPageDTO.getId() != null) {
            throw new BadRequestAlertException("A new bannerPage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BannerPageDTO result = bannerPageService.save(bannerPageDTO);
        return ResponseEntity.created(new URI("/api/banner-pages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /banner-pages : Updates an existing bannerPage.
     *
     * @param bannerPageDTO the bannerPageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bannerPageDTO,
     * or with status 400 (Bad Request) if the bannerPageDTO is not valid,
     * or with status 500 (Internal Server Error) if the bannerPageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/banner-pages")
    @Timed
    public ResponseEntity<BannerPageDTO> updateBannerPage(@Valid @RequestBody BannerPageDTO bannerPageDTO) throws URISyntaxException {
        log.debug("REST request to update BannerPage : {}", bannerPageDTO);
        if (bannerPageDTO.getId() == null) {
            return createBannerPage(bannerPageDTO);
        }
        BannerPageDTO result = bannerPageService.save(bannerPageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bannerPageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /banner-pages : get all the bannerPages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of bannerPages in body
     */
    @GetMapping("/banner-pages")
    @Timed
    public ResponseEntity<List<BannerPageDTO>> getAllBannerPages(Pageable pageable) {
        log.debug("REST request to get a page of BannerPages");
        Page<BannerPageDTO> page = bannerPageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/banner-pages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /banner-pages/:id : get the "id" bannerPage.
     *
     * @param id the id of the bannerPageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bannerPageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/banner-pages/{id}")
    @Timed
    public ResponseEntity<BannerPageDTO> getBannerPage(@PathVariable Long id) {
        log.debug("REST request to get BannerPage : {}", id);
        BannerPageDTO bannerPageDTO = bannerPageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bannerPageDTO));
    }

    /**
     * DELETE  /banner-pages/:id : delete the "id" bannerPage.
     *
     * @param id the id of the bannerPageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/banner-pages/{id}")
    @Timed
    public ResponseEntity<Void> deleteBannerPage(@PathVariable Long id) {
        log.debug("REST request to delete BannerPage : {}", id);
        bannerPageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
