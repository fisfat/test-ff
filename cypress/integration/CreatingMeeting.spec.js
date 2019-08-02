describe("MILESTONE-3 -- perspective of a logged-in user creating a meeting and receiving the notes", () => {

  function makestring(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const email = Cypress.env("login_email");
  const phone = Cypress.env("test_phone");
  const digits = Cypress.env("test_digits");
  const duration = 7;
  const title = makestring(10);

  context("Meeting", () => {
    after(() => {
      cy.logout()
    })

    it("should create a meeting", () => {
      const query = `mutation{
          liveMeeting(email: "${email}", phone: "${phone}", digits: "${digits}", duration: ${duration}, title: "${title}")
      }`;
      cy.request({
        method: "POST",
        url: "https://dev.firefliesapp.com/graphql",
        body: { query },
        failOnStatusCode: false,
        headers: {
          Authorization: "Bearer 7437-81ae6f9c61f01a2946c462cd6827decb"
        }
      }).then(res => {
        expect(res.body.data.liveMeeting).to.equals(true);
      });
    });

    it("Should assert the creation of the meeting on the dashboard", () => {
      cy.doLogin();
      cy.get(".live-meeting-holder")
        .first()
        .contains(title);

      cy.visit("/notebook")
        .location("pathname")
        .should("eq", "/notebook")
        .wait(5000)
        .get(".driver-close-only-btn")
        .click()
        .get(".ffnb-custom-card-holder")
        .last()
        .click();

      cy.wait(2000);
      cy.window().then(win => {
        const res = win.MeetingNotes.findOne();
        const args = { insertToMongo: true }
        win.Meteor.call('sendRandomMeeting', null, args, res);
      });
      cy.visit("/notebook")
        .location("pathname")
        .should("eq", "/notebook")
        .wait(5000)
        .get(".ffnb-custom-card-holder")
        .last()
        .click()
    });

    it("Should toggle edit mode", () => {
      cy.get(".toggle-button_20Xvrg")
        .find("span")
        .first()
        .click()
        .should("have.css", "background-color", "rgb(183, 77, 195)").click()
        .should("have.css", "background-color", "rgb(77, 79, 92)")
    })

    it("Should load and play audio", () => {
      cy.get(".sb-soundplayer-icon")
        .find("path")
        .first()
        .should("have.attr", "d", "M0 0 L32 16 L0 32 z")
        .click()
      cy.get(".sb-soundplayer-icon")
        .find("path")
        .first()
        .should("have.attr", "d", "M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z").click({ force: true })
    })

    it("should delete meeting forever", () => {
      cy.get(".ff-icon-delete").first().click()
      cy.get("#menu-list").last().find('li').first().click({ force: true });
    })
  });
});

// when showing pause: M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z
// when showing play: M0 0 L32 16 L0 32 z