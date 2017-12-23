package com.ams.repository;

import com.ams.domain.BannerPage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BannerPage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BannerPageRepository extends JpaRepository<BannerPage, Long> {

}
