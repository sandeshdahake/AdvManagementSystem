package com.ams.service.mapper;

import com.ams.domain.*;
import com.ams.service.dto.SubscriptionPlanDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SubscriptionPlan and its DTO SubscriptionPlanDTO.
 */
@Mapper(componentModel = "spring", uses = {BannerTypeMapper.class, BannerSizeMapper.class, BannerLocationMapper.class, BannerPageMapper.class, SubscriptionPeriodMapper.class, CityMapper.class})
public interface SubscriptionPlanMapper extends EntityMapper<SubscriptionPlanDTO, SubscriptionPlan> {

    @Mapping(source = "bannerType.id", target = "bannerTypeId")
    @Mapping(source = "bannerType.bannerType", target = "bannerTypeBannerType")
    @Mapping(source = "bannerSize.id", target = "bannerSizeId")
    @Mapping(source = "bannerSize.bannerSize", target = "bannerSizeBannerSize")
    @Mapping(source = "bannerLocation.id", target = "bannerLocationId")
    @Mapping(source = "bannerLocation.bannerLocation", target = "bannerLocationBannerLocation")
    @Mapping(source = "bannerPage.id", target = "bannerPageId")
    @Mapping(source = "bannerPage.bannerPage", target = "bannerPageBannerPage")
    @Mapping(source = "subscriptionPeriod.id", target = "subscriptionPeriodId")
    @Mapping(source = "subscriptionPeriod.periodLabel", target = "subscriptionPeriodPeriodLabel")
    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.cityName", target = "cityCityName")
    SubscriptionPlanDTO toDto(SubscriptionPlan subscriptionPlan); 

    @Mapping(source = "bannerTypeId", target = "bannerType")
    @Mapping(source = "bannerSizeId", target = "bannerSize")
    @Mapping(source = "bannerLocationId", target = "bannerLocation")
    @Mapping(source = "bannerPageId", target = "bannerPage")
    @Mapping(source = "subscriptionPeriodId", target = "subscriptionPeriod")
    @Mapping(source = "cityId", target = "city")
    @Mapping(target = "subscriptions", ignore = true)
    SubscriptionPlan toEntity(SubscriptionPlanDTO subscriptionPlanDTO);

    default SubscriptionPlan fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubscriptionPlan subscriptionPlan = new SubscriptionPlan();
        subscriptionPlan.setId(id);
        return subscriptionPlan;
    }
}
