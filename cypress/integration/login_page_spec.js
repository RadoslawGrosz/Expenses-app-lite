describe("Login", () => {
  it("log in", () => {
    cy.visit("/login");

    cy.get("input[name=login]").type("admin");
    cy.get("input[name=password]").type(`welcome1{enter}`);

    cy.url().should("include", "/");
    
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "token")
      .should("exist");
  });

  it("log out", () => {
    cy.visit("/");

    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "token")
      .should("exist");

    cy.get("[data-cy=logout-button]").click();

    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "token")
      .should("not.exist");

    cy.url().should("include", "/login");
  });
});
