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
 * A BannerSize.
 */
@Entity
@Table(name = "banner_size")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BannerSize implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "banner_size", length = 200, nullable = false)
    private String bannerSize;

    @NotNull
    @Column(name = "jhi_activate", nullable = false)
    private Boolean activate;

    @OneToMany(mappedBy = "bannerSize")
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

    public String getBannerSize() {
        return bannerSize;
    }

    public BannerSize bannerSize(String bannerSize) {
        this.bannerSize = bannerSize;
        return this;
    }

    public void setBannerSize(String bannerSize) {
        this.bannerSize = bannerSize;
    }

    public Boolean isActivate() {
        return activate;
    }

    public BannerSize activate(Boolean activate) {
        this.activate = activate;
        return this;
    }

    public void setActivate(Boolean activate) {
        this.activate = activate;
    }

    public Set<SubscriptionPlan> getSubscriptionPlans() {
        return subscriptionPlans;
    }

    public BannerSize subscriptionPlans(Set<SubscriptionPlan> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
        return this;
    }

    public BannerSize addSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.add(subscriptionPlan);
        subscriptionPlan.setBannerSize(this);
        return this;
    }

    public BannerSize removeSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.remove(subscriptionPlan);
        subscriptionPlan.setBannerSize(null);
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
        BannerSize bannerSize = (BannerSize) o;
        if (bannerSize.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bannerSize.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BannerSize{" +
            "id=" + getId() +
            ", bannerSize='" + getBannerSize() + "'" +
            ", activate='" + isActivate() + "'" +
            "}";
    }
}
