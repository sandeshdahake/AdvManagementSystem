package com.ams.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SubscriptionPlan entity.
 */
public class SubscriptionPlanDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 200)
    private String planName;

    @NotNull
    @DecimalMin(value = "0")
    private BigDecimal price;

    @NotNull
    @Min(value = 0)
    private Integer maxSubscription;

    @NotNull
    private Boolean activate;

    private Long bannerTypeId;

    private String bannerTypeBannerType;

    private Long bannerSizeId;

    private String bannerSizeBannerSize;

    private Long bannerLocationId;

    private String bannerLocationBannerLocation;

    private Long bannerPageId;

    private String bannerPageBannerPage;

    private Long subscriptionPeriodId;

    private String subscriptionPeriodPeriodLabel;

    private Long cityId;

    private String cityCityName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getMaxSubscription() {
        return maxSubscription;
    }

    public void setMaxSubscription(Integer maxSubscription) {
        this.maxSubscription = maxSubscription;
    }

    public Boolean isActivate() {
        return activate;
    }

    public void setActivate(Boolean activate) {
        this.activate = activate;
    }

    public Long getBannerTypeId() {
        return bannerTypeId;
    }

    public void setBannerTypeId(Long bannerTypeId) {
        this.bannerTypeId = bannerTypeId;
    }

    public String getBannerTypeBannerType() {
        return bannerTypeBannerType;
    }

    public void setBannerTypeBannerType(String bannerTypeBannerType) {
        this.bannerTypeBannerType = bannerTypeBannerType;
    }

    public Long getBannerSizeId() {
        return bannerSizeId;
    }

    public void setBannerSizeId(Long bannerSizeId) {
        this.bannerSizeId = bannerSizeId;
    }

    public String getBannerSizeBannerSize() {
        return bannerSizeBannerSize;
    }

    public void setBannerSizeBannerSize(String bannerSizeBannerSize) {
        this.bannerSizeBannerSize = bannerSizeBannerSize;
    }

    public Long getBannerLocationId() {
        return bannerLocationId;
    }

    public void setBannerLocationId(Long bannerLocationId) {
        this.bannerLocationId = bannerLocationId;
    }

    public String getBannerLocationBannerLocation() {
        return bannerLocationBannerLocation;
    }

    public void setBannerLocationBannerLocation(String bannerLocationBannerLocation) {
        this.bannerLocationBannerLocation = bannerLocationBannerLocation;
    }

    public Long getBannerPageId() {
        return bannerPageId;
    }

    public void setBannerPageId(Long bannerPageId) {
        this.bannerPageId = bannerPageId;
    }

    public String getBannerPageBannerPage() {
        return bannerPageBannerPage;
    }

    public void setBannerPageBannerPage(String bannerPageBannerPage) {
        this.bannerPageBannerPage = bannerPageBannerPage;
    }

    public Long getSubscriptionPeriodId() {
        return subscriptionPeriodId;
    }

    public void setSubscriptionPeriodId(Long subscriptionPeriodId) {
        this.subscriptionPeriodId = subscriptionPeriodId;
    }

    public String getSubscriptionPeriodPeriodLabel() {
        return subscriptionPeriodPeriodLabel;
    }

    public void setSubscriptionPeriodPeriodLabel(String subscriptionPeriodPeriodLabel) {
        this.subscriptionPeriodPeriodLabel = subscriptionPeriodPeriodLabel;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public String getCityCityName() {
        return cityCityName;
    }

    public void setCityCityName(String cityCityName) {
        this.cityCityName = cityCityName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubscriptionPlanDTO subscriptionPlanDTO = (SubscriptionPlanDTO) o;
        if(subscriptionPlanDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subscriptionPlanDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubscriptionPlanDTO{" +
            "id=" + getId() +
            ", planName='" + getPlanName() + "'" +
            ", price=" + getPrice() +
            ", maxSubscription=" + getMaxSubscription() +
            ", activate='" + isActivate() + "'" +
            "}";
    }
}
