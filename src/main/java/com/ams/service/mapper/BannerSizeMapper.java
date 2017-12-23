package com.ams.service.mapper;

import com.ams.domain.*;
import com.ams.service.dto.BannerSizeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BannerSize and its DTO BannerSizeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BannerSizeMapper extends EntityMapper<BannerSizeDTO, BannerSize> {

    

    @Mapping(target = "subscriptionPlans", ignore = true)
    BannerSize toEntity(BannerSizeDTO bannerSizeDTO);

    default BannerSize fromId(Long id) {
        if (id == null) {
            return null;
        }
        BannerSize bannerSize = new BannerSize();
        bannerSize.setId(id);
        return bannerSize;
    }
}
