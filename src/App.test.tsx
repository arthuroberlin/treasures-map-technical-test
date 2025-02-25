// ----- UTILITY ----- //
import { render, screen, fireEvent, act } from "@testing-library/react";
// ----- COMPONENT ----- //
import App from "./App";
// ----- SCENARIOS ----- //
import { Scenarios } from "./scenarios";
// ----- ----- //

describe("App Component", () => {
	// Test game commands
	test("-> Tous les commandes du jeu sont rendus.", () => {
		render(<App />);

		for (let i = 0; i < Scenarios.length; i++) {
			const loadScenarioButton = screen.getByTestId(`load-scenario-button-${i}`);
			expect(loadScenarioButton).toBeInTheDocument();
		}

		expect(screen.getByTestId("play-button")).toBeInTheDocument();
	});

	// Test the function handleAddAventurer() and handleToggleAdventurerList() to verify that the adventurer is added and the form is reset when the button "Ajouter l'aventurier" is clicked
	test("-> La fonction handleAddAventurer() ajoute un aventurier et réinitialise le formulaire.", () => {
		render(<App />);

		const nameInput = screen.getByTestId("adventurer-name-input") as HTMLInputElement;
		const xInput = screen.getByTestId("adventurer-x-input") as HTMLInputElement;
		const yInput = screen.getByTestId("adventurer-y-input") as HTMLInputElement;
		const orientationInput = screen.getByTestId("adventurer-orientation-input") as HTMLInputElement;
		const sequenceInput = screen.getByTestId("adventurer-sequence-input") as HTMLInputElement;
		const addAdventurerInput = screen.getByTestId("add-adventurer-input") as HTMLInputElement;

		fireEvent.change(nameInput, { target: { value: "Arthur Jones" } });
		fireEvent.change(xInput, { target: { value: "3" } });
		fireEvent.change(yInput, { target: { value: "6" } });
		fireEvent.change(orientationInput, { target: { value: "N" } });
		fireEvent.change(sequenceInput, { target: { value: "AGGDASD" } });
		fireEvent.click(addAdventurerInput);

		const toggleButton = screen.getByTestId("adventurer-toggle-list-button");
		fireEvent.click(toggleButton);

		const newAdventurer = screen.getByTestId("adventurer-profile-1");
		expect(newAdventurer).toBeInTheDocument();
		expect(nameInput).toHaveValue("");
	});

	// Test the function simulate() to verify that the adventurer moves and the outputs ( component ) are updated when the button "Jouer" is clicked
	test("-> La fonction simulate() déplace l'aventurier et met à jour les outputs.", () => {
		render(<App />);

		jest.useFakeTimers();

		const simulateButton = screen.getByTestId("play-button");

		fireEvent.click(simulateButton);

		// Necessary because useEffect can be asynchronous ( check simulate() in App.tsx )
		act(() => {
			jest.advanceTimersByTime(1000);
		});

		// Check if the adventurer moved and the outputs are updated so in the document
		expect(screen.getByText(/^C -/)).toBeInTheDocument();

		jest.useRealTimers();
	});

	// Test the function loadScenario() load a scenario and verify that the game state is reset when a scenario is loaded
	test("-> La fonction loadScenario() initialise un scenario et réinitialise l'état du jeu.", () => {
		render(<App />);

		const loadScenarioButton = screen.getByTestId(`load-scenario-button-0`);

		fireEvent.click(loadScenarioButton);

		const widthInput = screen.getByLabelText("Largeur de la carte:") as HTMLInputElement;

		const expectedWidth = Scenarios[0].map.width;
		expect(Number((widthInput as HTMLInputElement).value)).toBe(expectedWidth);
	});
});
