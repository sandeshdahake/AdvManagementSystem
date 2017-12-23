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
 * A City.
 */
@Entity
@Table(name = "city")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class City implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "city_name", nullable = false)
    private String cityName;

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubscriptionPlan> subscriptionPlans = new HashSet<>();

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ClientSubscription> subscriptions = new HashSet<>();

    @ManyToMany(mappedBy = "cities")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Client> clientNames = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCityName() {
        return cityName;
    }

    public City cityName(String cityName) {
        this.cityName = cityName;
        return this;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Set<SubscriptionPlan> getSubscriptionPlans() {
        return subscriptionPlans;
    }

    public City subscriptionPlans(Set<SubscriptionPlan> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
        return this;
    }

    public City addSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.add(subscriptionPlan);
        subscriptionPlan.setCity(this);
        return this;
    }

    public City removeSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        this.subscriptionPlans.remove(subscriptionPlan);
        subscriptionPlan.setCity(null);
        return this;
    }

    public void setSubscriptionPlans(Set<SubscriptionPlan> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
    }

    public Set<ClientSubscription> getSubscriptions() {
        return subscriptions;
    }

    public City subscriptions(Set<ClientSubscription> clientSubscriptions) {
        this.subscriptions = clientSubscriptions;
        return this;
    }

    public City addSubscription(ClientSubscription clientSubscription) {
        this.subscriptions.add(clientSubscription);
        clientSubscription.setCity(this);
        return this;
    }

    public City removeSubscription(ClientSubscription clientSubscription) {
        this.subscriptions.remove(clientSubscription);
        clientSubscription.setCity(null);
        return this;
    }

    public void setSubscriptions(Set<ClientSubscription> clientSubscriptions) {
        this.subscriptions = clientSubscriptions;
    }

    public Set<Client> getClientNames() {
        return clientNames;
    }

    public City clientNames(Set<Client> clients) {
        this.clientNames = clients;
        return this;
    }

    public City addClientName(Client client) {
        this.clientNames.add(client);
        client.getCities().add(this);
        return this;
    }

    public City removeClientName(Client client) {
        this.clientNames.remove(client);
        client.getCities().remove(this);
        return this;
    }

    public void setClientNames(Set<Client> clients) {
        this.clientNames = clients;
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
        City city = (City) o;
        if (city.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), city.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "City{" +
            "id=" + getId() +
            ", cityName='" + getCityName() + "'" +
            "}";
    }
}
