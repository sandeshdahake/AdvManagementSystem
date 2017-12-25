package com.ams.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ClientSubscription entity.
 */
public class ClientSubscriptionDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    private String resourceUrl;

    private String redirectUrl;

    @DecimalMin(value = "0")
    private BigDecimal priorityPrice;

    @DecimalMin(value = "0")
    private BigDecimal discount;

    @NotNull
    @DecimalMin(value = "0")
    private BigDecimal totalPrice;

    @NotNull
    private Boolean activeSubscription;

    private Long cityId;

    private String cityCityName;

    private Long clientId;

    private String clientClientName;

    private Long subscriptionPlanId;

    private String subscriptionPlanPlanName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getResourceUrl() {
        return resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public BigDecimal getPriorityPrice() {
        return priorityPrice;
    }

    public void setPriorityPrice(BigDecimal priorityPrice) {
        this.priorityPrice = priorityPrice;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Boolean isActiveSubscription() {
        return activeSubscription;
    }

    public void setActiveSubscription(Boolean activeSubscription) {
        this.activeSubscription = activeSubscription;
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

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getClientClientName() {
        return clientClientName;
    }

    public void setClientClientName(String clientClientName) {
        this.clientClientName = clientClientName;
    }

    public Long getSubscriptionPlanId() {
        return subscriptionPlanId;
    }

    public void setSubscriptionPlanId(Long subscriptionPlanId) {
        this.subscriptionPlanId = subscriptionPlanId;
    }

    public String getSubscriptionPlanPlanName() {
        return subscriptionPlanPlanName;
    }

    public void setSubscriptionPlanPlanName(String subscriptionPlanPlanName) {
        this.subscriptionPlanPlanName = subscriptionPlanPlanName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClientSubscriptionDTO clientSubscriptionDTO = (ClientSubscriptionDTO) o;
        if(clientSubscriptionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientSubscriptionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientSubscriptionDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", resourceUrl='" + getResourceUrl() + "'" +
            ", redirectUrl='" + getRedirectUrl() + "'" +
            ", priorityPrice=" + getPriorityPrice() +
            ", discount=" + getDiscount() +
            ", totalPrice=" + getTotalPrice() +
            ", activeSubscription='" + isActiveSubscription() + "'" +
            "}";
    }
}
