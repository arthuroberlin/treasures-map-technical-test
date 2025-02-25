// ----- UTILITY ----- //
import { render, screen } from "@testing-library/react";
// ----- COMPONENT ----- //
import Outputs from "./index";
// ----- ----- //

describe("Outputs Component", () => {
	const testOutputs = [
		"C - 3 - 4 M - 1 - 0 M - 2 - 1 T - 0 - 3 - 2 T - 1 - 3 - 2 A - Arthur Jones - 1 - 3 - E - 1",
		"C - 3 - 4 M - 1 - 0 M - 2 - 1 T - 0 - 3 - 2 T - 1 - 3 - 2 A - Arthur Jones - 2 - 3 - N - 1",
		"C - 3 - 4 M - 1 - 0 M - 2 - 1 T - 0 - 3 - 2 T - 1 - 3 - 2 A - Arthur Jones - 2 - 2 - O - 1",
	];

	// Test the rendering of the Outputs component and his title
	test("-> Le composant Outputs est rendu ainsi que son titre.", () => {
		render(<Outputs outputs={testOutputs} />);

		const titleElement = screen.getByText(/Outputs/i);

		expect(titleElement).toBeInTheDocument();
	});

	// Test the rendering of the correct output count elements
	test("-> Le nombre d'outputs attendu est rendu correctement.", () => {
		render(<Outputs outputs={testOutputs} />);

		const outputElements = screen.getAllByTestId(/output-line-/);

		expect(outputElements).toHaveLength(testOutputs.length);
	});

	// Test each output line rendering with the correct output text
	test("-> Chaque texte de chaque output attendu est rendu correctement.", () => {
		render(<Outputs outputs={testOutputs} />);

		testOutputs.forEach((line) => {
			const outputElement = screen.getByText(new RegExp(line));

			expect(outputElement).toBeInTheDocument();
		});
	});

	// Test the rendering of the Outputs component when no outputs(string[]) are provided
	test("-> Aucun outputs n'est vide lors du rendu.", () => {
		render(<Outputs outputs={[]} />);

		const outputElements = screen.queryAllByText(/Line/i);

		expect(outputElements).toHaveLength(0);
	});
});
