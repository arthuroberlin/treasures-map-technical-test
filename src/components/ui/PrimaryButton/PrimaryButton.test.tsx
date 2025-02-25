// ----- UTILITY ----- //
import { render, screen } from "@testing-library/react";
// ----- COMPONENT ----- //
import PrimaryButton from "./index";
// ----- ----- //

describe("PrimaryButton", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Tests if the button is rendered with the correct text
	test("-> Affiche le texte correctement.", () => {
		render(<PrimaryButton>Je suis un bouton de test.</PrimaryButton>);

		const button = screen.getByText("Je suis un bouton de test.");

		expect(button).toBeInTheDocument();
	});

	// Tests if the button renders an icon when provided
	test("-> Affiche l'icône quand elle est fournie.", () => {
		const Icon = () => (
			<span role="img" aria-label="icon-test-primaryButton">
				🌴
			</span>
		);

		render(<PrimaryButton icon={<Icon />}>Je suis un bouton de test.</PrimaryButton>);

		const icon = screen.getByLabelText("icon-test-primaryButton");
		expect(icon).toBeInTheDocument();
	});
});
