describe('Appointments page', () => {
  before(() => {
    cy.visit('/appointments');
  });

  it('can see the appointment form', () => {
    cy.pick('appointment-form').should('be.visible');
  });

  it('should have empty fields at init', () => {
    cy.visit('/appointments');
    cy.get("[datacy='practitioners-list'] input").should('contain', '');
    cy.get("[datacy='patients-list'] input").should('contain', '');
    cy.get("[datacy='availabilities-list'] input").should('contain', '');
    cy.pick('practitioners-required').should('not.exist');
    cy.pick('patients-required').should('not.exist');
    cy.pick('availabilities-required').should('not.exist');
  });

  it('should not have required field message for all fields when clicking on create appointment with a filled form', () => {
    cy.get('#practitionerList').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#patientList').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#availabilitiesList').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.pick('appointment-creation-button').click();
    cy.pick('practitioners-required').should('not.exist');
    cy.pick('patients-required').should('not.exist');
    cy.pick('availabilities-required').should('not.exist');
  });

  it('should have required field message for all fields when clicking on create appointment with a void form', () => {
    cy.visit('/appointments');
    cy.pick('appointment-creation-button').click();
    cy.pick('practitioners-required').should('exist');
    cy.pick('patients-required').should('exist');
    cy.pick('availabilities-required').should('exist');
  });

  it('should not have availabilities without a practitioner', () => {
    cy.visit('/appointments');
    cy.get('#availabilitiesList').click();
    cy.get('.MuiList-root > [tabindex="0"]').should('not.exist');
  });

  it('should init availabilities when picking a practitioner', () => {
    cy.visit('/appointments');
    cy.get('#practitionerList').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#availabilitiesList').click();
    cy.get('.MuiList-root > [tabindex="0"]').should('exist');
  });

  it('can see the appointment list', () => {
    cy.pick('appointment-list').should('be.visible');
  });

  it('should create an appointment when all fields are filled and clicking button', () => {
    cy.request('DELETE', 'http://localhost:8080/appointments');
    cy.visit('/appointments');
    cy.get('#practitionerList').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#patientList').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#availabilitiesList').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.pick('appointment-creation-button').click();
    cy.pick('appointment-card').should('be.visible');
    cy.pick('appointment-card-date')
      .should('be.visible')
      .and('contain', '02/08/2021 08:00 - 08:15');
    cy.pick('appointment-card-practitioner')
      .should('be.visible')
      .and('contain', 'practitioner1 maiia');
    cy.pick('appointment-card-patient')
      .should('be.visible')
      .and('contain', 'patient_1 maiia');
  });
});
