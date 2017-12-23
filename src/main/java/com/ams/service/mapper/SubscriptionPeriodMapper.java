package com.ams.service.mapper;

import com.ams.domain.*;
import com.ams.service.dto.SubscriptionPeriodDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SubscriptionPeriod and its DTO SubscriptionPeriodDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SubscriptionPeriodMapper extends EntityMapper<SubscriptionPeriodDTO, SubscriptionPeriod> {

    

    @Mapping(target = "subscriptionPlans", ignore = true)
    SubscriptionPeriod toEntity(SubscriptionPeriodDTO subscriptionPeriodDTO);

    default SubscriptionPeriod fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubscriptionPeriod subscriptionPeriod = new SubscriptionPeriod();
        subscriptionPeriod.setId(id);
        return subscriptionPeriod;
    }
}
