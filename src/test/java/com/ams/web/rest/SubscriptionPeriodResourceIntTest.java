package com.ams.web.rest;

import com.ams.AdvManagementSystemApp;

import com.ams.domain.SubscriptionPeriod;
import com.ams.repository.SubscriptionPeriodRepository;
import com.ams.service.SubscriptionPeriodService;
import com.ams.service.dto.SubscriptionPeriodDTO;
import com.ams.service.mapper.SubscriptionPeriodMapper;
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
 * Test class for the SubscriptionPeriodResource REST controller.
 *
 * @see SubscriptionPeriodResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvManagementSystemApp.class)
public class SubscriptionPeriodResourceIntTest {

    private static final String DEFAULT_PERIOD_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_PERIOD_LABEL = "BBBBBBBBBB";

    private static final Integer DEFAULT_SUBSCRIPTION_DAYS = 1;
    private static final Integer UPDATED_SUBSCRIPTION_DAYS = 2;

    private static final Boolean DEFAULT_ACTIVATE = false;
    private static final Boolean UPDATED_ACTIVATE = true;

    @Autowired
    private SubscriptionPeriodRepository subscriptionPeriodRepository;

    @Autowired
    private SubscriptionPeriodMapper subscriptionPeriodMapper;

    @Autowired
    private SubscriptionPeriodService subscriptionPeriodService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubscriptionPeriodMockMvc;

    private SubscriptionPeriod subscriptionPeriod;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubscriptionPeriodResource subscriptionPeriodResource = new SubscriptionPeriodResource(subscriptionPeriodService);
        this.restSubscriptionPeriodMockMvc = MockMvcBuilders.standaloneSetup(subscriptionPeriodResource)
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
    public static SubscriptionPeriod createEntity(EntityManager em) {
        SubscriptionPeriod subscriptionPeriod = new SubscriptionPeriod()
            .periodLabel(DEFAULT_PERIOD_LABEL)
            .subscriptionDays(DEFAULT_SUBSCRIPTION_DAYS)
            .activate(DEFAULT_ACTIVATE);
        return subscriptionPeriod;
    }

    @Before
    public void initTest() {
        subscriptionPeriod = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscriptionPeriod() throws Exception {
        int databaseSizeBeforeCreate = subscriptionPeriodRepository.findAll().size();

        // Create the SubscriptionPeriod
        SubscriptionPeriodDTO subscriptionPeriodDTO = subscriptionPeriodMapper.toDto(subscriptionPeriod);
        restSubscriptionPeriodMockMvc.perform(post("/api/subscription-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPeriodDTO)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionPeriod in the database
        List<SubscriptionPeriod> subscriptionPeriodList = subscriptionPeriodRepository.findAll();
        assertThat(subscriptionPeriodList).hasSize(databaseSizeBeforeCreate + 1);
        SubscriptionPeriod testSubscriptionPeriod = subscriptionPeriodList.get(subscriptionPeriodList.size() - 1);
        assertThat(testSubscriptionPeriod.getPeriodLabel()).isEqualTo(DEFAULT_PERIOD_LABEL);
        assertThat(testSubscriptionPeriod.getSubscriptionDays()).isEqualTo(DEFAULT_SUBSCRIPTION_DAYS);
        assertThat(testSubscriptionPeriod.isActivate()).isEqualTo(DEFAULT_ACTIVATE);
    }

    @Test
    @Transactional
    public void createSubscriptionPeriodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscriptionPeriodRepository.findAll().size();

        // Create the SubscriptionPeriod with an existing ID
        subscriptionPeriod.setId(1L);
        SubscriptionPeriodDTO subscriptionPeriodDTO = subscriptionPeriodMapper.toDto(subscriptionPeriod);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriptionPeriodMockMvc.perform(post("/api/subscription-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPeriodDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionPeriod in the database
        List<SubscriptionPeriod> subscriptionPeriodList = subscriptionPeriodRepository.findAll();
        assertThat(subscriptionPeriodList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPeriodLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionPeriodRepository.findAll().size();
        // set the field null
        subscriptionPeriod.setPeriodLabel(null);

        // Create the SubscriptionPeriod, which fails.
        SubscriptionPeriodDTO subscriptionPeriodDTO = subscriptionPeriodMapper.toDto(subscriptionPeriod);

        restSubscriptionPeriodMockMvc.perform(post("/api/subscription-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPeriodDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionPeriod> subscriptionPeriodList = subscriptionPeriodRepository.findAll();
        assertThat(subscriptionPeriodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSubscriptionDaysIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionPeriodRepository.findAll().size();
        // set the field null
        subscriptionPeriod.setSubscriptionDays(null);

        // Create the SubscriptionPeriod, which fails.
        SubscriptionPeriodDTO subscriptionPeriodDTO = subscriptionPeriodMapper.toDto(subscriptionPeriod);

        restSubscriptionPeriodMockMvc.perform(post("/api/subscription-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPeriodDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionPeriod> subscriptionPeriodList = subscriptionPeriodRepository.findAll();
        assertThat(subscriptionPeriodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActivateIsRequired() throws Exception {
        int databaseSizeBeforeTest = subscriptionPeriodRepository.findAll().size();
        // set the field null
        subscriptionPeriod.setActivate(null);

        // Create the SubscriptionPeriod, which fails.
        SubscriptionPeriodDTO subscriptionPeriodDTO = subscriptionPeriodMapper.toDto(subscriptionPeriod);

        restSubscriptionPeriodMockMvc.perform(post("/api/subscription-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPeriodDTO)))
            .andExpect(status().isBadRequest());

        List<SubscriptionPeriod> subscriptionPeriodList = subscriptionPeriodRepository.findAll();
        assertThat(subscriptionPeriodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubscriptionPeriods() throws Exception {
        // Initialize the database
        subscriptionPeriodRepository.saveAndFlush(subscriptionPeriod);

        // Get all the subscriptionPeriodList
        restSubscriptionPeriodMockMvc.perform(get("/api/subscription-periods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionPeriod.getId().intValue())))
            .andExpect(jsonPath("$.[*].periodLabel").value(hasItem(DEFAULT_PERIOD_LABEL.toString())))
            .andExpect(jsonPath("$.[*].subscriptionDays").value(hasItem(DEFAULT_SUBSCRIPTION_DAYS)))
            .andExpect(jsonPath("$.[*].activate").value(hasItem(DEFAULT_ACTIVATE.booleanValue())));
    }

    @Test
    @Transactional
    public void getSubscriptionPeriod() throws Exception {
        // Initialize the database
        subscriptionPeriodRepository.saveAndFlush(subscriptionPeriod);

        // Get the subscriptionPeriod
        restSubscriptionPeriodMockMvc.perform(get("/api/subscription-periods/{id}", subscriptionPeriod.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subscriptionPeriod.getId().intValue()))
            .andExpect(jsonPath("$.periodLabel").value(DEFAULT_PERIOD_LABEL.toString()))
            .andExpect(jsonPath("$.subscriptionDays").value(DEFAULT_SUBSCRIPTION_DAYS))
            .andExpect(jsonPath("$.activate").value(DEFAULT_ACTIVATE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSubscriptionPeriod() throws Exception {
        // Get the subscriptionPeriod
        restSubscriptionPeriodMockMvc.perform(get("/api/subscription-periods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscriptionPeriod() throws Exception {
        // Initialize the database
        subscriptionPeriodRepository.saveAndFlush(subscriptionPeriod);
        int databaseSizeBeforeUpdate = subscriptionPeriodRepository.findAll().size();

        // Update the subscriptionPeriod
        SubscriptionPeriod updatedSubscriptionPeriod = subscriptionPeriodRepository.findOne(subscriptionPeriod.getId());
        // Disconnect from session so that the updates on updatedSubscriptionPeriod are not directly saved in db
        em.detach(updatedSubscriptionPeriod);
        updatedSubscriptionPeriod
            .periodLabel(UPDATED_PERIOD_LABEL)
            .subscriptionDays(UPDATED_SUBSCRIPTION_DAYS)
            .activate(UPDATED_ACTIVATE);
        SubscriptionPeriodDTO subscriptionPeriodDTO = subscriptionPeriodMapper.toDto(updatedSubscriptionPeriod);

        restSubscriptionPeriodMockMvc.perform(put("/api/subscription-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPeriodDTO)))
            .andExpect(status().isOk());

        // Validate the SubscriptionPeriod in the database
        List<SubscriptionPeriod> subscriptionPeriodList = subscriptionPeriodRepository.findAll();
        assertThat(subscriptionPeriodList).hasSize(databaseSizeBeforeUpdate);
        SubscriptionPeriod testSubscriptionPeriod = subscriptionPeriodList.get(subscriptionPeriodList.size() - 1);
        assertThat(testSubscriptionPeriod.getPeriodLabel()).isEqualTo(UPDATED_PERIOD_LABEL);
        assertThat(testSubscriptionPeriod.getSubscriptionDays()).isEqualTo(UPDATED_SUBSCRIPTION_DAYS);
        assertThat(testSubscriptionPeriod.isActivate()).isEqualTo(UPDATED_ACTIVATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscriptionPeriod() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionPeriodRepository.findAll().size();

        // Create the SubscriptionPeriod
        SubscriptionPeriodDTO subscriptionPeriodDTO = subscriptionPeriodMapper.toDto(subscriptionPeriod);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubscriptionPeriodMockMvc.perform(put("/api/subscription-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPeriodDTO)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionPeriod in the database
        List<SubscriptionPeriod> subscriptionPeriodList = subscriptionPeriodRepository.findAll();
        assertThat(subscriptionPeriodList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSubscriptionPeriod() throws Exception {
        // Initialize the database
        subscriptionPeriodRepository.saveAndFlush(subscriptionPeriod);
        int databaseSizeBeforeDelete = subscriptionPeriodRepository.findAll().size();

        // Get the subscriptionPeriod
        restSubscriptionPeriodMockMvc.perform(delete("/api/subscription-periods/{id}", subscriptionPeriod.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubscriptionPeriod> subscriptionPeriodList = subscriptionPeriodRepository.findAll();
        assertThat(subscriptionPeriodList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionPeriod.class);
        SubscriptionPeriod subscriptionPeriod1 = new SubscriptionPeriod();
        subscriptionPeriod1.setId(1L);
        SubscriptionPeriod subscriptionPeriod2 = new SubscriptionPeriod();
        subscriptionPeriod2.setId(subscriptionPeriod1.getId());
        assertThat(subscriptionPeriod1).isEqualTo(subscriptionPeriod2);
        subscriptionPeriod2.setId(2L);
        assertThat(subscriptionPeriod1).isNotEqualTo(subscriptionPeriod2);
        subscriptionPeriod1.setId(null);
        assertThat(subscriptionPeriod1).isNotEqualTo(subscriptionPeriod2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionPeriodDTO.class);
        SubscriptionPeriodDTO subscriptionPeriodDTO1 = new SubscriptionPeriodDTO();
        subscriptionPeriodDTO1.setId(1L);
        SubscriptionPeriodDTO subscriptionPeriodDTO2 = new SubscriptionPeriodDTO();
        assertThat(subscriptionPeriodDTO1).isNotEqualTo(subscriptionPeriodDTO2);
        subscriptionPeriodDTO2.setId(subscriptionPeriodDTO1.getId());
        assertThat(subscriptionPeriodDTO1).isEqualTo(subscriptionPeriodDTO2);
        subscriptionPeriodDTO2.setId(2L);
        assertThat(subscriptionPeriodDTO1).isNotEqualTo(subscriptionPeriodDTO2);
        subscriptionPeriodDTO1.setId(null);
        assertThat(subscriptionPeriodDTO1).isNotEqualTo(subscriptionPeriodDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subscriptionPeriodMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subscriptionPeriodMapper.fromId(null)).isNull();
    }
}
