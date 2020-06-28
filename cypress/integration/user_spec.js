describe('User', () => {

    it('Visits the Home Page', () => {
        cy.visit('/');
        cy.contains('The Stocks App');

    });

    it('Sets the API Key', () => {

        const apiKey = Cypress.env('EXTERNAL_API_KEY')
        cy.get('.api-key-input')
            .type(apiKey)
            .should('have.value', apiKey)

        cy.contains('Set API Key').click();

    });

    it('Types an invalid symbol and gets the error message', () => {

        cy.get('.symbol-input')
            .clear()
            .type('xyz')
            .should('have.value', 'xyz')

        cy.contains('Enter').click();

        cy.contains('No data found');

    });


    describe('Enters the AAPL', () => {

        beforeEach(() => {

            cy.get('.symbol-input')
                .clear()
                .type('AAPL')
                .should('have.value', 'AAPL')

            cy.contains('Enter').click();

        });

        it('Types a valid symbol and gets the stock information', () => {

            cy.contains('Timothy D. Cook');

        });

        it('Price contains a $ sign', () => {    
            cy.get('.price')
                .contains('$');
    
        });

        it('Changes field should have an appropriate class', () => {        

            cy.get('.changes').then((changes) => {

                const changesVal = Number(changes.text());
                if (changesVal > 0) {
                    changes.should('have.class', 'positive');
                }
                else if (changesVal < 0) {
                    changes.should('have.class', 'negative');
                }
            });    
        });

    });

})
