package com.ams.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BannerLocation entity.
 */
public class BannerLocationDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 200)
    private String bannerLocation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBannerLocation() {
        return bannerLocation;
    }

    public void setBannerLocation(String bannerLocation) {
        this.bannerLocation = bannerLocation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BannerLocationDTO bannerLocationDTO = (BannerLocationDTO) o;
        if(bannerLocationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bannerLocationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BannerLocationDTO{" +
            "id=" + getId() +
            ", bannerLocation='" + getBannerLocation() + "'" +
            "}";
    }
}
