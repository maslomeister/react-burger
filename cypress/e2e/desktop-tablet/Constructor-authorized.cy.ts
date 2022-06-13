describe("Desktop constructor E2E authorized tests", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.session(
      "logged-in",
      () => {
        cy.visit("/login");
        cy.get('input[name="email"]').type(Cypress.env("email"));
        cy.get('input[name="password"]').type(Cypress.env("password"));
        cy.get('button[type="submit').click();

        cy.url().should("contain", "/");

        cy.wait(1500);

        cy.getCookie("accessToken").get("value").should("not.be.empty");
        cy.getCookie("refreshToken").get("value").should("not.be.empty");
      },
      {
        validate() {
          cy.getCookie("accessToken").get("value").should("not.be.empty");
          cy.getCookie("refreshToken").get("value").should("not.be.empty");
        },
      }
    );
    cy.visit("/");
  });

  it("Should be able to place order", () => {
    cy.get('[data-testid="60d3b41abdacab0026a733c6"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.get('[data-testid="60d3b41abdacab0026a733cd"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.get("button").contains("Оформить заказ").click();

    cy.get('[data-testid="placed-order-number"]', { timeout: 30000 }).should(
      "be.visible"
    );

    cy.get('[data-testid="modal-close-icon"]').click();
  });
});
