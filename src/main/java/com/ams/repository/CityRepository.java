package com.ams.repository;

import com.ams.domain.City;
import com.ams.service.dto.CityDTO;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Set;


/**
 * Spring Data JPA repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    List<City> findAllByActivate(Boolean b);
}
