package com.ams.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SubscriptionPlan.
 */
@Entity
@Table(name = "subscription_plan")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SubscriptionPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "plan_name", length = 200, nullable = false)
    private String planName;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "price", precision=10, scale=2, nullable = false)
    private BigDecimal price;

    @NotNull
    @Min(value = 0)
    @Column(name = "max_subscription", nullable = false)
    private Integer maxSubscription;

    @ManyToOne(optional = false)
    @NotNull
    private BannerType bannerType;

    @ManyToOne(optional = false)
    @NotNull
    private BannerSize bannerSize;

    @ManyToOne(optional = false)
    @NotNull
    private BannerLocation bannerLocation;

    @ManyToOne(optional = false)
    @NotNull
    private BannerPage bannerPage;

    @ManyToOne(optional = false)
    @NotNull
    private SubscriptionPeriod subscriptionPeriod;

    @ManyToOne(optional = false)
    @NotNull
    private City city;

    @OneToMany(mappedBy = "subscriptionPlan")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ClientSubscription> subscriptions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlanName() {
        return planName;
    }

    public SubscriptionPlan planName(String planName) {
        this.planName = planName;
        return this;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public SubscriptionPlan price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getMaxSubscription() {
        return maxSubscription;
    }

    public SubscriptionPlan maxSubscription(Integer maxSubscription) {
        this.maxSubscription = maxSubscription;
        return this;
    }

    public void setMaxSubscription(Integer maxSubscription) {
        this.maxSubscription = maxSubscription;
    }

    public BannerType getBannerType() {
        return bannerType;
    }

    public SubscriptionPlan bannerType(BannerType bannerType) {
        this.bannerType = bannerType;
        return this;
    }

    public void setBannerType(BannerType bannerType) {
        this.bannerType = bannerType;
    }

    public BannerSize getBannerSize() {
        return bannerSize;
    }

    public SubscriptionPlan bannerSize(BannerSize bannerSize) {
        this.bannerSize = bannerSize;
        return this;
    }

    public void setBannerSize(BannerSize bannerSize) {
        this.bannerSize = bannerSize;
    }

    public BannerLocation getBannerLocation() {
        return bannerLocation;
    }

    public SubscriptionPlan bannerLocation(BannerLocation bannerLocation) {
        this.bannerLocation = bannerLocation;
        return this;
    }

    public void setBannerLocation(BannerLocation bannerLocation) {
        this.bannerLocation = bannerLocation;
    }

    public BannerPage getBannerPage() {
        return bannerPage;
    }

    public SubscriptionPlan bannerPage(BannerPage bannerPage) {
        this.bannerPage = bannerPage;
        return this;
    }

    public void setBannerPage(BannerPage bannerPage) {
        this.bannerPage = bannerPage;
    }

    public SubscriptionPeriod getSubscriptionPeriod() {
        return subscriptionPeriod;
    }

    public SubscriptionPlan subscriptionPeriod(SubscriptionPeriod subscriptionPeriod) {
        this.subscriptionPeriod = subscriptionPeriod;
        return this;
    }

    public void setSubscriptionPeriod(SubscriptionPeriod subscriptionPeriod) {
        this.subscriptionPeriod = subscriptionPeriod;
    }

    public City getCity() {
        return city;
    }

    public SubscriptionPlan city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Set<ClientSubscription> getSubscriptions() {
        return subscriptions;
    }

    public SubscriptionPlan subscriptions(Set<ClientSubscription> clientSubscriptions) {
        this.subscriptions = clientSubscriptions;
        return this;
    }

    public SubscriptionPlan addSubscription(ClientSubscription clientSubscription) {
        this.subscriptions.add(clientSubscription);
        clientSubscription.setSubscriptionPlan(this);
        return this;
    }

    public SubscriptionPlan removeSubscription(ClientSubscription clientSubscription) {
        this.subscriptions.remove(clientSubscription);
        clientSubscription.setSubscriptionPlan(null);
        return this;
    }

    public void setSubscriptions(Set<ClientSubscription> clientSubscriptions) {
        this.subscriptions = clientSubscriptions;
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
        SubscriptionPlan subscriptionPlan = (SubscriptionPlan) o;
        if (subscriptionPlan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subscriptionPlan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubscriptionPlan{" +
            "id=" + getId() +
            ", planName='" + getPlanName() + "'" +
            ", price=" + getPrice() +
            ", maxSubscription=" + getMaxSubscription() +
            "}";
    }
}
