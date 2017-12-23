package com.ams.service;

import com.ams.domain.BannerType;
import com.ams.repository.BannerTypeRepository;
import com.ams.service.dto.BannerTypeDTO;
import com.ams.service.mapper.BannerTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BannerType.
 */
@Service
@Transactional
public class BannerTypeService {

    private final Logger log = LoggerFactory.getLogger(BannerTypeService.class);

    private final BannerTypeRepository bannerTypeRepository;

    private final BannerTypeMapper bannerTypeMapper;

    public BannerTypeService(BannerTypeRepository bannerTypeRepository, BannerTypeMapper bannerTypeMapper) {
        this.bannerTypeRepository = bannerTypeRepository;
        this.bannerTypeMapper = bannerTypeMapper;
    }

    /**
     * Save a bannerType.
     *
     * @param bannerTypeDTO the entity to save
     * @return the persisted entity
     */
    public BannerTypeDTO save(BannerTypeDTO bannerTypeDTO) {
        log.debug("Request to save BannerType : {}", bannerTypeDTO);
        BannerType bannerType = bannerTypeMapper.toEntity(bannerTypeDTO);
        bannerType = bannerTypeRepository.save(bannerType);
        return bannerTypeMapper.toDto(bannerType);
    }

    /**
     * Get all the bannerTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<BannerTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BannerTypes");
        return bannerTypeRepository.findAll(pageable)
            .map(bannerTypeMapper::toDto);
    }

    /**
     * Get one bannerType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public BannerTypeDTO findOne(Long id) {
        log.debug("Request to get BannerType : {}", id);
        BannerType bannerType = bannerTypeRepository.findOne(id);
        return bannerTypeMapper.toDto(bannerType);
    }

    /**
     * Delete the bannerType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete BannerType : {}", id);
        bannerTypeRepository.delete(id);
    }
}
