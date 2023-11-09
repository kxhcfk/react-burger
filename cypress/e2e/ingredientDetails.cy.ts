describe("Детали игредиента", () => {
    before(() => {
        cy.visit('http://localhost:3000/react-burger');
        cy.viewport(1920, 930);
    })
    
    it("Открытие модального окна по клику", () => {
        cy.get('[id=bun]').first().find('li').first().click();
        
        cy.get('[id=modals] [class^=Modal_container]').should('exist');
        cy.get('[id=modals] [class^=Modal_container] h2').contains('Детали ингредиента');
        
        cy.get('[id=modals] [class^=Modal_container] [class^=Modal_close]').click();
        
        cy.get('[id=modals] [class^=Modal_container]').should('not.exist');
    })
})