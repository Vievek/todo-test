/**
 * Validates user registration input
 * @param {string} username - Username to validate
 * @param {string} password - Password to validate
 * @returns {Object} { errors: Object, valid: boolean }
 */
export const validateRegisterInput = (username, password) => {
  const errors = {};

  // Username validation
  if (!username || username.trim() === "") {
    errors.username = "Username is required";
  } else if (username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  } else if (username.length > 20) {
    errors.username = "Username must be less than 20 characters";
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.username =
      "Username can only contain letters, numbers, and underscores";
  }

  // Password validation
  if (!password || password.trim() === "") {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  } else if (password.length > 50) {
    errors.password = "Password must be less than 50 characters";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

/**
 * Validates user login input
 * @param {string} username - Username to validate
 * @param {string} password - Password to validate
 * @returns {Object} { errors: Object, valid: boolean }
 */
export const validateLoginInput = (username, password) => {
  const errors = {};

  if (!username || username.trim() === "") {
    errors.username = "Username is required";
  }

  if (!password || password.trim() === "") {
    errors.password = "Password is required";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

/**
 * Validates todo input
 * @param {string} title - Todo title to validate
 * @returns {Object} { errors: Object, valid: boolean }
 */
export const validateTodoInput = (title) => {
  const errors = {};

  if (!title || title.trim() === "") {
    errors.title = "Todo title is required";
  } else if (title.length > 100) {
    errors.title = "Todo title must be less than 100 characters";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};
