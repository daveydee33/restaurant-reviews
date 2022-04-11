describe("E2E Tests", () => {
  it("Register flow", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Login");
    cy.contains("Register").click();
    cy.url().should("include", "/register");

    cy.get("[data-cy=email]")
      .type("cypress@user.com")
      .should("have.value", "cypress@user.com");
    cy.get("[data-cy=password]")
      .type("aaaaaaa1")
      .should("have.value", "aaaaaaa1");

    cy.get("[data-cy=submit]").click();
  });

  it("Register flow", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Login");
    cy.get("[data-cy=email]")
      .type("cypress@user.com")
      .should("have.value", "cypress@user.com");
    cy.get("[data-cy=password]")
      .type("aaaaaaa1")
      .should("have.value", "aaaaaaa1");

    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/restaurants");

    cy.contains("Cypress Test Restaurant").click();

    cy.contains("Restaurant Details");
    cy.contains("Cypress Test Restaurant");

    cy.get(
      ":nth-child(2) > .star-ratings > :nth-child(3) > .widget-svg"
    ).click();

    cy.get("[data-cy=date-picker]").click();
    cy.get(".today").click();

    cy.get("[data-cy=comment]")
      .type("CYPRESS test comment")
      .should("have.value", "CYPRESS test comment");

    cy.get("[data-cy=submit]").click();
  });
});
