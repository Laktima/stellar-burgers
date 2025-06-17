import { contains } from "cypress/types/jquery";

describe('проверяем конструктор', function() {
    this.beforeEach(() => {
        cy.intercept('get', 'api/ingredients', { fixture: 'ingredients'});
        cy.intercept('post', 'api/orders', { fixture: 'order'});
        cy.setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTE1ZTllYzJmMzBjMDAxY2IyZDUyNiIsImlhdCI6MTc1MDE2NjA0MywiZXhwIjoxNzUwMTY3MjQzfQ.idF4qQRP6ytwCfoLW33PA5tPzeGhIbJeYvWpy9L05aA');
        cy.visit('http://localhost:4000'); 
    })

    it('В конструктор долженs добавиться ингредиентs и булка', () => {
        cy.get(`[data-cy='ingredient-643d69a5c3f7b9001cfa093e']`).contains('Добавить').click();
        cy.get(`[data-cy='constructor-ingredients']`).contains('Филе Люминесцентного тетраодонтимформа');
         
        cy.get(`[data-cy='ingredient-643d69a5c3f7b9001cfa0940']`).contains('Добавить').click();
        cy.get(`[data-cy='constructor-ingredients']`).contains('Говяжий метеорит (отбивная)');

        cy.get(`[data-cy='ingredient-643d69a5c3f7b9001cfa093c']`).contains('Добавить').click();
        cy.get(`[data-cy='top-bun-643d69a5c3f7b9001cfa093c']`).contains('Краторная булка N-200i');
        cy.get(`[data-cy='bottom-bun-643d69a5c3f7b9001cfa093c']`).contains('Краторная булка N-200i');

    });

    it('Должно открывыться соответствующее модальное окно ингредиента и закрываться', () => {
        cy.get(`[data-cy='ingredient-643d69a5c3f7b9001cfa093e']`).contains('Филе Люминесцентного тетраодонтимформа').click();
        cy.get(`[data-cy='modal']`).should('exist');
        cy.get(`[data-cy='modal']`).contains('Филе Люминесцентного тетраодонтимформа');

        cy.get(`[data-cy='modal-close-button']`).click();
        cy.get(`[data-cy='modal']`).should('not.exist');
    })

    it('Процесс создания заказа отрабатывает с соответствующим модальным окном', () => {
        cy.get(`[data-cy='ingredient-643d69a5c3f7b9001cfa093e']`).contains('Добавить').click();
        cy.get(`[data-cy='constructor-ingredients']`).contains('Филе Люминесцентного тетраодонтимформа');
         
        cy.get(`[data-cy='ingredient-643d69a5c3f7b9001cfa0940']`).contains('Добавить').click();
        cy.get(`[data-cy='constructor-ingredients']`).contains('Говяжий метеорит (отбивная)');

        cy.get(`[data-cy='ingredient-643d69a5c3f7b9001cfa093c']`).contains('Добавить').click();
        cy.get(`[data-cy='top-bun-643d69a5c3f7b9001cfa093c']`).contains('Краторная булка N-200i');
        cy.get(`[data-cy='bottom-bun-643d69a5c3f7b9001cfa093c']`).contains('Краторная булка N-200i');

        cy.get(`[data-cy='order-button']`).contains('Оформить заказ').click();
        cy.get(`[data-cy='modal']`).should('exist');
        cy.get(`[data-cy='modal']`).contains('0001');
        cy.get(`[data-cy='modal-close-button']`).click();

        cy.get(`[data-cy='constructor-section']`).contains('Выберите булки');
        cy.get(`[data-cy='constructor-section']`).contains('Выберите начинку');
    })
});