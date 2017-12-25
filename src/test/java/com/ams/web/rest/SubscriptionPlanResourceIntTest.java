package com.ams.web.rest;

import com.ams.AdvManagementSystemApp;

import com.ams.domain.SubscriptionPlan;
import com.ams.domain.BannerType;
import com.ams.domain.BannerSize;
import com.ams.domain.BannerLocation;
import com.ams.domain.BannerPage;
import com.ams.domain.SubscriptionPeriod;
import com.ams.domain.City;
import com.ams.repository.SubscriptionPlanRepository;
import com.ams.service.SubscriptionPlanService;
import com.ams.service.dto.SubscriptionPlanDTO;
import com.ams.service.mapper.SubscriptionPlanMapper;
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
import java.math.BigDecimal;
import java.util.List;

import static com.ams.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SubscriptionPlanResource REST controller.
 *
 * @see SubscriptionPlanResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvManagementSystemApp.class)
public class SubscriptionPlanResourceIntTest {

    private static final String DEFAULT_PLAN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PLAN_NAME = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(0);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(1);

    private static final Integer DEFAULT_MAX_SUBSCRIPTION = 0;
    private static final Integer UPDATED_MAX_SUBSCRIPTION = 1;

    private static final Boolean DEFAULT_ACTIVATE = false;
    private static final Boolean UPDATED_ACTIVATE = true;

    @Autowired
    private SubscriptionPlanRepository subscriptionPlanRepository;

    @Autowired
    private SubscriptionPlanMapper subscriptionPlanMapper;

    @Autowired
    private SubscriptionPlanService subscriptionPlanService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubscriptionPlanMockMvc;

    private SubscriptionPlan subscriptionPlan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubscriptionPlanResource subscriptionPlanResource = new SubscriptionPlanResource(subscriptionPlanService);
        this.restSubscriptionPlanMockMvc = MockMvcBuilders.standaloneSetup(subscriptionPlanResource)
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
    public static SubscriptionPlan createEntity(EntityManager em) {
        SubscriptionPlan subscriptionPlan = new SubscriptionPlan()
            .planName(DEFAULT_PLAN_NAME)
            .price(DEFAULT_PRICE)
            .maxSubscription(DEFAULT_MAX_SUBSCRIPTION)
            .activate(DEFAULT_ACTIVATE);
        // Add required entity
        BannerType bannerType = BannerTypeResourceIntTest.createEntity(em);
        em.persist(bannerType);
        em.flush();
        subscriptionPlan.setBannerType(bannerType);
        // Add required entity
        BannerSize bannerSize = BannerSizeResourceIntTest.createEntity(em);
        em.persist(bannerSize);
        em.flush();
        subscriptionPlan.setBannerSize(bannerSize);
        // Add required entity
        BannerLocation bannerLocation = BannerLocationResourceIntTest.createEntity(em);
        em.persist(bannerLocation);
        em.flush();
        subscriptionPlan.setBannerLocation(bannerLocation);
        // Add required entity
        BannerPage bannerPage = BannerPageResourceIntTest.createEntity(em);
        em.persist(bannerPage);
        em.flush();
        subscriptionPlan.setBannerPage(bannerPage);
        // Add required entity
        SubscriptionPeriod subscriptionPeriod = SubscriptionPeriodResourceIntTest.createEntity(em);
        em.persist(subscriptionPeriod);
        em.flush();
        subscriptionPlan.setSubscriptionPeriod(subscriptionPeriod);
        // Add required entity
        City city = CityResourceIntTest.createEntity(em);
        em.persist(city);
        em.flush();
        subscriptionPlan.setCity(city);
        return subscriptionPlan;
    }

    @Before
    public void initTest() {
        subscriptionPlan = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscriptionPlan() throws Exception {
        int databaseSizeBeforeCreate = subscriptionPlanRepository.findAll().size();

        // Create the SubscriptionPlan
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);
        restSubscriptionPlanMockMvc.perform(post("/api/subscription-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionPlan in the database
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeCreate + 1);
        SubscriptionPlan testSubscriptionPlan = subscriptionPlanList.get(subscriptionPlanList.size() - 1);
        assertThat(testSubscriptionPlan.getPlanName()).isEqualTo(DEFAULT_PLAN_NAME);
        assertThat(testSubscriptionPlan.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testSubscriptionPlan.getMaxSubscription()).isEqualTo(DEFAULT_MAX_SUBSCRIPTION);
        assertThat(testSubscriptionPlan.isActivate()).isEqualTo(DEFAULT_ACTIVATE);
    }

    @Test
    @Transactional
    public void createSubscriptionPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscriptionPlanRepository.findAll().size();

        // Create the SubscriptionPlan with an existing ID
        subscriptionPlan.setId(1L);
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriptionPlanMockMvc.perform(post("/api/subscription-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionPlan in the database
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPlanNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionPlanRepository.findAll().size();
        // set the field null
        subscriptionPlan.setPlanName(null);

        // Create the SubscriptionPlan, which fails.
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);

        restSubscriptionPlanMockMvc.perform(post("/api/subscription-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionPlanRepository.findAll().size();
        // set the field null
        subscriptionPlan.setPrice(null);

        // Create the SubscriptionPlan, which fails.
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);

        restSubscriptionPlanMockMvc.perform(post("/api/subscription-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMaxSubscriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionPlanRepository.findAll().size();
        // set the field null
        subscriptionPlan.setMaxSubscription(null);

        // Create the SubscriptionPlan, which fails.
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);

        restSubscriptionPlanMockMvc.perform(post("/api/subscription-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActivateIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionPlanRepository.findAll().size();
        // set the field null
        subscriptionPlan.setActivate(null);

        // Create the SubscriptionPlan, which fails.
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);

        restSubscriptionPlanMockMvc.perform(post("/api/subscription-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubscriptionPlans() throws Exception {
        // Initialize the database
        subscriptionPlanRepository.saveAndFlush(subscriptionPlan);

        // Get all the subscriptionPlanList
        restSubscriptionPlanMockMvc.perform(get("/api/subscription-plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionPlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].planName").value(hasItem(DEFAULT_PLAN_NAME.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].maxSubscription").value(hasItem(DEFAULT_MAX_SUBSCRIPTION)))
            .andExpect(jsonPath("$.[*].activate").value(hasItem(DEFAULT_ACTIVATE.booleanValue())));
    }

    @Test
    @Transactional
    public void getSubscriptionPlan() throws Exception {
        // Initialize the database
        subscriptionPlanRepository.saveAndFlush(subscriptionPlan);

        // Get the subscriptionPlan
        restSubscriptionPlanMockMvc.perform(get("/api/subscription-plans/{id}", subscriptionPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subscriptionPlan.getId().intValue()))
            .andExpect(jsonPath("$.planName").value(DEFAULT_PLAN_NAME.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.maxSubscription").value(DEFAULT_MAX_SUBSCRIPTION))
            .andExpect(jsonPath("$.activate").value(DEFAULT_ACTIVATE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSubscriptionPlan() throws Exception {
        // Get the subscriptionPlan
        restSubscriptionPlanMockMvc.perform(get("/api/subscription-plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscriptionPlan() throws Exception {
        // Initialize the database
        subscriptionPlanRepository.saveAndFlush(subscriptionPlan);
        int databaseSizeBeforeUpdate = subscriptionPlanRepository.findAll().size();

        // Update the subscriptionPlan
        SubscriptionPlan updatedSubscriptionPlan = subscriptionPlanRepository.findOne(subscriptionPlan.getId());
        // Disconnect from session so that the updates on updatedSubscriptionPlan are not directly saved in db
        em.detach(updatedSubscriptionPlan);
        updatedSubscriptionPlan
            .planName(UPDATED_PLAN_NAME)
            .price(UPDATED_PRICE)
            .maxSubscription(UPDATED_MAX_SUBSCRIPTION)
            .activate(UPDATED_ACTIVATE);
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(updatedSubscriptionPlan);

        restSubscriptionPlanMockMvc.perform(put("/api/subscription-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isOk());

        // Validate the SubscriptionPlan in the database
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeUpdate);
        SubscriptionPlan testSubscriptionPlan = subscriptionPlanList.get(subscriptionPlanList.size() - 1);
        assertThat(testSubscriptionPlan.getPlanName()).isEqualTo(UPDATED_PLAN_NAME);
        assertThat(testSubscriptionPlan.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testSubscriptionPlan.getMaxSubscription()).isEqualTo(UPDATED_MAX_SUBSCRIPTION);
        assertThat(testSubscriptionPlan.isActivate()).isEqualTo(UPDATED_ACTIVATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscriptionPlan() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionPlanRepository.findAll().size();

        // Create the SubscriptionPlan
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubscriptionPlanMockMvc.perform(put("/api/subscription-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionPlan in the database
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSubscriptionPlan() throws Exception {
        // Initialize the database
        subscriptionPlanRepository.saveAndFlush(subscriptionPlan);
        int databaseSizeBeforeDelete = subscriptionPlanRepository.findAll().size();

        // Get the subscriptionPlan
        restSubscriptionPlanMockMvc.perform(delete("/api/subscription-plans/{id}", subscriptionPlan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionPlan.class);
        SubscriptionPlan subscriptionPlan1 = new SubscriptionPlan();
        subscriptionPlan1.setId(1L);
        SubscriptionPlan subscriptionPlan2 = new SubscriptionPlan();
        subscriptionPlan2.setId(subscriptionPlan1.getId());
        assertThat(subscriptionPlan1).isEqualTo(subscriptionPlan2);
        subscriptionPlan2.setId(2L);
        assertThat(subscriptionPlan1).isNotEqualTo(subscriptionPlan2);
        subscriptionPlan1.setId(null);
        assertThat(subscriptionPlan1).isNotEqualTo(subscriptionPlan2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionPlanDTO.class);
        SubscriptionPlanDTO subscriptionPlanDTO1 = new SubscriptionPlanDTO();
        subscriptionPlanDTO1.setId(1L);
        SubscriptionPlanDTO subscriptionPlanDTO2 = new SubscriptionPlanDTO();
        assertThat(subscriptionPlanDTO1).isNotEqualTo(subscriptionPlanDTO2);
        subscriptionPlanDTO2.setId(subscriptionPlanDTO1.getId());
        assertThat(subscriptionPlanDTO1).isEqualTo(subscriptionPlanDTO2);
        subscriptionPlanDTO2.setId(2L);
        assertThat(subscriptionPlanDTO1).isNotEqualTo(subscriptionPlanDTO2);
        subscriptionPlanDTO1.setId(null);
        assertThat(subscriptionPlanDTO1).isNotEqualTo(subscriptionPlanDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subscriptionPlanMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subscriptionPlanMapper.fromId(null)).isNull();
    }
}
