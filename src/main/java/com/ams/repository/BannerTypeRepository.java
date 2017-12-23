package com.ams.repository;

import com.ams.domain.BannerType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BannerType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BannerTypeRepository extends JpaRepository<BannerType, Long> {

}
