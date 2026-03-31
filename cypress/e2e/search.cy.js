describe('Search', () => {
  it('Search for a property with city', () => {
    cy.visit('http://localhost:5173/')

    cy.get(".search-container input").type("Pari")

    cy.contains("(75001)").click()

    cy.get(".search-container input").should("have.value", "Paris")

    cy.get(".btn-loupe").click()

    cy.url().should("include", "/recherche/")
    cy.contains("6 annonces")
  })
})