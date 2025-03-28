import { render, screen, cleanup } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { server } from "./mocks/server";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "../src/features/Register/components/RegisterForm";

const renderForm = () => {
  render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>,
  );

  return {
    waitForFormToLoad: async () => {
      const form = await screen.findByRole("form");
      return {
        form: form,
        username: screen.getByLabelText(/username/i),
        email: screen.getByLabelText(/email/i),
        password: screen.getByTestId("password"),
        passwordConfirm: screen.getByTestId("passwordConfirm"),
        submitButton: screen.getByRole("button"),
      };
    },
  };
};

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers;
    cleanup();
  });

  afterAll(() => server.close());

  it("should render", async () => {
    const { waitForFormToLoad } = renderForm();

    const { form, username, email, password, passwordConfirm, submitButton } =
      await waitForFormToLoad();

    expect(form).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(passwordConfirm).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent(/submit/i);
  });

  it.each([
    {
      scenario: "missing or too short",
      errorMessage: /at least 3/i,
    },
    {
      scenario: "too long",
      name: "a".repeat(31),
      errorMessage: /more than 30/i,
    },
  ])(
    "should display an error message if the form name is $scenario",
    async ({ name, errorMessage }) => {
      const { waitForFormToLoad } = renderForm();

      const { username, email, password, passwordConfirm, submitButton } =
        await waitForFormToLoad();
      const user = userEvent.setup();
      if (name !== undefined) await user.type(username, name);
      await user.type(email, "user@gmail.com");
      await user.type(password, "Password@123");
      await user.type(passwordConfirm, "Password@123");
      await user.click(submitButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    },
  );

  it("should display an error message if the email is invalid or missing", async () => {
    const { waitForFormToLoad } = renderForm();

    const { username, password, passwordConfirm, submitButton } =
      await waitForFormToLoad();
    const user = userEvent.setup();
    await user.type(username, "user");
    // await user.type(email, "user@gmail.com");
    await user.type(password, "Password@123");
    await user.type(passwordConfirm, "Password@123");
    await user.click(submitButton);

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "missing or too short",
      errorMessage: /at least 8/i,
    },
    {
      scenario: "invalid",
      pass: "a".repeat(9),
      errorMessage:
        /one uppercase letter, one lowercase letter, one number and a special character/i,
    },
  ])(
    "should display an error message if the password is $scenario",
    async ({ pass, errorMessage }) => {
      const { waitForFormToLoad } = renderForm();

      const { username, email, password, passwordConfirm, submitButton } =
        await waitForFormToLoad();
      const user = userEvent.setup();
      await user.type(username, "user");
      await user.type(email, "user@gmail.com");
      if (pass !== undefined) await user.type(password, pass);
      await user.type(passwordConfirm, "Password@123");
      await user.click(submitButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    },
  );

  it("should display an error message if the both passwords do not match", async () => {
    const { waitForFormToLoad } = renderForm();

    const { username, email, password, passwordConfirm, submitButton } =
      await waitForFormToLoad();
    const user = userEvent.setup();
    await user.type(username, "user");
    await user.type(email, "user@gmail.com");
    await user.type(password, "Password@1234");
    await user.type(passwordConfirm, "Password@123");
    await user.click(submitButton);

    expect(
      await screen.findByText(/passwords do not match/i),
    ).toBeInTheDocument();
  });

  it("should display success on submit", async () => {
    const response = await fetch("/register", { method: "POST" });
    const data = await response.json();
    console.log(data);
    expect(data).toMatch(/success/i);
  });
});
