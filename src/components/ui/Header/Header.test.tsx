// ----- UTILITY ----- //
import { render, screen } from "@testing-library/react";
// ----- COMPONENT ----- //
import Header from "./index";
// ----- ----- //

describe("Header", () => {
	const defaultProps = {
		collectedTreasures: 4,
		winMessage: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	//Tests if the header renders with the correct logo image and alt text
	test("-> Affiche du logo avec le bon alt.", () => {
		render(<Header {...defaultProps} />);

		const logoImage = screen.getByAltText(
			"Carte au fond bleu avec une montagne en son centre, accompagné par deux mots Carbon et Adventure à côté."
		);

		expect(logoImage).toBeInTheDocument();
	});

	// Tests if the Banner component is rendered with the correct props
	test("-> Affiche la bannière avec les bonnes props.", () => {
		render(<Header {...defaultProps} />);

		const banner = screen.getByText(/💰/i);

		expect(banner).toBeInTheDocument();
	});

	// Tests if the PrimaryButton is rendered with the correct text and link
	// Here I can use getByText because I never expect another button "Lien live 🧷" to be rendered
	test("-> Affiche le bouton principal avec le bon texte et lien/attributs.", () => {
		render(<Header {...defaultProps} />);

		const button = screen.getByText("Lien live 🧷");
		const link = screen.getByRole("link", { name: /lien live/i });

		expect(button).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "https://arthuroberlin.fr/carbon");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	// Tests if the winMessage prop affects the rendering of the Banner component
	test("-> Affiche le message de victoire si winMessage.", () => {
		render(<Header {...defaultProps} winMessage={true} />);

		const banner = screen.getByText(/Bien joué 🤠🌴/i);

		expect(banner).toBeInTheDocument();
	});
});
