package com.ams.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BannerType entity.
 */
public class BannerTypeDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 200)
    private String bannerType;

    @NotNull
    private Boolean activate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBannerType() {
        return bannerType;
    }

    public void setBannerType(String bannerType) {
        this.bannerType = bannerType;
    }

    public Boolean isActivate() {
        return activate;
    }

    public void setActivate(Boolean activate) {
        this.activate = activate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BannerTypeDTO bannerTypeDTO = (BannerTypeDTO) o;
        if(bannerTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bannerTypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BannerTypeDTO{" +
            "id=" + getId() +
            ", bannerType='" + getBannerType() + "'" +
            ", activate='" + isActivate() + "'" +
            "}";
    }
}
