describe('Home page', () => {
  it('Scrolls carousel', () => {
    cy.visit('http://localhost:5173/')
    cy.get(".carrousel").find(".Card").should("have.length", 6)

    cy.get(".carrousel").scrollTo(850)

    cy.get(".bouton-voir-plus-container").click()
    cy.get(".carrousel").find(".Card").should("have.length", 12)
  })

  it("Goes to login page and click on leboncoin icon", () => {
    cy.visit('http://localhost:5173/connexion')
    cy.get(".logo").click()

    cy.url().should("eq", "http://localhost:5173/")
  })
})