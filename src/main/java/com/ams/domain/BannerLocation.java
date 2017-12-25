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
 * A BannerLocation.
 */
@Entity
@Table(name = "banner_location")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BannerLocation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "banner_location", length = 200, nullable = false)
    private String bannerLocation;

    @NotNull
    @Column(name = "jhi_activate", nullable = false)
    private Boolean activate;

    @OneToMany(mappedBy = "bannerLocation")
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

    public String getBannerLocation() {
        return bannerLocation;
    }

    public BannerLocation bannerLocation(String bannerLocation) {
        this.bannerLocation = bannerLocation;
        return this;
    }

    public void setBannerLocation(String bannerLocation) {
        this.bannerLocation = bannerLocation;
    }

    public Boolean isActivate() {
        return activate;
    }

    public BannerLocation activate(Boolean activate) {
        this.activate = activate;
        return this;
    }

    public void setActivate(Boolean activate) {
        this.activate = activate;
    }

    public Set<SubscriptionPlan> getSubscriptionPlans() {
        return subscriptionPlans;
    }

    public BannerLocation subscriptionPlans(Set<SubscriptionPlan> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
        return this;
    }

    public BannerLocation addSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.add(subscriptionPlan);
        subscriptionPlan.setBannerLocation(this);
        return this;
    }

    public BannerLocation removeSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.remove(subscriptionPlan);
        subscriptionPlan.setBannerLocation(null);
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
        BannerLocation bannerLocation = (BannerLocation) o;
        if (bannerLocation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bannerLocation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BannerLocation{" +
            "id=" + getId() +
            ", bannerLocation='" + getBannerLocation() + "'" +
            ", activate='" + isActivate() + "'" +
            "}";
    }
}
