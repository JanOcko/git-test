it('OrderCzechPost-Cash', function() {
    
    cy.visit('http://master.heimdall.netdevelo:7980/');
    cy.get(':nth-child(1) > .list-products__item__in > .list-products__item__block > .list-products__item__title').click();
    cy.get('.test-product-detail-main-add-to-cart-wrapper > .js-add-product > .btn--success').click();
    cy.get('.window-popup__actions__btn').click();
    cy.url().should('include', 'http://master.heimdall.netdevelo:7980/cart/')
    cy.get('#cart_form_submit').click();
    cy.url().should('include', 'http://master.heimdall.netdevelo:7980/order/')
    cy.get('[for="transport_and_payment_form_transport_0"] > .box-chooser__item__title > .box-chooser__item__title__name').click();
    cy.get('#transport_and_payment_form_transport_0').check();
    cy.get('[for="transport_and_payment_form_payment_1"] > .box-chooser__item__title > .box-chooser__title__name').click();
    cy.get('#transport_and_payment_form_payment_1').check();
    cy.get('#transport_and_payment_form_save').click();
    cy.get('#order_personal_info_form_firstName').clear();
    cy.get('#order_personal_info_form_firstName').type('Jan');
    cy.get('#order_personal_info_form_lastName').clear();
    cy.get('#order_personal_info_form_lastName').type('Očko');
    cy.get('#order_personal_info_form_email').clear();
    cy.get('#order_personal_info_form_email').type('jan.ocko@shopsys.com');
    cy.get('#order_personal_info_form_telephone').clear();
    cy.get('#order_personal_info_form_telephone').type('+420606888777');
    cy.get('#order_personal_info_form_street').clear();
    cy.get('#order_personal_info_form_street').type('Hlavní');
    cy.get('#order_personal_info_form_city').clear();
    cy.get('#order_personal_info_form_city').type('Ostrava');
    cy.get('#order_personal_info_form_postcode').clear();
    cy.get('#order_personal_info_form_postcode').type('70800');
    cy.get('.form-choice__label > .css-checkbox__image').click('left');
    cy.get('#order_personal_info_form_legalConditionsAgreement').check();
    cy.get('#order_personal_info_form_save').click();
    cy.url().should('include','http://master.heimdall.netdevelo:7980/order-confirm/')

});