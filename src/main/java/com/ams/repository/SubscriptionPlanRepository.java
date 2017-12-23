package com.ams.repository;

import com.ams.domain.SubscriptionPlan;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SubscriptionPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan, Long> {

}
