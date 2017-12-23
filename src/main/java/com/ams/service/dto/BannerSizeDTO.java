package com.ams.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BannerSize entity.
 */
public class BannerSizeDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 200)
    private String bannerSize;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBannerSize() {
        return bannerSize;
    }

    public void setBannerSize(String bannerSize) {
        this.bannerSize = bannerSize;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BannerSizeDTO bannerSizeDTO = (BannerSizeDTO) o;
        if(bannerSizeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bannerSizeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BannerSizeDTO{" +
            "id=" + getId() +
            ", bannerSize='" + getBannerSize() + "'" +
            "}";
    }
}
