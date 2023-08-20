describe("Drag and drop", () => {
    before(() => {
        cy.visit("http://localhost:3000/");
        cy.viewport(1920, 930);
    });
    
    it("Создание бургера", () => {
        cy.get("[id=bun]").first().find("li").first().trigger("dragstart");
        
        cy.get("[class^=BurgerConstructor_root]").first().should("exist");
        cy.get("[class^=BurgerConstructor_root]").first().trigger("drop");
        
        cy.get("[class*=constructor-element_pos_top").first().should("exist");
        cy.get("[class*=constructor-element_pos_bottom]").first().should("exist");
        
        cy.get("[id=sauce]").first().find("li").first().trigger("dragstart");
        
        cy.get("[class^=BurgerConstructor_root]").first().should("exist");
        cy.get("[class^=BurgerConstructor_root]").first().trigger("drop");
        
        cy.get("[class^=BurgerConstructorList_list] > li").first().should("exist");
    });
});