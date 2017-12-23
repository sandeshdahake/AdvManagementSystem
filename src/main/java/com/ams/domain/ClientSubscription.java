package com.ams.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A ClientSubscription.
 */
@Entity
@Table(name = "client_subscription")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ClientSubscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @NotNull
    @Column(name = "jhi_link", nullable = false)
    private String link;

    @DecimalMin(value = "0")
    @Column(name = "priority_price", precision=10, scale=2)
    private BigDecimal priorityPrice;

    @DecimalMin(value = "0")
    @Column(name = "discount", precision=10, scale=2)
    private BigDecimal discount;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "total_price", precision=10, scale=2, nullable = false)
    private BigDecimal totalPrice;

    @NotNull
    @Column(name = "active_subscription", nullable = false)
    private Boolean activeSubscription;

    @ManyToOne(optional = false)
    @NotNull
    private City city;

    @ManyToOne(optional = false)
    @NotNull
    private Client client;

    @ManyToOne(optional = false)
    @NotNull
    private SubscriptionPlan subscriptionPlan;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public ClientSubscription startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public ClientSubscription endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getLink() {
        return link;
    }

    public ClientSubscription link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public BigDecimal getPriorityPrice() {
        return priorityPrice;
    }

    public ClientSubscription priorityPrice(BigDecimal priorityPrice) {
        this.priorityPrice = priorityPrice;
        return this;
    }

    public void setPriorityPrice(BigDecimal priorityPrice) {
        this.priorityPrice = priorityPrice;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public ClientSubscription discount(BigDecimal discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public ClientSubscription totalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Boolean isActiveSubscription() {
        return activeSubscription;
    }

    public ClientSubscription activeSubscription(Boolean activeSubscription) {
        this.activeSubscription = activeSubscription;
        return this;
    }

    public void setActiveSubscription(Boolean activeSubscription) {
        this.activeSubscription = activeSubscription;
    }

    public City getCity() {
        return city;
    }

    public ClientSubscription city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Client getClient() {
        return client;
    }

    public ClientSubscription client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public SubscriptionPlan getSubscriptionPlan() {
        return subscriptionPlan;
    }

    public ClientSubscription subscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlan = subscriptionPlan;
        return this;
    }

    public void setSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlan = subscriptionPlan;
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
        ClientSubscription clientSubscription = (ClientSubscription) o;
        if (clientSubscription.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientSubscription.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientSubscription{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", link='" + getLink() + "'" +
            ", priorityPrice=" + getPriorityPrice() +
            ", discount=" + getDiscount() +
            ", totalPrice=" + getTotalPrice() +
            ", activeSubscription='" + isActiveSubscription() + "'" +
            "}";
    }
}
