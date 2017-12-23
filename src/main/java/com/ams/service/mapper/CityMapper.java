package com.ams.service.mapper;

import com.ams.domain.*;
import com.ams.service.dto.CityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity City and its DTO CityDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CityMapper extends EntityMapper<CityDTO, City> {

    

    @Mapping(target = "subscriptionPlans", ignore = true)
    @Mapping(target = "subscriptions", ignore = true)
    @Mapping(target = "clientNames", ignore = true)
    City toEntity(CityDTO cityDTO);

    default City fromId(Long id) {
        if (id == null) {
            return null;
        }
        City city = new City();
        city.setId(id);
        return city;
    }
}
