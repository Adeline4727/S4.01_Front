describe('Home page', () => {
  it('Scroll carousel', () => {
    cy.visit('http://localhost:5173/')
    cy.get(".carrousel").find(".Card").should("have.length", 6)

    cy.get(".carrousel").scrollTo(850)

    cy.get(".bouton-voir-plus-container").click()
    cy.get(".carrousel").find(".Card").should("have.length", 12)
  })
})