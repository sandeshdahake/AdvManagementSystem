package com.ams.repository;

import com.ams.domain.ClientSubscription;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the ClientSubscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientSubscriptionRepository extends JpaRepository<ClientSubscription, Long> {
    @Query("select clientSubscription from ClientSubscription clientSubscription " +
        "inner join  clientSubscription.city city " +
        "inner join  clientSubscription.subscriptionPlan subscriptionPlan " +
        "where  clientSubscription.activeSubscription = true and  city.cityName =:cityName and subscriptionPlan.planName = :planName ")
    List<ClientSubscription> findAllByCityNameByPlanName(@Param("cityName") String cityName,@Param("planName") String planName);

    @Query("select clientSubscription.resourceUrl,  clientSubscription.redirectUrl from ClientSubscription clientSubscription " +
        "inner join  clientSubscription.city city " +
        "inner join  clientSubscription.subscriptionPlan subscriptionPlan " +
        "where  clientSubscription.activeSubscription = true and  city.cityName =:cityName and subscriptionPlan.planName = :planName ")
    List<Object> findUrlByCityNameByPlanName(@Param("cityName") String cityName,@Param("planName") String planName);

}
