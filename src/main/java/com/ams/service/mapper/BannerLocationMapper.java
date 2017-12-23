package com.ams.service.mapper;

import com.ams.domain.*;
import com.ams.service.dto.BannerLocationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BannerLocation and its DTO BannerLocationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BannerLocationMapper extends EntityMapper<BannerLocationDTO, BannerLocation> {

    

    @Mapping(target = "subscriptionPlans", ignore = true)
    BannerLocation toEntity(BannerLocationDTO bannerLocationDTO);

    default BannerLocation fromId(Long id) {
        if (id == null) {
            return null;
        }
        BannerLocation bannerLocation = new BannerLocation();
        bannerLocation.setId(id);
        return bannerLocation;
    }
}
