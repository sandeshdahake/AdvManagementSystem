package com.ams.repository;

import com.ams.domain.SubscriptionPeriod;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SubscriptionPeriod entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptionPeriodRepository extends JpaRepository<SubscriptionPeriod, Long> {

}
