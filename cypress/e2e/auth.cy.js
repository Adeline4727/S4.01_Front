describe('template spec', () => {
  it('Tries to connect', () => {
    cy.visit('http://localhost:5173/')
    cy.contains("Se connecter").click()
    cy.url().should("include", "/connexion")

    cy.get("#mail").type("antoine.paris@email.com")
    cy.get("#mail").should('have.value', 'antoine.paris@email.com')

    cy.contains("Continuer").click()

    cy.contains("#password")
  })
})