import {faker} from '@faker-js/faker';

Cypress.Commands.add('generateFixture', () => {
    const faker = require('@faker-js/faker')
  
    cy.writeFile('cypress/fixtures/createaccount.json', {
      'hits':Cypress._.times(1, () => {
        return {
    
            'objectID':`${faker.datatype.uuid()}`
        
        }
      })
    })
  })