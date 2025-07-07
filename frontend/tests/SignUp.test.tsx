import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUp from "../src/pages/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { signUpTraditional } from "../src/services/apiAuth";

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

jest.mock("../src/services/apiAuth", () => ({
  signUpTraditional: jest.fn(),
}));

describe("Sign Up Form", () => {
  test("renders without crashing", () => {
    renderWithClient(<SignUp />);
    expect(screen.getByPlaceholderText("Enter your username"));
    expect(screen.getByPlaceholderText("Enter your email"));
    expect(screen.getByPlaceholderText("Re-enter your email"));
    expect(screen.getByPlaceholderText("Enter your password"));
    expect(screen.getByPlaceholderText("Re-enter your password"));
    expect(screen.getByText("Sign Up"));
    expect(screen.getByText("Other sign up options:"));
  });

  test("submits when all fields are valid", async () => {
    renderWithClient(<SignUp />);

    const usernameInput = screen.getByPlaceholderText(
      "Enter your username"
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "Enter your email"
    ) as HTMLInputElement;
    const emailConfirmInput = screen.getByPlaceholderText(
      "Re-enter your email"
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Enter your password"
    ) as HTMLInputElement;
    const passwordConfirmInput = screen.getByPlaceholderText(
      "Re-enter your password"
    ) as HTMLInputElement;

    fireEvent.change(usernameInput, {
      target: { value: "DuoSprintUser" },
    });
    fireEvent.change(emailInput, {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(emailConfirmInput, {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "gabagool12" },
    });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "gabagool12" },
    });
    fireEvent.click(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(signUpTraditional).toHaveBeenCalledWith({
        username: "DuoSprintUser",
        email: "newUser@duosprint.com",
        emailConfirm: "newUser@duosprint.com",
        password: "gabagool12",
        passwordConfirm: "gabagool12",
        authProvider: "local",
      });
    });

    expect(usernameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(emailConfirmInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(passwordConfirmInput.value).toBe("");
  });

  test("does not submit if username is empty", () => {
    renderWithClient(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your email"), {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "gabagool12" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
      target: { value: "gabagool12" },
    });
    fireEvent.click(screen.getByText("Sign Up"));
    expect(screen.getByText("One of the fields is empty!"));
  });

  test("does not submit if email is empty", () => {
    renderWithClient(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "DuoSprintUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your email"), {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "gabagool12" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
      target: { value: "gabagool12" },
    });
    fireEvent.click(screen.getByText("Sign Up"));
    expect(screen.getByText("One of the fields is empty!"));
  });

  test("does not submit if emailConfirm is empty", () => {
    renderWithClient(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "DuoSprintUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "gabagool12" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
      target: { value: "gabagool12" },
    });
    fireEvent.click(screen.getByText("Sign Up"));
    expect(screen.getByText("One of the fields is empty!"));
  });

  test("does not submit if password is empty", () => {
    renderWithClient(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "DuoSprintUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your email"), {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
      target: { value: "gabagool12" },
    });
    fireEvent.click(screen.getByText("Sign Up"));
    expect(screen.getByText("One of the fields is empty!"));
  });

  test("does not submit if passwordConfirm is empty", () => {
    renderWithClient(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "DuoSprintUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your email"), {
      target: { value: "newUser@duosprint.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "gabagool12" },
    });

    fireEvent.click(screen.getByText("Sign Up"));
    expect(screen.getByText("One of the fields is empty!"));
  });
});
