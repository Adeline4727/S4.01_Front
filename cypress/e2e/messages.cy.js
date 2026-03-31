describe('Messages logged out', () => {
  it('Visits Leboncoin home page and click on messages button', () => {
    cy.visit('http://localhost:5173/')
    cy.contains("Messages").click()
    cy.url().should("include", "/connexion?redirect=/messages")
  })
})