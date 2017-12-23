package com.ams.web.rest;

import com.ams.AdvManagementSystemApp;

import com.ams.domain.BannerType;
import com.ams.repository.BannerTypeRepository;
import com.ams.service.BannerTypeService;
import com.ams.service.dto.BannerTypeDTO;
import com.ams.service.mapper.BannerTypeMapper;
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
 * Test class for the BannerTypeResource REST controller.
 *
 * @see BannerTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvManagementSystemApp.class)
public class BannerTypeResourceIntTest {

    private static final String DEFAULT_BANNER_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_BANNER_TYPE = "BBBBBBBBBB";

    @Autowired
    private BannerTypeRepository bannerTypeRepository;

    @Autowired
    private BannerTypeMapper bannerTypeMapper;

    @Autowired
    private BannerTypeService bannerTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBannerTypeMockMvc;

    private BannerType bannerType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BannerTypeResource bannerTypeResource = new BannerTypeResource(bannerTypeService);
        this.restBannerTypeMockMvc = MockMvcBuilders.standaloneSetup(bannerTypeResource)
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
    public static BannerType createEntity(EntityManager em) {
        BannerType bannerType = new BannerType()
            .bannerType(DEFAULT_BANNER_TYPE);
        return bannerType;
    }

    @Before
    public void initTest() {
        bannerType = createEntity(em);
    }

    @Test
    @Transactional
    public void createBannerType() throws Exception {
        int databaseSizeBeforeCreate = bannerTypeRepository.findAll().size();

        // Create the BannerType
        BannerTypeDTO bannerTypeDTO = bannerTypeMapper.toDto(bannerType);
        restBannerTypeMockMvc.perform(post("/api/banner-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the BannerType in the database
        List<BannerType> bannerTypeList = bannerTypeRepository.findAll();
        assertThat(bannerTypeList).hasSize(databaseSizeBeforeCreate + 1);
        BannerType testBannerType = bannerTypeList.get(bannerTypeList.size() - 1);
        assertThat(testBannerType.getBannerType()).isEqualTo(DEFAULT_BANNER_TYPE);
    }

    @Test
    @Transactional
    public void createBannerTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bannerTypeRepository.findAll().size();

        // Create the BannerType with an existing ID
        bannerType.setId(1L);
        BannerTypeDTO bannerTypeDTO = bannerTypeMapper.toDto(bannerType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBannerTypeMockMvc.perform(post("/api/banner-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BannerType in the database
        List<BannerType> bannerTypeList = bannerTypeRepository.findAll();
        assertThat(bannerTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBannerTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = bannerTypeRepository.findAll().size();
        // set the field null
        bannerType.setBannerType(null);

        // Create the BannerType, which fails.
        BannerTypeDTO bannerTypeDTO = bannerTypeMapper.toDto(bannerType);

        restBannerTypeMockMvc.perform(post("/api/banner-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerTypeDTO)))
            .andExpect(status().isBadRequest());

        List<BannerType> bannerTypeList = bannerTypeRepository.findAll();
        assertThat(bannerTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBannerTypes() throws Exception {
        // Initialize the database
        bannerTypeRepository.saveAndFlush(bannerType);

        // Get all the bannerTypeList
        restBannerTypeMockMvc.perform(get("/api/banner-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bannerType.getId().intValue())))
            .andExpect(jsonPath("$.[*].bannerType").value(hasItem(DEFAULT_BANNER_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getBannerType() throws Exception {
        // Initialize the database
        bannerTypeRepository.saveAndFlush(bannerType);

        // Get the bannerType
        restBannerTypeMockMvc.perform(get("/api/banner-types/{id}", bannerType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bannerType.getId().intValue()))
            .andExpect(jsonPath("$.bannerType").value(DEFAULT_BANNER_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBannerType() throws Exception {
        // Get the bannerType
        restBannerTypeMockMvc.perform(get("/api/banner-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBannerType() throws Exception {
        // Initialize the database
        bannerTypeRepository.saveAndFlush(bannerType);
        int databaseSizeBeforeUpdate = bannerTypeRepository.findAll().size();

        // Update the bannerType
        BannerType updatedBannerType = bannerTypeRepository.findOne(bannerType.getId());
        // Disconnect from session so that the updates on updatedBannerType are not directly saved in db
        em.detach(updatedBannerType);
        updatedBannerType
            .bannerType(UPDATED_BANNER_TYPE);
        BannerTypeDTO bannerTypeDTO = bannerTypeMapper.toDto(updatedBannerType);

        restBannerTypeMockMvc.perform(put("/api/banner-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerTypeDTO)))
            .andExpect(status().isOk());

        // Validate the BannerType in the database
        List<BannerType> bannerTypeList = bannerTypeRepository.findAll();
        assertThat(bannerTypeList).hasSize(databaseSizeBeforeUpdate);
        BannerType testBannerType = bannerTypeList.get(bannerTypeList.size() - 1);
        assertThat(testBannerType.getBannerType()).isEqualTo(UPDATED_BANNER_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingBannerType() throws Exception {
        int databaseSizeBeforeUpdate = bannerTypeRepository.findAll().size();

        // Create the BannerType
        BannerTypeDTO bannerTypeDTO = bannerTypeMapper.toDto(bannerType);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBannerTypeMockMvc.perform(put("/api/banner-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the BannerType in the database
        List<BannerType> bannerTypeList = bannerTypeRepository.findAll();
        assertThat(bannerTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBannerType() throws Exception {
        // Initialize the database
        bannerTypeRepository.saveAndFlush(bannerType);
        int databaseSizeBeforeDelete = bannerTypeRepository.findAll().size();

        // Get the bannerType
        restBannerTypeMockMvc.perform(delete("/api/banner-types/{id}", bannerType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BannerType> bannerTypeList = bannerTypeRepository.findAll();
        assertThat(bannerTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BannerType.class);
        BannerType bannerType1 = new BannerType();
        bannerType1.setId(1L);
        BannerType bannerType2 = new BannerType();
        bannerType2.setId(bannerType1.getId());
        assertThat(bannerType1).isEqualTo(bannerType2);
        bannerType2.setId(2L);
        assertThat(bannerType1).isNotEqualTo(bannerType2);
        bannerType1.setId(null);
        assertThat(bannerType1).isNotEqualTo(bannerType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BannerTypeDTO.class);
        BannerTypeDTO bannerTypeDTO1 = new BannerTypeDTO();
        bannerTypeDTO1.setId(1L);
        BannerTypeDTO bannerTypeDTO2 = new BannerTypeDTO();
        assertThat(bannerTypeDTO1).isNotEqualTo(bannerTypeDTO2);
        bannerTypeDTO2.setId(bannerTypeDTO1.getId());
        assertThat(bannerTypeDTO1).isEqualTo(bannerTypeDTO2);
        bannerTypeDTO2.setId(2L);
        assertThat(bannerTypeDTO1).isNotEqualTo(bannerTypeDTO2);
        bannerTypeDTO1.setId(null);
        assertThat(bannerTypeDTO1).isNotEqualTo(bannerTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bannerTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bannerTypeMapper.fromId(null)).isNull();
    }
}
