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
 * A Client.
 */
@Entity
@Table(name = "client")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "client_name", nullable = false)
    private String clientName;

    @NotNull
    @Lob
    @Column(name = "client_address", nullable = false)
    private String clientAddress;

    @NotNull
    @Column(name = "jhi_activate", nullable = false)
    private Boolean activate;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "client_city",
               joinColumns = @JoinColumn(name="clients_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="cities_id", referencedColumnName="id"))
    private Set<City> cities = new HashSet<>();

    @OneToMany(mappedBy = "client")
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

    public String getClientName() {
        return clientName;
    }

    public Client clientName(String clientName) {
        this.clientName = clientName;
        return this;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientAddress() {
        return clientAddress;
    }

    public Client clientAddress(String clientAddress) {
        this.clientAddress = clientAddress;
        return this;
    }

    public void setClientAddress(String clientAddress) {
        this.clientAddress = clientAddress;
    }

    public Boolean isActivate() {
        return activate;
    }

    public Client activate(Boolean activate) {
        this.activate = activate;
        return this;
    }

    public void setActivate(Boolean activate) {
        this.activate = activate;
    }

    public Set<City> getCities() {
        return cities;
    }

    public Client cities(Set<City> cities) {
        this.cities = cities;
        return this;
    }

    public Client addCity(City city) {
        this.cities.add(city);
        city.getClientNames().add(this);
        return this;
    }

    public Client removeCity(City city) {
        this.cities.remove(city);
        city.getClientNames().remove(this);
        return this;
    }

    public void setCities(Set<City> cities) {
        this.cities = cities;
    }

    public Set<ClientSubscription> getSubscriptions() {
        return subscriptions;
    }

    public Client subscriptions(Set<ClientSubscription> clientSubscriptions) {
        this.subscriptions = clientSubscriptions;
        return this;
    }

    public Client addSubscription(ClientSubscription clientSubscription) {
        this.subscriptions.add(clientSubscription);
        clientSubscription.setClient(this);
        return this;
    }

    public Client removeSubscription(ClientSubscription clientSubscription) {
        this.subscriptions.remove(clientSubscription);
        clientSubscription.setClient(null);
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
        Client client = (Client) o;
        if (client.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), client.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", clientName='" + getClientName() + "'" +
            ", clientAddress='" + getClientAddress() + "'" +
            ", activate='" + isActivate() + "'" +
            "}";
    }
}
