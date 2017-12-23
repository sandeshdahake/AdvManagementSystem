package com.ams.service.mapper;

import com.ams.domain.*;
import com.ams.service.dto.BannerPageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BannerPage and its DTO BannerPageDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BannerPageMapper extends EntityMapper<BannerPageDTO, BannerPage> {

    

    @Mapping(target = "subscriptionPlans", ignore = true)
    BannerPage toEntity(BannerPageDTO bannerPageDTO);

    default BannerPage fromId(Long id) {
        if (id == null) {
            return null;
        }
        BannerPage bannerPage = new BannerPage();
        bannerPage.setId(id);
        return bannerPage;
    }
}
