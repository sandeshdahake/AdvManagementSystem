package com.ams.repository;

import com.ams.domain.Client;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Client entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("select distinct client from Client client left join fetch client.cities")
    List<Client> findAllWithEagerRelationships();

    @Query("select client from Client client left join fetch client.cities where client.id =:id")
    Client findOneWithEagerRelationships(@Param("id") Long id);

}
