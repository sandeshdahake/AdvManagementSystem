package com.ams.web.rest;

import com.ams.AdvManagementSystemApp;

import com.ams.domain.BannerLocation;
import com.ams.repository.BannerLocationRepository;
import com.ams.service.BannerLocationService;
import com.ams.service.dto.BannerLocationDTO;
import com.ams.service.mapper.BannerLocationMapper;
import com.ams.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ams.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BannerLocationResource REST controller.
 *
 * @see BannerLocationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvManagementSystemApp.class)
public class BannerLocationResourceIntTest {

    private static final String DEFAULT_BANNER_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_BANNER_LOCATION = "BBBBBBBBBB";

    @Autowired
    private BannerLocationRepository bannerLocationRepository;

    @Autowired
    private BannerLocationMapper bannerLocationMapper;

    @Autowired
    private BannerLocationService bannerLocationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBannerLocationMockMvc;

    private BannerLocation bannerLocation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BannerLocationResource bannerLocationResource = new BannerLocationResource(bannerLocationService);
        this.restBannerLocationMockMvc = MockMvcBuilders.standaloneSetup(bannerLocationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BannerLocation createEntity(EntityManager em) {
        BannerLocation bannerLocation = new BannerLocation()
            .bannerLocation(DEFAULT_BANNER_LOCATION);
        return bannerLocation;
    }

    @Before
    public void initTest() {
        bannerLocation = createEntity(em);
    }

    @Test
    @Transactional
    public void createBannerLocation() throws Exception {
        int databaseSizeBeforeCreate = bannerLocationRepository.findAll().size();

        // Create the BannerLocation
        BannerLocationDTO bannerLocationDTO = bannerLocationMapper.toDto(bannerLocation);
        restBannerLocationMockMvc.perform(post("/api/banner-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerLocationDTO)))
            .andExpect(status().isCreated());

        // Validate the BannerLocation in the database
        List<BannerLocation> bannerLocationList = bannerLocationRepository.findAll();
        assertThat(bannerLocationList).hasSize(databaseSizeBeforeCreate + 1);
        BannerLocation testBannerLocation = bannerLocationList.get(bannerLocationList.size() - 1);
        assertThat(testBannerLocation.getBannerLocation()).isEqualTo(DEFAULT_BANNER_LOCATION);
    }

    @Test
    @Transactional
    public void createBannerLocationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bannerLocationRepository.findAll().size();

        // Create the BannerLocation with an existing ID
        bannerLocation.setId(1L);
        BannerLocationDTO bannerLocationDTO = bannerLocationMapper.toDto(bannerLocation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBannerLocationMockMvc.perform(post("/api/banner-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerLocationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BannerLocation in the database
        List<BannerLocation> bannerLocationList = bannerLocationRepository.findAll();
        assertThat(bannerLocationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBannerLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = bannerLocationRepository.findAll().size();
        // set the field null
        bannerLocation.setBannerLocation(null);

        // Create the BannerLocation, which fails.
        BannerLocationDTO bannerLocationDTO = bannerLocationMapper.toDto(bannerLocation);

        restBannerLocationMockMvc.perform(post("/api/banner-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerLocationDTO)))
            .andExpect(status().isBadRequest());

        List<BannerLocation> bannerLocationList = bannerLocationRepository.findAll();
        assertThat(bannerLocationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBannerLocations() throws Exception {
        // Initialize the database
        bannerLocationRepository.saveAndFlush(bannerLocation);

        // Get all the bannerLocationList
        restBannerLocationMockMvc.perform(get("/api/banner-locations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bannerLocation.getId().intValue())))
            .andExpect(jsonPath("$.[*].bannerLocation").value(hasItem(DEFAULT_BANNER_LOCATION.toString())));
    }

    @Test
    @Transactional
    public void getBannerLocation() throws Exception {
        // Initialize the database
        bannerLocationRepository.saveAndFlush(bannerLocation);

        // Get the bannerLocation
        restBannerLocationMockMvc.perform(get("/api/banner-locations/{id}", bannerLocation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bannerLocation.getId().intValue()))
            .andExpect(jsonPath("$.bannerLocation").value(DEFAULT_BANNER_LOCATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBannerLocation() throws Exception {
        // Get the bannerLocation
        restBannerLocationMockMvc.perform(get("/api/banner-locations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBannerLocation() throws Exception {
        // Initialize the database
        bannerLocationRepository.saveAndFlush(bannerLocation);
        int databaseSizeBeforeUpdate = bannerLocationRepository.findAll().size();

        // Update the bannerLocation
        BannerLocation updatedBannerLocation = bannerLocationRepository.findOne(bannerLocation.getId());
        // Disconnect from session so that the updates on updatedBannerLocation are not directly saved in db
        em.detach(updatedBannerLocation);
        updatedBannerLocation
            .bannerLocation(UPDATED_BANNER_LOCATION);
        BannerLocationDTO bannerLocationDTO = bannerLocationMapper.toDto(updatedBannerLocation);

        restBannerLocationMockMvc.perform(put("/api/banner-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerLocationDTO)))
            .andExpect(status().isOk());

        // Validate the BannerLocation in the database
        List<BannerLocation> bannerLocationList = bannerLocationRepository.findAll();
        assertThat(bannerLocationList).hasSize(databaseSizeBeforeUpdate);
        BannerLocation testBannerLocation = bannerLocationList.get(bannerLocationList.size() - 1);
        assertThat(testBannerLocation.getBannerLocation()).isEqualTo(UPDATED_BANNER_LOCATION);
    }

    @Test
    @Transactional
    public void updateNonExistingBannerLocation() throws Exception {
        int databaseSizeBeforeUpdate = bannerLocationRepository.findAll().size();

        // Create the BannerLocation
        BannerLocationDTO bannerLocationDTO = bannerLocationMapper.toDto(bannerLocation);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBannerLocationMockMvc.perform(put("/api/banner-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerLocationDTO)))
            .andExpect(status().isCreated());

        // Validate the BannerLocation in the database
        List<BannerLocation> bannerLocationList = bannerLocationRepository.findAll();
        assertThat(bannerLocationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBannerLocation() throws Exception {
        // Initialize the database
        bannerLocationRepository.saveAndFlush(bannerLocation);
        int databaseSizeBeforeDelete = bannerLocationRepository.findAll().size();

        // Get the bannerLocation
        restBannerLocationMockMvc.perform(delete("/api/banner-locations/{id}", bannerLocation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BannerLocation> bannerLocationList = bannerLocationRepository.findAll();
        assertThat(bannerLocationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BannerLocation.class);
        BannerLocation bannerLocation1 = new BannerLocation();
        bannerLocation1.setId(1L);
        BannerLocation bannerLocation2 = new BannerLocation();
        bannerLocation2.setId(bannerLocation1.getId());
        assertThat(bannerLocation1).isEqualTo(bannerLocation2);
        bannerLocation2.setId(2L);
        assertThat(bannerLocation1).isNotEqualTo(bannerLocation2);
        bannerLocation1.setId(null);
        assertThat(bannerLocation1).isNotEqualTo(bannerLocation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BannerLocationDTO.class);
        BannerLocationDTO bannerLocationDTO1 = new BannerLocationDTO();
        bannerLocationDTO1.setId(1L);
        BannerLocationDTO bannerLocationDTO2 = new BannerLocationDTO();
        assertThat(bannerLocationDTO1).isNotEqualTo(bannerLocationDTO2);
        bannerLocationDTO2.setId(bannerLocationDTO1.getId());
        assertThat(bannerLocationDTO1).isEqualTo(bannerLocationDTO2);
        bannerLocationDTO2.setId(2L);
        assertThat(bannerLocationDTO1).isNotEqualTo(bannerLocationDTO2);
        bannerLocationDTO1.setId(null);
        assertThat(bannerLocationDTO1).isNotEqualTo(bannerLocationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bannerLocationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bannerLocationMapper.fromId(null)).isNull();
    }
}
