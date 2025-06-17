import { renderHook, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";
import api from "../services/api"; // Adjust path if needed

// Proper localStorage mock implementation
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const wrapper = ({ children }) => (
  <MemoryRouter>
    <AuthProvider>{children}</AuthProvider>
  </MemoryRouter>
);

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides initial auth context with loading true", async () => {
    vi.spyOn(api, "get").mockResolvedValueOnce({ data: null });

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("successfully logs in a user", async () => {
    const mockUser = { id: 1, username: "testuser" };
    const mockToken = "abc123";

    vi.spyOn(api, "post").mockResolvedValueOnce({
      data: {
        token: mockToken,
        result: mockUser,
      },
    });

    vi.spyOn(api, "get").mockResolvedValueOnce({ data: null });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.login({
        username: "testuser",
        password: "password123",
      });
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "token",
      mockToken
    );
    expect(api.post).toHaveBeenCalledWith("/api/auth/login", {
      username: "testuser",
      password: "password123",
    });
  });

  it("successfully logs out a user", async () => {
    const mockUser = { id: 1, username: "testuser" };
    const mockToken = "abc123";

    vi.spyOn(api, "post").mockResolvedValueOnce({
      data: {
        token: mockToken,
        result: mockUser,
      },
    });

    vi.spyOn(api, "get").mockResolvedValueOnce({ data: null });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.login({
        username: "testuser",
        password: "password123",
      });
    });

    expect(result.current.user).toEqual(mockUser);

    await act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBe(null);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith("token");
  });

  it("handles login errors", async () => {
    vi.spyOn(api, "post").mockRejectedValueOnce({
      response: {
        data: { message: "Invalid credentials" },
        status: 401,
      },
    });

    vi.spyOn(api, "get").mockResolvedValueOnce({ data: null });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.login({
        username: "wronguser",
        password: "wrongpass",
      });
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Invalid credentials");
    });

    expect(result.current.user).toBe(null);
  });
});
