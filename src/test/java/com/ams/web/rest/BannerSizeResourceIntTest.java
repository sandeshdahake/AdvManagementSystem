package com.ams.web.rest;

import com.ams.AdvManagementSystemApp;

import com.ams.domain.BannerSize;
import com.ams.repository.BannerSizeRepository;
import com.ams.service.BannerSizeService;
import com.ams.service.dto.BannerSizeDTO;
import com.ams.service.mapper.BannerSizeMapper;
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
 * Test class for the BannerSizeResource REST controller.
 *
 * @see BannerSizeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvManagementSystemApp.class)
public class BannerSizeResourceIntTest {

    private static final String DEFAULT_BANNER_SIZE = "AAAAAAAAAA";
    private static final String UPDATED_BANNER_SIZE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVATE = false;
    private static final Boolean UPDATED_ACTIVATE = true;

    @Autowired
    private BannerSizeRepository bannerSizeRepository;

    @Autowired
    private BannerSizeMapper bannerSizeMapper;

    @Autowired
    private BannerSizeService bannerSizeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBannerSizeMockMvc;

    private BannerSize bannerSize;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BannerSizeResource bannerSizeResource = new BannerSizeResource(bannerSizeService);
        this.restBannerSizeMockMvc = MockMvcBuilders.standaloneSetup(bannerSizeResource)
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
    public static BannerSize createEntity(EntityManager em) {
        BannerSize bannerSize = new BannerSize()
            .bannerSize(DEFAULT_BANNER_SIZE)
            .activate(DEFAULT_ACTIVATE);
        return bannerSize;
    }

    @Before
    public void initTest() {
        bannerSize = createEntity(em);
    }

    @Test
    @Transactional
    public void createBannerSize() throws Exception {
        int databaseSizeBeforeCreate = bannerSizeRepository.findAll().size();

        // Create the BannerSize
        BannerSizeDTO bannerSizeDTO = bannerSizeMapper.toDto(bannerSize);
        restBannerSizeMockMvc.perform(post("/api/banner-sizes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerSizeDTO)))
            .andExpect(status().isCreated());

        // Validate the BannerSize in the database
        List<BannerSize> bannerSizeList = bannerSizeRepository.findAll();
        assertThat(bannerSizeList).hasSize(databaseSizeBeforeCreate + 1);
        BannerSize testBannerSize = bannerSizeList.get(bannerSizeList.size() - 1);
        assertThat(testBannerSize.getBannerSize()).isEqualTo(DEFAULT_BANNER_SIZE);
        assertThat(testBannerSize.isActivate()).isEqualTo(DEFAULT_ACTIVATE);
    }

    @Test
    @Transactional
    public void createBannerSizeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bannerSizeRepository.findAll().size();

        // Create the BannerSize with an existing ID
        bannerSize.setId(1L);
        BannerSizeDTO bannerSizeDTO = bannerSizeMapper.toDto(bannerSize);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBannerSizeMockMvc.perform(post("/api/banner-sizes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerSizeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BannerSize in the database
        List<BannerSize> bannerSizeList = bannerSizeRepository.findAll();
        assertThat(bannerSizeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBannerSizeIsRequired() throws Exception {
        int databaseSizeBeforeTest = bannerSizeRepository.findAll().size();
        // set the field null
        bannerSize.setBannerSize(null);

        // Create the BannerSize, which fails.
        BannerSizeDTO bannerSizeDTO = bannerSizeMapper.toDto(bannerSize);

        restBannerSizeMockMvc.perform(post("/api/banner-sizes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerSizeDTO)))
            .andExpect(status().isBadRequest());

        List<BannerSize> bannerSizeList = bannerSizeRepository.findAll();
        assertThat(bannerSizeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActivateIsRequired() throws Exception {
        int databaseSizeBeforeTest = bannerSizeRepository.findAll().size();
        // set the field null
        bannerSize.setActivate(null);

        // Create the BannerSize, which fails.
        BannerSizeDTO bannerSizeDTO = bannerSizeMapper.toDto(bannerSize);

        restBannerSizeMockMvc.perform(post("/api/banner-sizes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerSizeDTO)))
            .andExpect(status().isBadRequest());

        List<BannerSize> bannerSizeList = bannerSizeRepository.findAll();
        assertThat(bannerSizeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBannerSizes() throws Exception {
        // Initialize the database
        bannerSizeRepository.saveAndFlush(bannerSize);

        // Get all the bannerSizeList
        restBannerSizeMockMvc.perform(get("/api/banner-sizes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bannerSize.getId().intValue())))
            .andExpect(jsonPath("$.[*].bannerSize").value(hasItem(DEFAULT_BANNER_SIZE.toString())))
            .andExpect(jsonPath("$.[*].activate").value(hasItem(DEFAULT_ACTIVATE.booleanValue())));
    }

    @Test
    @Transactional
    public void getBannerSize() throws Exception {
        // Initialize the database
        bannerSizeRepository.saveAndFlush(bannerSize);

        // Get the bannerSize
        restBannerSizeMockMvc.perform(get("/api/banner-sizes/{id}", bannerSize.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bannerSize.getId().intValue()))
            .andExpect(jsonPath("$.bannerSize").value(DEFAULT_BANNER_SIZE.toString()))
            .andExpect(jsonPath("$.activate").value(DEFAULT_ACTIVATE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBannerSize() throws Exception {
        // Get the bannerSize
        restBannerSizeMockMvc.perform(get("/api/banner-sizes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBannerSize() throws Exception {
        // Initialize the database
        bannerSizeRepository.saveAndFlush(bannerSize);
        int databaseSizeBeforeUpdate = bannerSizeRepository.findAll().size();

        // Update the bannerSize
        BannerSize updatedBannerSize = bannerSizeRepository.findOne(bannerSize.getId());
        // Disconnect from session so that the updates on updatedBannerSize are not directly saved in db
        em.detach(updatedBannerSize);
        updatedBannerSize
            .bannerSize(UPDATED_BANNER_SIZE)
            .activate(UPDATED_ACTIVATE);
        BannerSizeDTO bannerSizeDTO = bannerSizeMapper.toDto(updatedBannerSize);

        restBannerSizeMockMvc.perform(put("/api/banner-sizes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerSizeDTO)))
            .andExpect(status().isOk());

        // Validate the BannerSize in the database
        List<BannerSize> bannerSizeList = bannerSizeRepository.findAll();
        assertThat(bannerSizeList).hasSize(databaseSizeBeforeUpdate);
        BannerSize testBannerSize = bannerSizeList.get(bannerSizeList.size() - 1);
        assertThat(testBannerSize.getBannerSize()).isEqualTo(UPDATED_BANNER_SIZE);
        assertThat(testBannerSize.isActivate()).isEqualTo(UPDATED_ACTIVATE);
    }

    @Test
    @Transactional
    public void updateNonExistingBannerSize() throws Exception {
        int databaseSizeBeforeUpdate = bannerSizeRepository.findAll().size();

        // Create the BannerSize
        BannerSizeDTO bannerSizeDTO = bannerSizeMapper.toDto(bannerSize);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBannerSizeMockMvc.perform(put("/api/banner-sizes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerSizeDTO)))
            .andExpect(status().isCreated());

        // Validate the BannerSize in the database
        List<BannerSize> bannerSizeList = bannerSizeRepository.findAll();
        assertThat(bannerSizeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBannerSize() throws Exception {
        // Initialize the database
        bannerSizeRepository.saveAndFlush(bannerSize);
        int databaseSizeBeforeDelete = bannerSizeRepository.findAll().size();

        // Get the bannerSize
        restBannerSizeMockMvc.perform(delete("/api/banner-sizes/{id}", bannerSize.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BannerSize> bannerSizeList = bannerSizeRepository.findAll();
        assertThat(bannerSizeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BannerSize.class);
        BannerSize bannerSize1 = new BannerSize();
        bannerSize1.setId(1L);
        BannerSize bannerSize2 = new BannerSize();
        bannerSize2.setId(bannerSize1.getId());
        assertThat(bannerSize1).isEqualTo(bannerSize2);
        bannerSize2.setId(2L);
        assertThat(bannerSize1).isNotEqualTo(bannerSize2);
        bannerSize1.setId(null);
        assertThat(bannerSize1).isNotEqualTo(bannerSize2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BannerSizeDTO.class);
        BannerSizeDTO bannerSizeDTO1 = new BannerSizeDTO();
        bannerSizeDTO1.setId(1L);
        BannerSizeDTO bannerSizeDTO2 = new BannerSizeDTO();
        assertThat(bannerSizeDTO1).isNotEqualTo(bannerSizeDTO2);
        bannerSizeDTO2.setId(bannerSizeDTO1.getId());
        assertThat(bannerSizeDTO1).isEqualTo(bannerSizeDTO2);
        bannerSizeDTO2.setId(2L);
        assertThat(bannerSizeDTO1).isNotEqualTo(bannerSizeDTO2);
        bannerSizeDTO1.setId(null);
        assertThat(bannerSizeDTO1).isNotEqualTo(bannerSizeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bannerSizeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bannerSizeMapper.fromId(null)).isNull();
    }
}
