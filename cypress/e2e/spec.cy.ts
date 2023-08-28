describe('OMDB API Page', () => {
  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
    });

    it('opens episode panel', () => {
      cy.visit('https://app-dir-test-one.vercel.app/');

      cy.contains('John Chinaman').click();

      cy.url().should('include', '/episode');
      cy.contains('19 Apr 2019');
    });

    it('scrolls through the episodes', () => {
      cy.visit('https://app-dir-test-one.vercel.app/');

      cy.get('[aria-label="Slide Left"]').should('be.disabled');
      cy.get('[aria-label="Slide Right"]').click().click().click();
      cy.get('[aria-label="Slide Right"]').should('be.disabled');
      cy.get('[aria-label="Slide Left"]').click().click().click();
      cy.get('[aria-label="Slide Left"]').should('be.disabled');
    });
  });
});
