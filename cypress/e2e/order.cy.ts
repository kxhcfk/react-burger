describe("Оформление заказа", () => {
    before(() => {
        cy.visit('http://localhost:3000/login');
        cy.viewport(1920, 930);
        
        cy.get('input[name=email]').type(`reveersed@mail.ru`);
        cy.get('input[name=password]').type(`123456{enter}`);
    })
    
    it("Открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»", () => {
        cy.get("[id=bun]").first().find("li").first().trigger("dragstart");
        
        cy.get("[class^=BurgerConstructor_root]").should("exist");
        cy.get("[class^=BurgerConstructor_root]").first().trigger("drop");
        
        cy.get("[class*=constructor-element_pos_top").should("exist");
        cy.get("[class*=constructor-element_pos_bottom]").should("exist");
        
        cy.get("[id=sauce]").first().find("li").first().trigger("dragstart");
        
        cy.get("[class^=BurgerConstructor_root]").should("exist");
        cy.get("[class^=BurgerConstructor_root]").first().trigger("drop");
        
        cy.get("[class^=BurgerConstructorList_list] > li").should("exist");
        
        cy.get("[class^=BurgerConstructor_footer] button").contains("Оформить заказ").click();
        
        cy.get("[class^=OrderDetails_number]", {timeout: 25000}).first().should("exist");
        
        cy.get('[id=modals] [class^=Modal_container] [class^=Modal_close]').click();
        
        cy.get('[id=modals] [class^=Modal_container]').should('not.exist');
        cy.get("[class*=constructor-element_pos_top").should("not.exist");
        cy.get("[class*=constructor-element_pos_bottom]").should("not.exist");
        cy.get("[class^=BurgerConstructorList_list] > li").should("not.exist");
    })
})