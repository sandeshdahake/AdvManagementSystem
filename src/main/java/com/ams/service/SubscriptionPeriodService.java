package com.ams.service;

import com.ams.domain.SubscriptionPeriod;
import com.ams.repository.SubscriptionPeriodRepository;
import com.ams.service.dto.SubscriptionPeriodDTO;
import com.ams.service.mapper.SubscriptionPeriodMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing SubscriptionPeriod.
 */
@Service
@Transactional
public class SubscriptionPeriodService {

    private final Logger log = LoggerFactory.getLogger(SubscriptionPeriodService.class);

    private final SubscriptionPeriodRepository subscriptionPeriodRepository;

    private final SubscriptionPeriodMapper subscriptionPeriodMapper;

    public SubscriptionPeriodService(SubscriptionPeriodRepository subscriptionPeriodRepository, SubscriptionPeriodMapper subscriptionPeriodMapper) {
        this.subscriptionPeriodRepository = subscriptionPeriodRepository;
        this.subscriptionPeriodMapper = subscriptionPeriodMapper;
    }

    /**
     * Save a subscriptionPeriod.
     *
     * @param subscriptionPeriodDTO the entity to save
     * @return the persisted entity
     */
    public SubscriptionPeriodDTO save(SubscriptionPeriodDTO subscriptionPeriodDTO) {
        log.debug("Request to save SubscriptionPeriod : {}", subscriptionPeriodDTO);
        SubscriptionPeriod subscriptionPeriod = subscriptionPeriodMapper.toEntity(subscriptionPeriodDTO);
        subscriptionPeriod = subscriptionPeriodRepository.save(subscriptionPeriod);
        return subscriptionPeriodMapper.toDto(subscriptionPeriod);
    }

    /**
     * Get all the subscriptionPeriods.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SubscriptionPeriodDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SubscriptionPeriods");
        return subscriptionPeriodRepository.findAll(pageable)
            .map(subscriptionPeriodMapper::toDto);
    }

    /**
     * Get one subscriptionPeriod by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SubscriptionPeriodDTO findOne(Long id) {
        log.debug("Request to get SubscriptionPeriod : {}", id);
        SubscriptionPeriod subscriptionPeriod = subscriptionPeriodRepository.findOne(id);
        return subscriptionPeriodMapper.toDto(subscriptionPeriod);
    }

    /**
     * Delete the subscriptionPeriod by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SubscriptionPeriod : {}", id);
        subscriptionPeriodRepository.delete(id);
    }
}
