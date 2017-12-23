package com.ams.repository;

import com.ams.domain.BannerSize;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BannerSize entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BannerSizeRepository extends JpaRepository<BannerSize, Long> {

}
