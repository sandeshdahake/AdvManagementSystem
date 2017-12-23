package com.ams.web.rest;

import com.ams.AdvManagementSystemApp;

import com.ams.domain.ClientSubscription;
import com.ams.domain.City;
import com.ams.domain.Client;
import com.ams.domain.SubscriptionPlan;
import com.ams.repository.ClientSubscriptionRepository;
import com.ams.service.ClientSubscriptionService;
import com.ams.service.dto.ClientSubscriptionDTO;
import com.ams.service.mapper.ClientSubscriptionMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.ams.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ClientSubscriptionResource REST controller.
 *
 * @see ClientSubscriptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvManagementSystemApp.class)
public class ClientSubscriptionResourceIntTest {

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRIORITY_PRICE = new BigDecimal(0);
    private static final BigDecimal UPDATED_PRIORITY_PRICE = new BigDecimal(1);

    private static final BigDecimal DEFAULT_DISCOUNT = new BigDecimal(0);
    private static final BigDecimal UPDATED_DISCOUNT = new BigDecimal(1);

    private static final BigDecimal DEFAULT_TOTAL_PRICE = new BigDecimal(0);
    private static final BigDecimal UPDATED_TOTAL_PRICE = new BigDecimal(1);

    private static final Boolean DEFAULT_ACTIVE_SUBSCRIPTION = false;
    private static final Boolean UPDATED_ACTIVE_SUBSCRIPTION = true;

    @Autowired
    private ClientSubscriptionRepository clientSubscriptionRepository;

    @Autowired
    private ClientSubscriptionMapper clientSubscriptionMapper;

    @Autowired
    private ClientSubscriptionService clientSubscriptionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClientSubscriptionMockMvc;

    private ClientSubscription clientSubscription;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClientSubscriptionResource clientSubscriptionResource = new ClientSubscriptionResource(clientSubscriptionService);
        this.restClientSubscriptionMockMvc = MockMvcBuilders.standaloneSetup(clientSubscriptionResource)
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
    public static ClientSubscription createEntity(EntityManager em) {
        ClientSubscription clientSubscription = new ClientSubscription()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .link(DEFAULT_LINK)
            .priorityPrice(DEFAULT_PRIORITY_PRICE)
            .discount(DEFAULT_DISCOUNT)
            .totalPrice(DEFAULT_TOTAL_PRICE)
            .activeSubscription(DEFAULT_ACTIVE_SUBSCRIPTION);
        // Add required entity
        City city = CityResourceIntTest.createEntity(em);
        em.persist(city);
        em.flush();
        clientSubscription.setCity(city);
        // Add required entity
        Client client = ClientResourceIntTest.createEntity(em);
        em.persist(client);
        em.flush();
        clientSubscription.setClient(client);
        // Add required entity
        SubscriptionPlan subscriptionPlan = SubscriptionPlanResourceIntTest.createEntity(em);
        em.persist(subscriptionPlan);
        em.flush();
        clientSubscription.setSubscriptionPlan(subscriptionPlan);
        return clientSubscription;
    }

    @Before
    public void initTest() {
        clientSubscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createClientSubscription() throws Exception {
        int databaseSizeBeforeCreate = clientSubscriptionRepository.findAll().size();

        // Create the ClientSubscription
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionMapper.toDto(clientSubscription);
        restClientSubscriptionMockMvc.perform(post("/api/client-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientSubscriptionDTO)))
            .andExpect(status().isCreated());

        // Validate the ClientSubscription in the database
        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        ClientSubscription testClientSubscription = clientSubscriptionList.get(clientSubscriptionList.size() - 1);
        assertThat(testClientSubscription.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testClientSubscription.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testClientSubscription.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testClientSubscription.getPriorityPrice()).isEqualTo(DEFAULT_PRIORITY_PRICE);
        assertThat(testClientSubscription.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testClientSubscription.getTotalPrice()).isEqualTo(DEFAULT_TOTAL_PRICE);
        assertThat(testClientSubscription.isActiveSubscription()).isEqualTo(DEFAULT_ACTIVE_SUBSCRIPTION);
    }

    @Test
    @Transactional
    public void createClientSubscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientSubscriptionRepository.findAll().size();

        // Create the ClientSubscription with an existing ID
        clientSubscription.setId(1L);
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionMapper.toDto(clientSubscription);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientSubscriptionMockMvc.perform(post("/api/client-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClientSubscription in the database
        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientSubscriptionRepository.findAll().size();
        // set the field null
        clientSubscription.setStartDate(null);

        // Create the ClientSubscription, which fails.
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionMapper.toDto(clientSubscription);

        restClientSubscriptionMockMvc.perform(post("/api/client-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientSubscriptionRepository.findAll().size();
        // set the field null
        clientSubscription.setEndDate(null);

        // Create the ClientSubscription, which fails.
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionMapper.toDto(clientSubscription);

        restClientSubscriptionMockMvc.perform(post("/api/client-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLinkIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientSubscriptionRepository.findAll().size();
        // set the field null
        clientSubscription.setLink(null);

        // Create the ClientSubscription, which fails.
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionMapper.toDto(clientSubscription);

        restClientSubscriptionMockMvc.perform(post("/api/client-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientSubscriptionRepository.findAll().size();
        // set the field null
        clientSubscription.setTotalPrice(null);

        // Create the ClientSubscription, which fails.
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionMapper.toDto(clientSubscription);

        restClientSubscriptionMockMvc.perform(post("/api/client-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveSubscriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientSubscriptionRepository.findAll().size();
        // set the field null
        clientSubscription.setActiveSubscription(null);

        // Create the ClientSubscription, which fails.
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionMapper.toDto(clientSubscription);

        restClientSubscriptionMockMvc.perform(post("/api/client-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClientSubscriptions() throws Exception {
        // Initialize the database
        clientSubscriptionRepository.saveAndFlush(clientSubscription);

        // Get all the clientSubscriptionList
        restClientSubscriptionMockMvc.perform(get("/api/client-subscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientSubscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())))
            .andExpect(jsonPath("$.[*].priorityPrice").value(hasItem(DEFAULT_PRIORITY_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.intValue())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].activeSubscription").value(hasItem(DEFAULT_ACTIVE_SUBSCRIPTION.booleanValue())));
    }

    @Test
    @Transactional
    public void getClientSubscription() throws Exception {
        // Initialize the database
        clientSubscriptionRepository.saveAndFlush(clientSubscription);

        // Get the clientSubscription
        restClientSubscriptionMockMvc.perform(get("/api/client-subscriptions/{id}", clientSubscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clientSubscription.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()))
            .andExpect(jsonPath("$.priorityPrice").value(DEFAULT_PRIORITY_PRICE.intValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.intValue()))
            .andExpect(jsonPath("$.totalPrice").value(DEFAULT_TOTAL_PRICE.intValue()))
            .andExpect(jsonPath("$.activeSubscription").value(DEFAULT_ACTIVE_SUBSCRIPTION.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingClientSubscription() throws Exception {
        // Get the clientSubscription
        restClientSubscriptionMockMvc.perform(get("/api/client-subscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClientSubscription() throws Exception {
        // Initialize the database
        clientSubscriptionRepository.saveAndFlush(clientSubscription);
        int databaseSizeBeforeUpdate = clientSubscriptionRepository.findAll().size();

        // Update the clientSubscription
        ClientSubscription updatedClientSubscription = clientSubscriptionRepository.findOne(clientSubscription.getId());
        // Disconnect from session so that the updates on updatedClientSubscription are not directly saved in db
        em.detach(updatedClientSubscription);
        updatedClientSubscription
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .link(UPDATED_LINK)
            .priorityPrice(UPDATED_PRIORITY_PRICE)
            .discount(UPDATED_DISCOUNT)
            .totalPrice(UPDATED_TOTAL_PRICE)
            .activeSubscription(UPDATED_ACTIVE_SUBSCRIPTION);
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionMapper.toDto(updatedClientSubscription);

        restClientSubscriptionMockMvc.perform(put("/api/client-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientSubscriptionDTO)))
            .andExpect(status().isOk());

        // Validate the ClientSubscription in the database
        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeUpdate);
        ClientSubscription testClientSubscription = clientSubscriptionList.get(clientSubscriptionList.size() - 1);
        assertThat(testClientSubscription.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testClientSubscription.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testClientSubscription.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testClientSubscription.getPriorityPrice()).isEqualTo(UPDATED_PRIORITY_PRICE);
        assertThat(testClientSubscription.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testClientSubscription.getTotalPrice()).isEqualTo(UPDATED_TOTAL_PRICE);
        assertThat(testClientSubscription.isActiveSubscription()).isEqualTo(UPDATED_ACTIVE_SUBSCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingClientSubscription() throws Exception {
        int databaseSizeBeforeUpdate = clientSubscriptionRepository.findAll().size();

        // Create the ClientSubscription
        ClientSubscriptionDTO clientSubscriptionDTO = clientSubscriptionMapper.toDto(clientSubscription);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClientSubscriptionMockMvc.perform(put("/api/client-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientSubscriptionDTO)))
            .andExpect(status().isCreated());

        // Validate the ClientSubscription in the database
        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClientSubscription() throws Exception {
        // Initialize the database
        clientSubscriptionRepository.saveAndFlush(clientSubscription);
        int databaseSizeBeforeDelete = clientSubscriptionRepository.findAll().size();

        // Get the clientSubscription
        restClientSubscriptionMockMvc.perform(delete("/api/client-subscriptions/{id}", clientSubscription.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClientSubscription> clientSubscriptionList = clientSubscriptionRepository.findAll();
        assertThat(clientSubscriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientSubscription.class);
        ClientSubscription clientSubscription1 = new ClientSubscription();
        clientSubscription1.setId(1L);
        ClientSubscription clientSubscription2 = new ClientSubscription();
        clientSubscription2.setId(clientSubscription1.getId());
        assertThat(clientSubscription1).isEqualTo(clientSubscription2);
        clientSubscription2.setId(2L);
        assertThat(clientSubscription1).isNotEqualTo(clientSubscription2);
        clientSubscription1.setId(null);
        assertThat(clientSubscription1).isNotEqualTo(clientSubscription2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientSubscriptionDTO.class);
        ClientSubscriptionDTO clientSubscriptionDTO1 = new ClientSubscriptionDTO();
        clientSubscriptionDTO1.setId(1L);
        ClientSubscriptionDTO clientSubscriptionDTO2 = new ClientSubscriptionDTO();
        assertThat(clientSubscriptionDTO1).isNotEqualTo(clientSubscriptionDTO2);
        clientSubscriptionDTO2.setId(clientSubscriptionDTO1.getId());
        assertThat(clientSubscriptionDTO1).isEqualTo(clientSubscriptionDTO2);
        clientSubscriptionDTO2.setId(2L);
        assertThat(clientSubscriptionDTO1).isNotEqualTo(clientSubscriptionDTO2);
        clientSubscriptionDTO1.setId(null);
        assertThat(clientSubscriptionDTO1).isNotEqualTo(clientSubscriptionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(clientSubscriptionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(clientSubscriptionMapper.fromId(null)).isNull();
    }
}
