package com.ams.service;

import com.ams.domain.SubscriptionPlan;
import com.ams.repository.SubscriptionPlanRepository;
import com.ams.service.dto.SubscriptionPlanDTO;
import com.ams.service.mapper.SubscriptionPlanMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing SubscriptionPlan.
 */
@Service
@Transactional
public class SubscriptionPlanService {

    private final Logger log = LoggerFactory.getLogger(SubscriptionPlanService.class);

    private final SubscriptionPlanRepository subscriptionPlanRepository;

    private final SubscriptionPlanMapper subscriptionPlanMapper;

    public SubscriptionPlanService(SubscriptionPlanRepository subscriptionPlanRepository, SubscriptionPlanMapper subscriptionPlanMapper) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.subscriptionPlanMapper = subscriptionPlanMapper;
    }

    /**
     * Save a subscriptionPlan.
     *
     * @param subscriptionPlanDTO the entity to save
     * @return the persisted entity
     */
    public SubscriptionPlanDTO save(SubscriptionPlanDTO subscriptionPlanDTO) {
        log.debug("Request to save SubscriptionPlan : {}", subscriptionPlanDTO);
        SubscriptionPlan subscriptionPlan = subscriptionPlanMapper.toEntity(subscriptionPlanDTO);
        subscriptionPlan = subscriptionPlanRepository.save(subscriptionPlan);
        return subscriptionPlanMapper.toDto(subscriptionPlan);
    }

    /**
     * Get all the subscriptionPlans.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SubscriptionPlanDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SubscriptionPlans");
        return subscriptionPlanRepository.findAll(pageable)
            .map(subscriptionPlanMapper::toDto);
    }

    /**
     * Get one subscriptionPlan by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SubscriptionPlanDTO findOne(Long id) {
        log.debug("Request to get SubscriptionPlan : {}", id);
        SubscriptionPlan subscriptionPlan = subscriptionPlanRepository.findOne(id);
        return subscriptionPlanMapper.toDto(subscriptionPlan);
    }

    /**
     * Delete the subscriptionPlan by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SubscriptionPlan : {}", id);
        subscriptionPlanRepository.delete(id);
    }
}
