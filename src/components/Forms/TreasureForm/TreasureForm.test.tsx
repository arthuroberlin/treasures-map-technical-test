// ----- UTILITY ----- //
import { render, screen, fireEvent } from "@testing-library/react";
// ----- COMPONENT ----- //
import TreasureForm from "./index";
// ----- TYPES ----- //
import { Treasure } from "../../../types";
// ----- ----- //

describe("TreasureForm", () => {
	const defaultTreasure: Treasure = { x: 0, y: 0, count: 1 };
	const sampleTreasures: Treasure[] = [{ x: 2, y: 3, count: 4 }];
	const mockSetTreasures = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Test if the inputs and the "Ajouter un Trésor" button are displayed
	test("-> Affiche les valeurs initiales pour X, Y et Count.", () => {
		render(<TreasureForm treasures={[]} setTreasures={mockSetTreasures} />);

		const inputs = screen.getAllByRole("spinbutton");
		const addTreasureInput = screen.getByTestId("add-treasure-input") as HTMLInputElement;

		expect(screen.getByLabelText("X:")).toBeInTheDocument();
		expect(screen.getByLabelText("Y:")).toBeInTheDocument();
		expect(screen.getByLabelText("Nombre:")).toBeInTheDocument();
		expect(addTreasureInput).toBeInTheDocument();

		expect(inputs[0]).toHaveValue(defaultTreasure.x);
		expect(inputs[1]).toHaveValue(defaultTreasure.y);
		expect(inputs[2]).toHaveValue(defaultTreasure.count);
	});

	// Test if the input X is updated when the user enters a value
	test("-> Met à jour l'input X lorsque l'utilisateur entre une valeur.", () => {
		render(<TreasureForm treasures={[]} setTreasures={mockSetTreasures} />);

		const inputs = screen.getAllByRole("spinbutton");
		const xInput = inputs[0];

		fireEvent.change(xInput, { target: { value: "5" } });
		expect(xInput).toHaveValue(5);
	});

	// Test if the input Y is updated when the user enters a value
	test("-> Met à jour l'input Y lorsque l'utilisateur entre une valeur.", () => {
		render(<TreasureForm treasures={[]} setTreasures={mockSetTreasures} />);

		const inputs = screen.getAllByRole("spinbutton");
		const yInput = inputs[1];

		fireEvent.change(yInput, { target: { value: "8" } });
		expect(yInput).toHaveValue(8);
	});

	// Test if the list of treasures is displayed after clicking on "Afficher la liste" button and then hidden when clicked again
	test("-> Affiche la liste des trésors après avoir cliqué sur Afficher la liste.", () => {
		render(<TreasureForm treasures={sampleTreasures} setTreasures={mockSetTreasures} />);

		const toggleButton = screen.getByTestId("treasure-toggle-list-button");
		expect(screen.queryByText("Liste des Trésors")).toBeNull();

		fireEvent.click(toggleButton);
		expect(screen.getByText("Liste des Trésors")).toBeInTheDocument();

		fireEvent.click(toggleButton);
		expect(screen.queryByText("Liste des Trésors")).toBeNull();
	});
});
