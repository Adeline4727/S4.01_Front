describe('Connection screen', () => {
  // beforeEach(() => {
  //   cy.window().then(win => win.sessionStorage.clear())
  //   cy.clearCookies()
  //   cy.clearAllLocalStorage()
  // })

  it("Tries to connect", () => {
    cy.visit('http://localhost:5173/')
    cy.contains("Se connecter").click()
    cy.url().should("include", "/connexion")

    cy.get("#mail").type("antoine.paris@email.com")
    cy.get("#mail").should('have.value', 'antoine.paris@email.com')

    cy.contains("Continuer").click()

    cy.get("#password").type("ParisienSecure2027")
    cy.get("#password").should("have.value", "ParisienSecure2027")

    cy.contains("button", "Se connecter").click({timeout: 5000})

    // cy.contains(".homeCarrousel").should("be.visible")
    // cy.location("pathname", {timeout: 5000}).should("eq", "/")
    // cy.location().should(function(location){
    //   expect(location.pathname).to.eq('/')
    // })
  })

  it("Tries to connect with wrong password", () => {
    cy.visit('http://localhost:5173/')
    cy.contains("Se connecter").click()
    cy.url().should("include", "/connexion")

    cy.get("#mail").type("antoine.paris@email.com")

    cy.contains("Continuer").click()

    cy.get("#password").type("ParisienSecure")

    cy.contains("button", "Se connecter").click({timeout: 5000})

    cy.contains("Le mot de passe n'est pas valide.")
  })

  it("Tries to connect with wrong mail", () => {
    cy.visit('http://localhost:5173/')
    cy.contains("Se connecter").click()
    cy.url().should("include", "/connexion")

    cy.get("#mail").type("antoine.paris@mail.com")

    cy.contains("Continuer").click()

    cy.contains("Ce mail n'a pas de compte leboncoin associé. Veuillez créer un compte avant de vous connecter.")
  })

  it("Tries to input with wrong mail format", () => {
    cy.visit('http://localhost:5173/')
    cy.contains("Se connecter").click()
    cy.url().should("include", "/connexion")

    cy.get("#mail").type("a")

    cy.contains("Continuer").click()

    cy.contains("Le format du mail n'est pas valide. Veuillez changer d'adresse mail.")
  })
})

