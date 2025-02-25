// ----- UTILITY ----- //
import { render, screen, fireEvent } from "@testing-library/react";
// ----- COMPONENT ----- //
import MontainForm from "./index";
// ----- TYPES ----- //
import { Mountain } from "../../../types";
// ----- ----- //

describe("MontainForm", () => {
	const mockSetMountains = jest.fn();
	const defaultMountains: Mountain[] = [];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Test if the inputs and the "Ajouter une montagne" button are displayed
	test("-> Affiche les inputs et le bouton : Ajouter une montagne.", () => {
		render(<MontainForm mountains={defaultMountains} setMountains={mockSetMountains} />);

		const addMountainInput = screen.getByTestId("add-mountain-input") as HTMLInputElement;

		expect(screen.getByLabelText("X:")).toBeInTheDocument();
		expect(screen.getByLabelText("Y:")).toBeInTheDocument();
		expect(addMountainInput).toBeInTheDocument();
	});

	// Test if the input X is updated when the user enters a value
	test("-> Met à jour l'input X lorsque l'utilisateur entre une valeur.", () => {
		render(<MontainForm mountains={defaultMountains} setMountains={mockSetMountains} />);

		const xInput = screen.getByLabelText("X:") as HTMLInputElement;

		fireEvent.change(xInput, { target: { value: "3" } });
		expect(xInput).toHaveValue(3);
	});

	// Test if the input Y is updated when the user enters a value
	test("-> Met à jour l'input Y lorsque l'utilisateur entre une valeur.", () => {
		render(<MontainForm mountains={defaultMountains} setMountains={mockSetMountains} />);

		const yInput = screen.getByLabelText("Y:") as HTMLInputElement;

		fireEvent.change(yInput, { target: { value: "4" } });
		expect(yInput).toHaveValue(4);
	});

	// Test if the "Ajouter une montagne" button adds a mountain to the list when clicked
	test("-> Ajoute une montagne à la liste lorsque le bouton est cliqué.", () => {
		render(<MontainForm mountains={defaultMountains} setMountains={mockSetMountains} />);

		const addMountainInput = screen.getByTestId("add-mountain-input") as HTMLInputElement;

		fireEvent.click(addMountainInput);
		expect(mockSetMountains).toHaveBeenCalledWith(expect.any(Function));
	});

	// Test if the list of mountains is displayed after clicking on "Afficher la liste" button and then hidden when clicked again
	test("-> Affiche la liste des montagnes après avoir cliqué sur Afficher la liste.", () => {
		render(<MontainForm mountains={defaultMountains} setMountains={mockSetMountains} />);

		const toggleButton = screen.getByTestId("mountain-toggle-list-button");
		expect(screen.queryByText("Liste des Montagnes")).toBeNull();

		fireEvent.click(toggleButton);
		expect(screen.getByText("Liste des Montagnes")).toBeInTheDocument();

		fireEvent.click(toggleButton);
		expect(screen.queryByText("Liste des Montagnes")).toBeNull();
	});
});
