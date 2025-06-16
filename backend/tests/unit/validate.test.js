import {
  validateRegisterInput,
  validateLoginInput,
  validateTodoInput,
} from "../../utils/validate.js";

describe("Validation Utilities", () => {
  describe("validateRegisterInput()", () => {
    it("should return no errors for valid input", () => {
      const { errors, valid } = validateRegisterInput(
        "testuser",
        "testpass123"
      );
      expect(valid).toBe(true);
      expect(errors).toEqual({});
    });

    it("should return errors for invalid username", () => {
      const { errors, valid } = validateRegisterInput("te", "testpass123");
      expect(valid).toBe(false);
      expect(errors.username).toBeDefined();
    });

    it("should return errors for invalid password", () => {
      const { errors, valid } = validateRegisterInput("testuser", "test");
      expect(valid).toBe(false);
      expect(errors.password).toBeDefined();
    });
  });

  describe("validateLoginInput()", () => {
    it("should return no errors for valid input", () => {
      const { errors, valid } = validateLoginInput("testuser", "testpass123");
      expect(valid).toBe(true);
      expect(errors).toEqual({});
    });

    it("should return errors for missing username", () => {
      const { errors, valid } = validateLoginInput("", "testpass123");
      expect(valid).toBe(false);
      expect(errors.username).toBeDefined();
    });
  });

  describe("validateTodoInput()", () => {
    it("should return no errors for valid input", () => {
      const { errors, valid } = validateTodoInput("Test todo");
      expect(valid).toBe(true);
      expect(errors).toEqual({});
    });

    it("should return errors for empty title", () => {
      const { errors, valid } = validateTodoInput("");
      expect(valid).toBe(false);
      expect(errors.title).toBeDefined();
    });
  });
});
