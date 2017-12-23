package com.ams.service;

import com.ams.domain.BannerPage;
import com.ams.repository.BannerPageRepository;
import com.ams.service.dto.BannerPageDTO;
import com.ams.service.mapper.BannerPageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BannerPage.
 */
@Service
@Transactional
public class BannerPageService {

    private final Logger log = LoggerFactory.getLogger(BannerPageService.class);

    private final BannerPageRepository bannerPageRepository;

    private final BannerPageMapper bannerPageMapper;

    public BannerPageService(BannerPageRepository bannerPageRepository, BannerPageMapper bannerPageMapper) {
        this.bannerPageRepository = bannerPageRepository;
        this.bannerPageMapper = bannerPageMapper;
    }

    /**
     * Save a bannerPage.
     *
     * @param bannerPageDTO the entity to save
     * @return the persisted entity
     */
    public BannerPageDTO save(BannerPageDTO bannerPageDTO) {
        log.debug("Request to save BannerPage : {}", bannerPageDTO);
        BannerPage bannerPage = bannerPageMapper.toEntity(bannerPageDTO);
        bannerPage = bannerPageRepository.save(bannerPage);
        return bannerPageMapper.toDto(bannerPage);
    }

    /**
     * Get all the bannerPages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<BannerPageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BannerPages");
        return bannerPageRepository.findAll(pageable)
            .map(bannerPageMapper::toDto);
    }

    /**
     * Get one bannerPage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public BannerPageDTO findOne(Long id) {
        log.debug("Request to get BannerPage : {}", id);
        BannerPage bannerPage = bannerPageRepository.findOne(id);
        return bannerPageMapper.toDto(bannerPage);
    }

    /**
     * Delete the bannerPage by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete BannerPage : {}", id);
        bannerPageRepository.delete(id);
    }
}
