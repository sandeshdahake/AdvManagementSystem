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
 * A BannerType.
 */
@Entity
@Table(name = "banner_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BannerType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "banner_type", length = 200, nullable = false)
    private String bannerType;

    @NotNull
    @Column(name = "jhi_activate", nullable = false)
    private Boolean activate;

    @OneToMany(mappedBy = "bannerType")
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

    public String getBannerType() {
        return bannerType;
    }

    public BannerType bannerType(String bannerType) {
        this.bannerType = bannerType;
        return this;
    }

    public void setBannerType(String bannerType) {
        this.bannerType = bannerType;
    }

    public Boolean isActivate() {
        return activate;
    }

    public BannerType activate(Boolean activate) {
        this.activate = activate;
        return this;
    }

    public void setActivate(Boolean activate) {
        this.activate = activate;
    }

    public Set<SubscriptionPlan> getSubscriptionPlans() {
        return subscriptionPlans;
    }

    public BannerType subscriptionPlans(Set<SubscriptionPlan> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
        return this;
    }

    public BannerType addSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.add(subscriptionPlan);
        subscriptionPlan.setBannerType(this);
        return this;
    }

    public BannerType removeSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.remove(subscriptionPlan);
        subscriptionPlan.setBannerType(null);
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
        BannerType bannerType = (BannerType) o;
        if (bannerType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bannerType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BannerType{" +
            "id=" + getId() +
            ", bannerType='" + getBannerType() + "'" +
            ", activate='" + isActivate() + "'" +
            "}";
    }
}
