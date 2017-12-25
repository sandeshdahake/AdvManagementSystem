package com.ams.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SubscriptionPeriod.
 */
@Entity
@Table(name = "subscription_period")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SubscriptionPeriod implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "period_label", length = 200, nullable = false)
    private String periodLabel;

    @NotNull
    @Min(value = 1)
    @Column(name = "subscription_days", nullable = false)
    private Integer subscriptionDays;

    @NotNull
    @Column(name = "jhi_activate", nullable = false)
    private Boolean activate;

    @OneToMany(mappedBy = "subscriptionPeriod")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubscriptionPlan> subscriptionPlans = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPeriodLabel() {
        return periodLabel;
    }

    public SubscriptionPeriod periodLabel(String periodLabel) {
        this.periodLabel = periodLabel;
        return this;
    }

    public void setPeriodLabel(String periodLabel) {
        this.periodLabel = periodLabel;
    }

    public Integer getSubscriptionDays() {
        return subscriptionDays;
    }

    public SubscriptionPeriod subscriptionDays(Integer subscriptionDays) {
        this.subscriptionDays = subscriptionDays;
        return this;
    }

    public void setSubscriptionDays(Integer subscriptionDays) {
        this.subscriptionDays = subscriptionDays;
    }

    public Boolean isActivate() {
        return activate;
    }

    public SubscriptionPeriod activate(Boolean activate) {
        this.activate = activate;
        return this;
    }

    public void setActivate(Boolean activate) {
        this.activate = activate;
    }

    public Set<SubscriptionPlan> getSubscriptionPlans() {
        return subscriptionPlans;
    }

    public SubscriptionPeriod subscriptionPlans(Set<SubscriptionPlan> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
        return this;
    }

    public SubscriptionPeriod addSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.add(subscriptionPlan);
        subscriptionPlan.setSubscriptionPeriod(this);
        return this;
    }

    public SubscriptionPeriod removeSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.remove(subscriptionPlan);
        subscriptionPlan.setSubscriptionPeriod(null);
        return this;
    }

    public void setSubscriptionPlans(Set<SubscriptionPlan> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SubscriptionPeriod subscriptionPeriod = (SubscriptionPeriod) o;
        if (subscriptionPeriod.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subscriptionPeriod.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubscriptionPeriod{" +
            "id=" + getId() +
            ", periodLabel='" + getPeriodLabel() + "'" +
            ", subscriptionDays=" + getSubscriptionDays() +
            ", activate='" + isActivate() + "'" +
            "}";
    }
}
