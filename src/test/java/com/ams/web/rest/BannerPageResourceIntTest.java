package com.ams.web.rest;

import com.ams.AdvManagementSystemApp;

import com.ams.domain.BannerPage;
import com.ams.repository.BannerPageRepository;
import com.ams.service.BannerPageService;
import com.ams.service.dto.BannerPageDTO;
import com.ams.service.mapper.BannerPageMapper;
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
 * Test class for the BannerPageResource REST controller.
 *
 * @see BannerPageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvManagementSystemApp.class)
public class BannerPageResourceIntTest {

    private static final String DEFAULT_BANNER_PAGE = "AAAAAAAAAA";
    private static final String UPDATED_BANNER_PAGE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVATE = false;
    private static final Boolean UPDATED_ACTIVATE = true;

    @Autowired
    private BannerPageRepository bannerPageRepository;

    @Autowired
    private BannerPageMapper bannerPageMapper;

    @Autowired
    private BannerPageService bannerPageService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBannerPageMockMvc;

    private BannerPage bannerPage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BannerPageResource bannerPageResource = new BannerPageResource(bannerPageService);
        this.restBannerPageMockMvc = MockMvcBuilders.standaloneSetup(bannerPageResource)
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
    public static BannerPage createEntity(EntityManager em) {
        BannerPage bannerPage = new BannerPage()
            .bannerPage(DEFAULT_BANNER_PAGE)
            .activate(DEFAULT_ACTIVATE);
        return bannerPage;
    }

    @Before
    public void initTest() {
        bannerPage = createEntity(em);
    }

    @Test
    @Transactional
    public void createBannerPage() throws Exception {
        int databaseSizeBeforeCreate = bannerPageRepository.findAll().size();

        // Create the BannerPage
        BannerPageDTO bannerPageDTO = bannerPageMapper.toDto(bannerPage);
        restBannerPageMockMvc.perform(post("/api/banner-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerPageDTO)))
            .andExpect(status().isCreated());

        // Validate the BannerPage in the database
        List<BannerPage> bannerPageList = bannerPageRepository.findAll();
        assertThat(bannerPageList).hasSize(databaseSizeBeforeCreate + 1);
        BannerPage testBannerPage = bannerPageList.get(bannerPageList.size() - 1);
        assertThat(testBannerPage.getBannerPage()).isEqualTo(DEFAULT_BANNER_PAGE);
        assertThat(testBannerPage.isActivate()).isEqualTo(DEFAULT_ACTIVATE);
    }

    @Test
    @Transactional
    public void createBannerPageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bannerPageRepository.findAll().size();

        // Create the BannerPage with an existing ID
        bannerPage.setId(1L);
        BannerPageDTO bannerPageDTO = bannerPageMapper.toDto(bannerPage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBannerPageMockMvc.perform(post("/api/banner-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerPageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BannerPage in the database
        List<BannerPage> bannerPageList = bannerPageRepository.findAll();
        assertThat(bannerPageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBannerPageIsRequired() throws Exception {
        int databaseSizeBeforeTest = bannerPageRepository.findAll().size();
        // set the field null
        bannerPage.setBannerPage(null);

        // Create the BannerPage, which fails.
        BannerPageDTO bannerPageDTO = bannerPageMapper.toDto(bannerPage);

        restBannerPageMockMvc.perform(post("/api/banner-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerPageDTO)))
            .andExpect(status().isBadRequest());

        List<BannerPage> bannerPageList = bannerPageRepository.findAll();
        assertThat(bannerPageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActivateIsRequired() throws Exception {
        int databaseSizeBeforeTest = bannerPageRepository.findAll().size();
        // set the field null
        bannerPage.setActivate(null);

        // Create the BannerPage, which fails.
        BannerPageDTO bannerPageDTO = bannerPageMapper.toDto(bannerPage);

        restBannerPageMockMvc.perform(post("/api/banner-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerPageDTO)))
            .andExpect(status().isBadRequest());

        List<BannerPage> bannerPageList = bannerPageRepository.findAll();
        assertThat(bannerPageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBannerPages() throws Exception {
        // Initialize the database
        bannerPageRepository.saveAndFlush(bannerPage);

        // Get all the bannerPageList
        restBannerPageMockMvc.perform(get("/api/banner-pages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bannerPage.getId().intValue())))
            .andExpect(jsonPath("$.[*].bannerPage").value(hasItem(DEFAULT_BANNER_PAGE.toString())))
            .andExpect(jsonPath("$.[*].activate").value(hasItem(DEFAULT_ACTIVATE.booleanValue())));
    }

    @Test
    @Transactional
    public void getBannerPage() throws Exception {
        // Initialize the database
        bannerPageRepository.saveAndFlush(bannerPage);

        // Get the bannerPage
        restBannerPageMockMvc.perform(get("/api/banner-pages/{id}", bannerPage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bannerPage.getId().intValue()))
            .andExpect(jsonPath("$.bannerPage").value(DEFAULT_BANNER_PAGE.toString()))
            .andExpect(jsonPath("$.activate").value(DEFAULT_ACTIVATE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBannerPage() throws Exception {
        // Get the bannerPage
        restBannerPageMockMvc.perform(get("/api/banner-pages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBannerPage() throws Exception {
        // Initialize the database
        bannerPageRepository.saveAndFlush(bannerPage);
        int databaseSizeBeforeUpdate = bannerPageRepository.findAll().size();

        // Update the bannerPage
        BannerPage updatedBannerPage = bannerPageRepository.findOne(bannerPage.getId());
        // Disconnect from session so that the updates on updatedBannerPage are not directly saved in db
        em.detach(updatedBannerPage);
        updatedBannerPage
            .bannerPage(UPDATED_BANNER_PAGE)
            .activate(UPDATED_ACTIVATE);
        BannerPageDTO bannerPageDTO = bannerPageMapper.toDto(updatedBannerPage);

        restBannerPageMockMvc.perform(put("/api/banner-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerPageDTO)))
            .andExpect(status().isOk());

        // Validate the BannerPage in the database
        List<BannerPage> bannerPageList = bannerPageRepository.findAll();
        assertThat(bannerPageList).hasSize(databaseSizeBeforeUpdate);
        BannerPage testBannerPage = bannerPageList.get(bannerPageList.size() - 1);
        assertThat(testBannerPage.getBannerPage()).isEqualTo(UPDATED_BANNER_PAGE);
        assertThat(testBannerPage.isActivate()).isEqualTo(UPDATED_ACTIVATE);
    }

    @Test
    @Transactional
    public void updateNonExistingBannerPage() throws Exception {
        int databaseSizeBeforeUpdate = bannerPageRepository.findAll().size();

        // Create the BannerPage
        BannerPageDTO bannerPageDTO = bannerPageMapper.toDto(bannerPage);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBannerPageMockMvc.perform(put("/api/banner-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bannerPageDTO)))
            .andExpect(status().isCreated());

        // Validate the BannerPage in the database
        List<BannerPage> bannerPageList = bannerPageRepository.findAll();
        assertThat(bannerPageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBannerPage() throws Exception {
        // Initialize the database
        bannerPageRepository.saveAndFlush(bannerPage);
        int databaseSizeBeforeDelete = bannerPageRepository.findAll().size();

        // Get the bannerPage
        restBannerPageMockMvc.perform(delete("/api/banner-pages/{id}", bannerPage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BannerPage> bannerPageList = bannerPageRepository.findAll();
        assertThat(bannerPageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BannerPage.class);
        BannerPage bannerPage1 = new BannerPage();
        bannerPage1.setId(1L);
        BannerPage bannerPage2 = new BannerPage();
        bannerPage2.setId(bannerPage1.getId());
        assertThat(bannerPage1).isEqualTo(bannerPage2);
        bannerPage2.setId(2L);
        assertThat(bannerPage1).isNotEqualTo(bannerPage2);
        bannerPage1.setId(null);
        assertThat(bannerPage1).isNotEqualTo(bannerPage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BannerPageDTO.class);
        BannerPageDTO bannerPageDTO1 = new BannerPageDTO();
        bannerPageDTO1.setId(1L);
        BannerPageDTO bannerPageDTO2 = new BannerPageDTO();
        assertThat(bannerPageDTO1).isNotEqualTo(bannerPageDTO2);
        bannerPageDTO2.setId(bannerPageDTO1.getId());
        assertThat(bannerPageDTO1).isEqualTo(bannerPageDTO2);
        bannerPageDTO2.setId(2L);
        assertThat(bannerPageDTO1).isNotEqualTo(bannerPageDTO2);
        bannerPageDTO1.setId(null);
        assertThat(bannerPageDTO1).isNotEqualTo(bannerPageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bannerPageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bannerPageMapper.fromId(null)).isNull();
    }
}
