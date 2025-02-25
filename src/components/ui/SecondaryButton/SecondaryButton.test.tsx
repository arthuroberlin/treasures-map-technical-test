// ----- UTILITY ----- //
import { render, screen, fireEvent } from "@testing-library/react";
// ----- COMPONENT ----- //
import SecondaryButton from "./index";
// ----- TYPES ----- //
import { Scenario } from "../../../types";
// ----- ----- //

describe("SecondaryButton", () => {
	const mockScenario: Scenario = {
		map: { width: 3, height: 4 },
		mountains: [
			{ x: 1, y: 0 },
			{ x: 2, y: 1 },
		],
		treasures: [
			{ x: 0, y: 3, count: 2 },
			{ x: 1, y: 3, count: 3 },
		],
		adventurers: [
			{ name: "Arthur Jones", position: { x: 1, y: 1 }, orientation: "S", sequence: "AADADAGGA", tresorsCollected: 0 },
		],
	};

	const mockLoadScenario = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Tests if the button is rendered with the correct text
	test("-> Affiche le texte correctement.", () => {
		render(
			<SecondaryButton scenario={mockScenario} index={1} loadScenario={mockLoadScenario}>
				Scénario Test
			</SecondaryButton>
		);

		const button = screen.getByTestId("load-scenario-button-1");

		expect(button).toBeInTheDocument();
	});

	// Tests if the button calls the loadScenario function when clicked
	test("-> Appelle la function loadScenario() quand cliqué.", () => {
		render(
			<SecondaryButton scenario={mockScenario} index={1} loadScenario={mockLoadScenario}>
				Scénario Test
			</SecondaryButton>
		);

		const button = screen.getByTestId("load-scenario-button-1");

		fireEvent.click(button);
		expect(mockLoadScenario).toHaveBeenCalledWith(mockScenario);
	});
});
