// https://docs.cypress.io/api/introduction/api.html

const login = () => {
  cy.visit("/");
  cy.get("input[type=email]").type("user@gmail.com"); // Type 'Hello, World' into the 'input'
  cy.get("input[type=password]").type("haha123"); // Type 'Hello, World' into the 'input'
  cy.get(".button").click();
};

// let UPLOAD_BUTTON_TEXT = "Click to upload";

let LOCAL_STORAGE_MEMORY = {};
Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

describe("Testing flows", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Can add scar from root", () => {
    login();
    cy.wait(1000);
    cy.visit("http://localhost:8080/");
    cy.get(".button.is-primary").click();
    // open the calendar
    cy.get('input[type="text"]').click();
    cy.get("a.datepicker-cell")
      .first()
      .click();

    // TODO add test for body-site

    // TODO finish the select multiple tests=
    // cy.get("select.conditions").select("Arnold-Chiari malformations");
    // cy.get("select.causes").select("Arnold-Chiari malformations");

    // next tab
    cy.get("button")
      .contains("Next")
      .click();

    cy.get(".vue-slider-dot-handle").click({
      multiple: true
    });

    // next tab
    cy.get("button")
      .contains("Next")
      .click();

    //TODO finish the image upload test
  });
});
