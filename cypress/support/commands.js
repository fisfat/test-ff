Cypress.Commands.add("doLogin", () => {
  cy.visit("/login");

  const email = Cypress.env("login_email");
  const password = Cypress.env("login_password");
  cy.window().then(win => {
    win.Accounts.ui.config({
      passwordSignupFields: "EMAIL_ONLY",
      requireEmailVerification: false
    });
  });
  cy.get(".hidden-login")
    .should("be.hidden")
    .invoke("addClass", "show-login")
    .should("be.visible")
    .find(".accounts-ui")
    .invoke("addClass", "show-login");
  cy.get("#email").type(email);
  cy.get("#password")
    .type(password)
    .type("{enter}");

  /**
   * close popups
   *
   * This might not be needed subsequently*
   */
  cy.location("pathname").should("eq", "/");
  cy.wait(1000);
  cy.get(".close-dialog").click();
  cy.wait(1000);
  cy.get(".driver-close-only-btn").click();

  /**
   * confirm we are on dashboard
   */
  cy.get(".xs-12")
    .find(".sub-title")
    .should(
      "have.html",
      "Fireflies can join calendar meetings that have a web-conferencing dial-in"
    );
});

Cypress.Commands.add('logout', () => {
  cy.visit("/login").location("pathname")
    .should("eq", "/login")
})
