import React from "react";
import { mount } from "@cypress/react";
import App from "./app";
describe("HelloWorld component", () => {
  it("works", () => {
    mount(<App />);
    // now use standard Cypress commands
    cy.contains("Hello World!").should("be.visible");
  });
});
