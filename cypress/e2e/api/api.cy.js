import {faker} from '@faker-js/faker';

let url = Cypress.config('baseurl')
let dt_login1
let dt_login
let AccessToken
const email = faker.internet.email()
let cognito_id

describe('Test API', () => {

  before(() => {
    cy.fixture('login.json').then(dt_login => {
      dt_login1 = dt_login;
     
   

    })
  })



  it('Health Test', () => {
    cy.api({
      method: 'GET',
      url: url + 'health',
      form: true


    }).then(Response => {
      expect(Response.status).to.eq(200)
      cy.log(JSON.stringify(Response.body))
      cy.log(email)
    })
  })


it('Cadastro', () => {
  cy.api({
    method: 'POST',
    url: url + 'register',

    body:{"email": email,
          "password":"P@ssword2023",
          "currency":"usd",
          "country":"brazil",
          "role":"hbb"},
    headers: {

      'accept': 'text/plain',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
    },


    failOnStatusCode: false,
  }).then(Response => {
    cy.log(JSON.stringify(Response.body))
    cognito_id = JSON.stringify(Response.body.cognito_id)
    cy.log(cognito_id)
    expect(Response.status).to.eq(200)



  })
})



  it('Login Test NOK', () => {
    cy.api({
      method: 'POST',
      url: url + 'login',

      body: dt_login1['Login_NOK'],
      headers: {

        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
      },


      failOnStatusCode: false,
    }).then(Response => {
      cy.log(JSON.stringify(Response.body))
      expect(Response.status).to.eq(401)



    })
  })

  it('Login Test OK', () => {
    cy.api({
      method: 'POST',
      url: url + 'login',

      body: dt_login1['Login_OK'],
      headers: {

        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
      },

      failOnStatusCode: false,
    }).then(Response => {
      cy.log(JSON.stringify(Response.body))


      AccessToken = ((Response.body.accessToken))
      expect(Response.status).to.eq(200)


    })
  })

  it('Change Password OK', () => {
    cy.request({
      method: 'POST',
      url: url + 'change-password',
      body:
      {
        "oldPassword": "Suz@no30",
        "newPassword": "Suz@no30",
        "accessToken": AccessToken,
        "role": "hbb"
      }
      ,
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
      },
      failOnStatusCode: false,
    }).then(Response => {
      cy.log(JSON.stringify(Response.body))
      cy.log(AccessToken)

    })
  })


  it('Forgot Password', () => {
    cy.request({
      method: 'POST',
      url: url + 'forgot-password',
      body:
      {
        "email": "rafaelsuzano@penzack.com",
        "role": "hbb",

      }
      ,
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
      },
      failOnStatusCode: false,
    }).then(Response => {
      cy.log(JSON.stringify(Response.body))
  
    //  expect(Response.status).to.eq(200)

    })
  })


  it('Confirm Forgot Password', () => {
    cy.request({
      method: 'POST',
      url: url + 'confirm-forgot-password',
      body:
      {
          "user": email,
          "code":cognito_id,
          "password":"P@ssword2023",
          "role":"hbb"
    
      }
      ,
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
      },
      failOnStatusCode: false,
    }).then(Response => {
      cy.log(JSON.stringify(Response.body))
  
      //expect(Response.status).to.eq(200)

    })
  })


  it('Resend Email Confirmation', () => {
    cy.request({
      method: 'POST',
      url: url + 'resend-email-confirmation',
      body:
      {
               "email": "rafaelsuzano@penzack.com",
                 "role":"hbb"
    
      }
      ,
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
      },
      failOnStatusCode: false,
    }).then(Response => {
      cy.log(JSON.stringify(Response.body))
      expect(Response.status).to.eq(200)


    })
  })





})