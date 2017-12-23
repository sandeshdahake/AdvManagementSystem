package com.ams.service.mapper;

import com.ams.domain.*;
import com.ams.service.dto.ClientDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Client and its DTO ClientDTO.
 */
@Mapper(componentModel = "spring", uses = {CityMapper.class})
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {

    

    @Mapping(target = "subscriptions", ignore = true)
    Client toEntity(ClientDTO clientDTO);

    default Client fromId(Long id) {
        if (id == null) {
            return null;
        }
        Client client = new Client();
        client.setId(id);
        return client;
    }
}
