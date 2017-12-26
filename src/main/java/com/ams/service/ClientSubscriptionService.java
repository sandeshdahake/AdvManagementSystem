package com.ams.service;

import com.ams.domain.City;
import com.ams.domain.ClientSubscription;
import com.ams.domain.SubscriptionPlan;
import com.ams.repository.CityRepository;
import com.ams.repository.ClientSubscriptionRepository;
import com.ams.repository.SubscriptionPlanRepository;
import com.ams.service.dto.ClientSubscriptionDTO;
import com.ams.service.mapper.ClientSubscriptionMapper;
import com.ams.web.rest.errors.MaxSubscriptionReachedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Service Implementation for managing ClientSubscription.
 */
@Service
@Transactional
public class ClientSubscriptionService {

    private final Logger log = LoggerFactory.getLogger(ClientSubscriptionService.class);

    private final ClientSubscriptionRepository clientSubscriptionRepository;
    private final SubscriptionPlanRepository subscriptionPlanRepository;
    private final CityRepository cityRepository;
    private final ClientSubscriptionMapper clientSubscriptionMapper;

    public ClientSubscriptionService(ClientSubscriptionRepository clientSubscriptionRepository, ClientSubscriptionMapper clientSubscriptionMapper
        , SubscriptionPlanRepository subscriptionPlanRepository, CityRepository cityRepository) {
        this.clientSubscriptionRepository = clientSubscriptionRepository;
        this.clientSubscriptionMapper = clientSubscriptionMapper;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.cityRepository = cityRepository;
    }

    /**
     * Save a clientSubscription.
     *
     * @param clientSubscriptionDTO the entity to save
     * @return the persisted entity
     */
    public ClientSubscriptionDTO save(ClientSubscriptionDTO clientSubscriptionDTO, boolean isUpdate){
        log.debug("Request to save ClientSubscription : {}", clientSubscriptionDTO);
        ClientSubscription clientSubscription = clientSubscriptionMapper.toEntity(clientSubscriptionDTO);
        City city = cityRepository.findOne(clientSubscriptionDTO.getCityId());
       SubscriptionPlan plan = subscriptionPlanRepository.findOne(clientSubscriptionDTO.getSubscriptionPlanId());

        List<ClientSubscriptionDTO> listOfSubscription  = this.findAllByCityByPlan(city.getCityName(), plan.getPlanName());
        if(listOfSubscription.size() < plan.getMaxSubscription() || isUpdate){
            clientSubscription = clientSubscriptionRepository.save(clientSubscription);
            return clientSubscriptionMapper.toDto(clientSubscription);
        }else{
            throw new MaxSubscriptionReachedException();
        }
    }

    /**
     * Get all the clientSubscriptions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ClientSubscriptionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ClientSubscriptions");
        return clientSubscriptionRepository.findAll(pageable)
            .map(clientSubscriptionMapper::toDto);
    }

    /**
     * Get one clientSubscription by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ClientSubscriptionDTO findOne(Long id) {
        log.debug("Request to get ClientSubscription : {}", id);
        ClientSubscription clientSubscription = clientSubscriptionRepository.findOne(id);
        return clientSubscriptionMapper.toDto(clientSubscription);
    }

    /**
     * Delete the clientSubscription by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ClientSubscription : {}", id);
        clientSubscriptionRepository.delete(id);
    }

    public List<ClientSubscriptionDTO> findAllByCityByPlan(String cityName, String planName) {
        log.debug("Request to get ClientSubscription by city and plan: {}", cityName,planName);
        return
            clientSubscriptionMapper.toDto(clientSubscriptionRepository.findAllByCityNameByPlanName(cityName, planName));

    }

    public List<Object> findUrlByCityByPlan(String cityName, String planName) {
        return clientSubscriptionRepository.findUrlByCityNameByPlanName(cityName, planName);
    }
}
//abstract.
