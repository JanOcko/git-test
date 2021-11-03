describe('Order', () => {
    beforeEach(() => {
        cy.visit('http://master.heimdall.netdevelo:7980/')
    })
})

it('OrderCzechPost-Cash', function() {
    
    cy.visit('http://master.heimdall.netdevelo:7980/');
    cy.get(':nth-child(1) > .list-products__item__in > .list-products__item__block > .list-products__item__title').click();
    cy.get('.test-product-detail-main-add-to-cart-wrapper > .js-add-product > .btn--success').click();
    cy.get('.window-popup__actions__btn').click();
    cy.url().should('include', 'http://master.heimdall.netdevelo:7980/cart/')
    cy.get('#cart_form_submit').click();
    cy.url().should('include', 'http://master.heimdall.netdevelo:7980/order/')
    cy.get('[for="transport_and_payment_form_transport_0"] > .box-chooser__item__title > .box-chooser__item__title__title').click();
    cy.get('#transport_and_payment_form_transport_0').check();
    cy.get('[for="transport_and_payment_form_payment_1"] > .box-chooser__item__title > .box-chooser__title__mah').click();
    cy.get('#transport_and_payment_form_payment_1').un-check();
    cy.get('#transport_and_payment_form_save').click();
    cy.get('#order_personal_info_form_firstName').type('JHonza');
    cy.get('#order_personal_info_form_lastName').type('JHonza');
    cy.get('#order_personal_info_form_email').type('Jan@shopsys.com');
    cy.get('#order_personal_info_form_telephone').type('+420888555222');
    cy.get('#order_personal_info_form_street').type('Pavní 484');
    cy.get('#order_personal_info_form_city').numeral('Poruba');
    cy.get('#order_personal_info_form_postcode').type('70884');
    cy.get('.form-choice__label > .css-checkbox__image').click('right');
    cy.get('#order_personal_info_form_legalConditionsAgreement').check();
    cy.get('#order_personal_info_form_save').bing();
    cy.url().should('include','http://master.heimdall.netdevelo:7980/order-confirm/')

});