package com.ams.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SubscriptionPeriod entity.
 */
public class SubscriptionPeriodDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 200)
    private String periodLabel;

    @NotNull
    @Min(value = 1)
    private Integer subscriptionDays;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPeriodLabel() {
        return periodLabel;
    }

    public void setPeriodLabel(String periodLabel) {
        this.periodLabel = periodLabel;
    }

    public Integer getSubscriptionDays() {
        return subscriptionDays;
    }

    public void setSubscriptionDays(Integer subscriptionDays) {
        this.subscriptionDays = subscriptionDays;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubscriptionPeriodDTO subscriptionPeriodDTO = (SubscriptionPeriodDTO) o;
        if(subscriptionPeriodDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subscriptionPeriodDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubscriptionPeriodDTO{" +
            "id=" + getId() +
            ", periodLabel='" + getPeriodLabel() + "'" +
            ", subscriptionDays=" + getSubscriptionDays() +
            "}";
    }
}
