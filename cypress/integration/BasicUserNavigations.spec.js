describe("MILESTONE-2 -- Test for the dashboard from the perspective of a logged-in user performing common navigation actions", () => {
  context("Teammate Invitation", () => {
    const invite_email = Cypress.env("invite_email");
    before(() => {
      cy.doLogin();
    });
    it("should send teammate invite", () => {
      cy.get(".upscentral-button-separator")
        .find(".invite-teammates")
        .should("have.text", "Invite Teammates")
        .click();

      cy.get(".team-wrapper")
        .find("h3")
        .first()
        .should("have.text", "Invite Teammates "); //mind the space

      cy.get(".invite-input-container")
        .find(".email-input")
        .should("have.value", "")
        .type(invite_email)
        .get(".name-input")
        .should("have.value", "")
        .type("Oluwafisayo")
        .get("#send")
        .find(".shared-ui-button_1RE5sx")
        .should("have.text", "sendSend Invitations") //mind the sendSend. not a typo. trying to parse the icon.
        .click()
        // .find(".shared-ui-button_1RE5sx")
        .should("have.text", "sendSending...") //mind the sendSending... not a typo. trying to parse the icon.
        .wait(100)
        .get(".add-members-container")
        .should("have.text", "checkInvitations Sent Successfully"); //mind the checkInvitations. not a typo. trying to parse the icon.
    });

    it("Should remove an input row", () => {
      cy.get("input")
        .first()
        .should("be.visible")
        .get(".invite-row-container")
        .find(".remove-input")
        .click()
        .get("form")
        .first()
        .should("not.have", "input");
    });

    it("Should add an input row", () => {
      cy.get("#add")
        .click()
        .get(".email-input")
        .should("be.visible")
        .and("have.value", "")
        .get(".name-input")
        .should("be.visible")
        .and("have.value", "");
    });

    // it("Should copy invite url into clipboard", () => {
    //   cy.get(".clipboard").click();
    //   // const text = window.clipboardData.getData("Text");
    //   cy.window().then(win => {
    //     cy.log(win.clipboardData.getData("Text")); //This fails because of cypress policy.
    //   });
    // });
  });

  context("Categories Actions", () => {
    before(() => {
      cy.doLogin();
    });

    it("Should create a category and keywords", () => {
      cy.visit("/categories");
      cy.location("pathname").should("eq", "/categories");

      cy.get("#outlined-bare")
        .type("Business")
        .get("#property-chip")
        .type("Meeting")
        // .type("{enter}")
        .get("#outlined-bare")
        .invoke("val", "Business")
        .get("#property-chip")
        .invoke("val", "meeting");
      //considered incomplete because dom disapears
    });

    it("Should remove category", () => {
      cy.get(".property-name")
        .should("have.text", "Sample terms")
        .find("svg")
        .invoke("show")
        .click();
    });
  });
});
