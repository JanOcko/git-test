function AddProductToCart (){ // Přidání Hello Kitty do košíku z homepage
    cy.get('.list-products__item__block').contains('22" Sencor SLE 22F46DM4 HELLO KITTY').click()
    cy.get('.test-product-detail-main-add-to-cart-wrapper > .js-add-product > .btn--success').click()
    cy.get('#js-window').should('be.visible')
    cy.get('.window-popup__actions__btn').click()
}

function CheckProductInCart(){
    cy.url().should('include', 'http://master.heimdall.netdevelo:7980/cart/')
}

function StepFromCartToShippingAndPayment(){
    cy.get('#cart_form_submit').click()
    cy.url().should('include','http://master.heimdall.netdevelo:7980/order/')
}

function StepFromShippingAndPaymentToDelivery(){
    cy.get('#transport_and_payment_form_save').click()
    cy.url().should('include','http://master.heimdall.netdevelo:7980/order/')
}

function FillStandardCustomerDeliveryDataInOrder(){
    cy.get('#order_personal_info_form_firstName').type('Jan')
    cy.get('#order_personal_info_form_lastName').type('Očko')
    cy.get('#order_personal_info_form_email').type('Jan.ocko@shopsys.com')
    cy.get('#order_personal_info_form_telephone').type('+420606888777')
    cy.get('#order_personal_info_form_street').type('Hlavní 1')
    cy.get('#order_personal_info_form_city').type('Ostrava')
    cy.get('#order_personal_info_form_postcode').type('70800')
}

function FillCompanyCustomerDeliveryDataInOrder(){
    cy.contains('I buy on company behalf').click()
    cy.get('#order_personal_info_form_companyName').type('Firma')
    cy.get('#order_personal_info_form_companyNumber').type('2777777')
    cy.get('#order_personal_info_form_companyTaxNumber').type('CZ277777')

}

function SendOrder(){
    cy.get('.form-choice__label > .css-checkbox__image').click('left')
    cy.get('#order_personal_info_form_save').click()
}

function CheckConfirmPageAndGoToHomepage(){
    cy.url().should('include','http://master.heimdall.netdevelo:7980/order-confirm/')
    cy.get('h1').contains('Order sent')
    cy.get('.in-action__btn').click()
    cy.url().should('include','http://master.heimdall.netdevelo:7980')
}

function InsertAndUsePromoCode(code){
    cy.get('#js-promo-code-input').type(code) // Vložení slevového kuponu
    cy.get('#js-promo-code-submit-button').click() // uplatnění slevového kuponu
    cy.get('.in-message--success').contains('Promo code added to order')
    cy.get('.box-promo-code').should('be.visible')
}

describe('Order', () => {
    beforeEach(() => {
        cy.visit('http://master.heimdall.netdevelo:7980/')
    })

        it('Order with coupone - transport PPL and Credit card payment', ()=> {
            AddProductToCart();
            CheckProductInCart();
            InsertAndUsePromoCode('test');
            StepFromCartToShippingAndPayment();
            cy.get('[for="transport_and_payment_form_transport_1"]').click() // PPL
            cy.get('[for="transport_and_payment_form_payment_0"]').click() // Credit card
            StepFromShippingAndPaymentToDelivery();
            FillStandardCustomerDeliveryDataInOrder();
            SendOrder();
            CheckConfirmPageAndGoToHomepage();
        })
 
}) 
