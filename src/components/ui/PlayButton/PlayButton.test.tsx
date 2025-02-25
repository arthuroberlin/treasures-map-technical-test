// ----- UTILITY ----- //
import { render, screen, fireEvent } from "@testing-library/react";
// ----- COMPONENT ----- //
import PlayButton from "./index";
// ----- ----- //

describe("PlayButton", () => {
	const mockPlayTheGame = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Tests if the button is rendered with the correct text
	test("-> Affiche le texte correctement.", () => {
		render(<PlayButton playTheGame={mockPlayTheGame}>Jouer</PlayButton>);

		const button = screen.getByTestId("play-button");

		expect(button).toBeInTheDocument();
	});

	// Tests if the button calls the function playTheGame() when clicked
	test("-> Appelle la function playTheGame() quand cliqué.", () => {
		render(<PlayButton playTheGame={mockPlayTheGame}>Play</PlayButton>);

		const button = screen.getByTestId("play-button");

		fireEvent.click(button);
		expect(mockPlayTheGame).toHaveBeenCalledTimes(1);
	});
});
