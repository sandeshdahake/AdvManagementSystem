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
 * A BannerPage.
 */
@Entity
@Table(name = "banner_page")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BannerPage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "banner_page", length = 200, nullable = false)
    private String bannerPage;

    @OneToMany(mappedBy = "bannerPage")
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

    public String getBannerPage() {
        return bannerPage;
    }

    public BannerPage bannerPage(String bannerPage) {
        this.bannerPage = bannerPage;
        return this;
    }

    public void setBannerPage(String bannerPage) {
        this.bannerPage = bannerPage;
    }

    public Set<SubscriptionPlan> getSubscriptionPlans() {
        return subscriptionPlans;
    }

    public BannerPage subscriptionPlans(Set<SubscriptionPlan> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
        return this;
    }

    public BannerPage addSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.add(subscriptionPlan);
        subscriptionPlan.setBannerPage(this);
        return this;
    }

    public BannerPage removeSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.remove(subscriptionPlan);
        subscriptionPlan.setBannerPage(null);
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
        BannerPage bannerPage = (BannerPage) o;
        if (bannerPage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bannerPage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BannerPage{" +
            "id=" + getId() +
            ", bannerPage='" + getBannerPage() + "'" +
            "}";
    }
}
