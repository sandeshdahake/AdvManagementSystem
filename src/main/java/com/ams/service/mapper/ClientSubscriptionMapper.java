package com.ams.service.mapper;

import com.ams.domain.*;
import com.ams.service.dto.ClientSubscriptionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ClientSubscription and its DTO ClientSubscriptionDTO.
 */
@Mapper(componentModel = "spring", uses = {CityMapper.class, ClientMapper.class, SubscriptionPlanMapper.class})
public interface ClientSubscriptionMapper extends EntityMapper<ClientSubscriptionDTO, ClientSubscription> {

    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.cityName", target = "cityCityName")
    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "client.clientName", target = "clientClientName")
    @Mapping(source = "subscriptionPlan.id", target = "subscriptionPlanId")
    @Mapping(source = "subscriptionPlan.planName", target = "subscriptionPlanPlanName")
    ClientSubscriptionDTO toDto(ClientSubscription clientSubscription); 

    @Mapping(source = "cityId", target = "city")
    @Mapping(source = "clientId", target = "client")
    @Mapping(source = "subscriptionPlanId", target = "subscriptionPlan")
    ClientSubscription toEntity(ClientSubscriptionDTO clientSubscriptionDTO);

    default ClientSubscription fromId(Long id) {
        if (id == null) {
            return null;
        }
        ClientSubscription clientSubscription = new ClientSubscription();
        clientSubscription.setId(id);
        return clientSubscription;
    }
}
