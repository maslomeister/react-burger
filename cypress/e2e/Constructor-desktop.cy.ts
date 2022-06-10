describe("App desktop constructor E2E tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1280, 720);
  });

  it("Should open and close ingredient info modal", () => {
    cy.get('[data-testid="60d3b41abdacab0026a733c6"]').click();

    cy.get('[data-testid="modal-close-icon"]', { timeout: 1000 }).should(
      "be.visible"
    );

    cy.get('[data-testid="modal-close-icon"]').click();

    cy.get('[data-testid="modal-close-icon"]').should("not.exist");
  });

  it("Should drop bun to constructor and then remove it", () => {
    cy.get('[data-testid="60d3b41abdacab0026a733c6"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.get('[data-testid="top60d3b41abdacab0026a733c6"]').should("be.visible");

    cy.get('[data-testid="top60d3b41abdacab0026a733c6"]')
      .find('*[class^="constructor-element__action"]')
      .click();

    cy.get('[data-testid="top60d3b41abdacab0026a733c6"]').should("not.exist");
  });

  it("Should drop ingredient to constructor and remove it", () => {
    cy.get('[data-testid="60d3b41abdacab0026a733cd"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.get('[data-testid="inner60d3b41abdacab0026a733cd"]').should(
      "be.visible"
    );

    cy.get('[data-testid="inner60d3b41abdacab0026a733cd"]')
      .find('*[class^="constructor-element__action"]')
      .click();

    cy.get('[data-testid="inner60d3b41abdacab0026a733cd"]').should("not.exist");
  });

  it("Should place order if user is not logged in", () => {
    cy.get('[data-testid="60d3b41abdacab0026a733c6"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.get('[data-testid="top60d3b41abdacab0026a733c6"]').should("be.visible");

    cy.get('[data-testid="60d3b41abdacab0026a733cd"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.get('[data-testid="inner60d3b41abdacab0026a733cd"]').should(
      "be.visible"
    );

    cy.log(Cypress.env("username"));

    cy.get('[data-testid="place-order"]').click();

    cy.get('input[name="email"]').type(Cypress.env("email"));
    cy.get('input[name="password"]').type(Cypress.env("password"));

    cy.get('button[type="submit').click();

    cy.get('[data-testid="place-order"]').click();

    cy.get('[data-testid="placed-order-number"]', { timeout: 30000 }).should(
      "be.visible"
    );

    cy.get('[data-testid="modal-close-icon"]').click();
  });

  // it("Should place order if user is logged in", () => {
  //   cy.get('[data-testid="60d3b41abdacab0026a733c6"]').drag(
  //     '[data-testid="constructor-drop-target"]'
  //   );

  //   cy.get('[data-testid="top60d3b41abdacab0026a733c6"]').should("be.visible");

  //   cy.get('[data-testid="60d3b41abdacab0026a733cd"]').drag(
  //     '[data-testid="constructor-drop-target"]'
  //   );

  //   cy.get('[data-testid="inner60d3b41abdacab0026a733cd"]').should(
  //     "be.visible"
  //   );

  //   cy.log(Cypress.env("username"));

  //   cy.get('[data-testid="place-order"]').click();

  //   cy.get('[data-testid="placed-order-number"]', { timeout: 30000 }).should(
  //     "be.visible"
  //   );

  //   cy.get('[data-testid="modal-close-icon"]').click();
  // });
});