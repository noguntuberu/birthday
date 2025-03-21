import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../src/Register/components/RegisterForm";

const renderForm = () => {
	render(<RegisterForm />);

	return {
		waitForFormToLoad: () => screen.findByRole("form"),
		getInput: () => {
			return {
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
	afterEach(() => {
		cleanup();
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render", async () => {
		const { waitForFormToLoad, getInput } = renderForm();

		const form = await waitForFormToLoad();
		const { username, email, password, passwordConfirm, submitButton } =
			getInput();

		expect(form).toBeInTheDocument();
		expect(screen.getByText(/register/i)).toBeInTheDocument();
		expect(username).toBeInTheDocument();
		expect(email).toBeInTheDocument();
		expect(password).toBeInTheDocument();
		expect(passwordConfirm).toBeInTheDocument();

		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toHaveTextContent(/submit/i);
	});

	it("should display an error message if the form name is missing", async () => {
		const { waitForFormToLoad, getInput } = renderForm();

		await waitForFormToLoad();
		const user = userEvent.setup();
		const { email, password, passwordConfirm, submitButton } = getInput();
		// await user.type(username, "user");
		await user.type(email, "user@gmail.com");
		await user.type(password, "Password@123");
		await user.type(passwordConfirm, "Password@123");
		await user.click(submitButton);

		expect(
			await screen.findByText(/username must be at least 3 characters/i)
		).toBeInTheDocument();
	});

	it("should display an error message if the email is invalid", async () => {
		const { waitForFormToLoad, getInput } = renderForm();

		await waitForFormToLoad();
		const user = userEvent.setup();
		const { username, password, passwordConfirm, submitButton } = getInput();
		await user.type(username, "user");
		// await user.type(email, "user@gmail.com");
		await user.type(password, "Password@123");
		await user.type(passwordConfirm, "Password@123");
		await user.click(submitButton);

		expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
	});

	it("should display an error message if the password is missing", async () => {
		const { waitForFormToLoad, getInput } = renderForm();

		await waitForFormToLoad();
		const user = userEvent.setup();
		const { username, email, passwordConfirm, submitButton } = getInput();
		await user.type(username, "user");
		await user.type(email, "user@gmail.com");
		// await user.type(password, "Password@123");
		await user.type(passwordConfirm, "Password@123");
		await user.click(submitButton);

		expect(
			await screen.findByText(/password must be at least 8 characters/i)
		).toBeInTheDocument();
	});

	it("should display an error message if the both passwords do not match", async () => {
		const { waitForFormToLoad, getInput } = renderForm();

		await waitForFormToLoad();
		const user = userEvent.setup();
		const { username, email, password, passwordConfirm, submitButton } =
			getInput();
		await user.type(username, "user");
		await user.type(email, "user@gmail.com");
		await user.type(password, "Password@1234");
		await user.type(passwordConfirm, "Password@123");
		await user.click(submitButton);

		expect(
			await screen.findByText(/passwords do not match/i)
		).toBeInTheDocument();
	});
});
