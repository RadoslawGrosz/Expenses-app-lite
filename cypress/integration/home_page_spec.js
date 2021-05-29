describe("The Home Page", () => {
  it("logs in with token", () => {
    const login = "admin";
    const password = "welcome1";
    const token = `Basic ${btoa(`${login}:${password}`)}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    cy.request({
      method: "GET",
      url: "http://localhost:8080/api/user/login",
      headers,
    }).then(() => {
      window.sessionStorage.setItem("token", token);
    });

    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "token")
      .should("contain", token);
  });

  it("successfully loads", () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/");
    cy.get(".main-section__list").children().should("have.length", 7);
  });

  it("filters expenses by min amount", () => {
    cy.get("[data-cy=filter-min-amount]").type(85000);
    cy.get(".main-section__list__item__value").contains("Zakup samochodu");
    cy.get("[data-cy=filter-min-amount]").clear();
  });

  it("filters expenses by max amount", () => {
    cy.get("[data-cy=filter-max-amount]").type(850);
    cy.get(".main-section__list__item__value").contains("Opłaty");
    cy.get("[data-cy=filter-max-amount]").clear();
  });

  it("filters by status", () => {
    cy.get("[data-cy=filter-status]").select("paid");
    cy.get("[data-cy=expense-status]").should("have.value", "paid");
    cy.get("[data-cy=expense-status]").should("not.have.value", "partly-paid");
    cy.get(".main-section__list").children().should("have.length", 4);

    cy.get("[data-cy=filter-status]").select("partly-paid");
    cy.get("[data-cy=expense-status]").should("have.value", "partly-paid");
    cy.get("[data-cy=expense-status]").should("not.have.value", "paid");
    cy.get(".main-section__list").children().should("have.length", 3);

    cy.get("[data-cy=filter-status]").select("all");
    cy.get(".main-section__list").children().should("have.length", 7);
  });

  it("filters expenses by name", () => {
    cy.get("[data-cy=filter-name]").type("rower");
    cy.get(".main-section__list__item__value").contains("rower");
    cy.get("[data-cy=filter-name]").clear();
  });

  // it("adds new expense", () => {
  //   const newExpenseName = "test";
  //   const newExpenseDate = "2021-01-01";
  //   const newExpenseAmount = 1000;

  //   cy.get("[data-cy=add-button]").click();
  //   cy.get("[data-cy=new-expense-name]").type(newExpenseName);
  //   cy.get("[data-cy=new-expense-date]").type(newExpenseDate);
  //   cy.get("[data-cy=new-expense-amount]").type(newExpenseAmount);
  //   cy.get("[data-cy=new-expense-submit]").click();

  //   cy.get(".main-section__list__item__value").contains(newExpenseName);
  //   // .parent()
  //   // .contains("[data-cy=expense-remove]");
  //   // cy.get(".main-section__list__item__value").contains(newExpenseDate);
  // });
});
