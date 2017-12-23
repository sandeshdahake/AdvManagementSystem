package com.ams.repository;

import com.ams.domain.ClientSubscription;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ClientSubscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientSubscriptionRepository extends JpaRepository<ClientSubscription, Long> {

}
