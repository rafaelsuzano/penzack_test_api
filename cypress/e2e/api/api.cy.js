let url = Cypress.config('baseurl')
let dt_login1
let dt_login
let AccessToken

describe('Test API',() =>{

    before(() => {
        cy.fixture('login.json').then(dt_login => {
            dt_login1 = dt_login;
        })
    })
  
    it('Health Test',()=> {
        cy.request({
        method: 'GET',
        url: url  +'health',
        form:true


        }).then(Response =>{
            expect(Response.status).to.eq(200)
            cy.log(JSON.stringify(Response.body))


        })
    })


    it('Login Test NOK',()=> {
        cy.request({
        method: 'POST',
        url: url  +'login',

        body: dt_login1['Login_NOK'],  
          headers :{
           
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
          },
          
          
          failOnStatusCode:false,
        }).then(Response =>{
            cy.log(JSON.stringify(Response.body))
            expect(Response.status).to.eq(401)
           


        })
    })

    it('Login Test OK',()=> {
        cy.request({
        method: 'POST',
        url: url  +'login',

        body: dt_login1['Login_OK'],  
          headers :{
           
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
          },
          
          
          failOnStatusCode:false,
        }).then(Response =>{
            cy.log(JSON.stringify(Response.body))


            AccessToken = ((Response.body.accessToken))
            expect(Response.status).to.eq(200)
           

        })
    })

    it('Change Password OK',()=> {
        cy.request({
        method: 'POST',
        url: url  +'change-password',

        body: 

    {
        "oldPassword": "Suz@no30",
        "newPassword": "Suz@no30",
        "accessToken": AccessToken,
        "role": "hbb"

        }
        
        
        
        
        ,  
          headers :{
           
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
          },
          
          
          failOnStatusCode:false,
        }).then(Response =>{
            cy.log(JSON.stringify(Response.body))
            cy.log(AccessToken)
         
            //expect(Response.status).to.eq(200)
           


        })
    })

})


