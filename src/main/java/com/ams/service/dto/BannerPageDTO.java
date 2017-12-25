package com.ams.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BannerPage entity.
 */
public class BannerPageDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 200)
    private String bannerPage;

    @NotNull
    private Boolean activate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBannerPage() {
        return bannerPage;
    }

    public void setBannerPage(String bannerPage) {
        this.bannerPage = bannerPage;
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

        BannerPageDTO bannerPageDTO = (BannerPageDTO) o;
        if(bannerPageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bannerPageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BannerPageDTO{" +
            "id=" + getId() +
            ", bannerPage='" + getBannerPage() + "'" +
            ", activate='" + isActivate() + "'" +
            "}";
    }
}
