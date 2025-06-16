describe("Todo App", () => {
  beforeEach(() => {
    // Mock API responses
    cy.intercept("POST", "/api/auth/login", {
      statusCode: 200,
      body: {
        token: "fake-jwt-token",
        result: { username: "testuser" },
      },
    }).as("login");

    cy.intercept("GET", "/api/todos", {
      statusCode: 200,
      body: [],
    }).as("getTodos");

    cy.intercept("POST", "/api/todos", {
      statusCode: 201,
      body: { _id: "1", title: "Test Todo", completed: false },
    }).as("createTodo");

    cy.intercept("PATCH", "/api/todos/1", {
      statusCode: 200,
      body: { _id: "1", title: "Test Todo", completed: true },
    }).as("updateTodo");

    cy.intercept("DELETE", "/api/todos/1", {
      statusCode: 200,
      body: { success: true },
    }).as("deleteTodo");
  });

  it("should perform full CRUD operations", () => {
    // Login
    cy.visit("/login");
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="password"]').type("testpass");
    cy.get('button[type="submit"]').click();

    // Create todo
    cy.get('input[placeholder="Add a new todo"]').type("Test Todo{enter}");
    cy.wait("@createTodo");
    cy.contains("Test Todo").should("exist");

    // Mark as completed
    cy.contains("Mark Done").click();
    cy.wait("@updateTodo");
    cy.contains("✓ Done").should("exist");

    // Delete todo
    cy.contains("Delete").click();
    cy.wait("@deleteTodo");
    cy.contains("Test Todo").should("not.exist");
  });
});
