package com.ams.repository;

import com.ams.domain.BannerLocation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BannerLocation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BannerLocationRepository extends JpaRepository<BannerLocation, Long> {

}
