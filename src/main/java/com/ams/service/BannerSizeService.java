package com.ams.service;

import com.ams.domain.BannerSize;
import com.ams.repository.BannerSizeRepository;
import com.ams.service.dto.BannerSizeDTO;
import com.ams.service.mapper.BannerSizeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BannerSize.
 */
@Service
@Transactional
public class BannerSizeService {

    private final Logger log = LoggerFactory.getLogger(BannerSizeService.class);

    private final BannerSizeRepository bannerSizeRepository;

    private final BannerSizeMapper bannerSizeMapper;

    public BannerSizeService(BannerSizeRepository bannerSizeRepository, BannerSizeMapper bannerSizeMapper) {
        this.bannerSizeRepository = bannerSizeRepository;
        this.bannerSizeMapper = bannerSizeMapper;
    }

    /**
     * Save a bannerSize.
     *
     * @param bannerSizeDTO the entity to save
     * @return the persisted entity
     */
    public BannerSizeDTO save(BannerSizeDTO bannerSizeDTO) {
        log.debug("Request to save BannerSize : {}", bannerSizeDTO);
        BannerSize bannerSize = bannerSizeMapper.toEntity(bannerSizeDTO);
        bannerSize = bannerSizeRepository.save(bannerSize);
        return bannerSizeMapper.toDto(bannerSize);
    }

    /**
     * Get all the bannerSizes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<BannerSizeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BannerSizes");
        return bannerSizeRepository.findAll(pageable)
            .map(bannerSizeMapper::toDto);
    }

    /**
     * Get one bannerSize by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public BannerSizeDTO findOne(Long id) {
        log.debug("Request to get BannerSize : {}", id);
        BannerSize bannerSize = bannerSizeRepository.findOne(id);
        return bannerSizeMapper.toDto(bannerSize);
    }

    /**
     * Delete the bannerSize by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete BannerSize : {}", id);
        bannerSizeRepository.delete(id);
    }
}
