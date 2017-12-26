package com.ams.web.rest.errors;

/**
 * Created by sandesh on 26/12/17.
 */
public class MaxSubscriptionReachedException extends BadRequestAlertException {

    public MaxSubscriptionReachedException() {
        super( "Maximum Subscrption crossed", "subscriptionManagement", "subscriptionManagement");
    }
}
