package com.ams.service;

import com.ams.domain.BannerLocation;
import com.ams.repository.BannerLocationRepository;
import com.ams.service.dto.BannerLocationDTO;
import com.ams.service.mapper.BannerLocationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BannerLocation.
 */
@Service
@Transactional
public class BannerLocationService {

    private final Logger log = LoggerFactory.getLogger(BannerLocationService.class);

    private final BannerLocationRepository bannerLocationRepository;

    private final BannerLocationMapper bannerLocationMapper;

    public BannerLocationService(BannerLocationRepository bannerLocationRepository, BannerLocationMapper bannerLocationMapper) {
        this.bannerLocationRepository = bannerLocationRepository;
        this.bannerLocationMapper = bannerLocationMapper;
    }

    /**
     * Save a bannerLocation.
     *
     * @param bannerLocationDTO the entity to save
     * @return the persisted entity
     */
    public BannerLocationDTO save(BannerLocationDTO bannerLocationDTO) {
        log.debug("Request to save BannerLocation : {}", bannerLocationDTO);
        BannerLocation bannerLocation = bannerLocationMapper.toEntity(bannerLocationDTO);
        bannerLocation = bannerLocationRepository.save(bannerLocation);
        return bannerLocationMapper.toDto(bannerLocation);
    }

    /**
     * Get all the bannerLocations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<BannerLocationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BannerLocations");
        return bannerLocationRepository.findAll(pageable)
            .map(bannerLocationMapper::toDto);
    }

    /**
     * Get one bannerLocation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public BannerLocationDTO findOne(Long id) {
        log.debug("Request to get BannerLocation : {}", id);
        BannerLocation bannerLocation = bannerLocationRepository.findOne(id);
        return bannerLocationMapper.toDto(bannerLocation);
    }

    /**
     * Delete the bannerLocation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete BannerLocation : {}", id);
        bannerLocationRepository.delete(id);
    }
}
