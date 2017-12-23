package com.ams.service.mapper;

import com.ams.domain.*;
import com.ams.service.dto.BannerTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BannerType and its DTO BannerTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BannerTypeMapper extends EntityMapper<BannerTypeDTO, BannerType> {

    

    @Mapping(target = "subscriptionPlans", ignore = true)
    BannerType toEntity(BannerTypeDTO bannerTypeDTO);

    default BannerType fromId(Long id) {
        if (id == null) {
            return null;
        }
        BannerType bannerType = new BannerType();
        bannerType.setId(id);
        return bannerType;
    }
}
