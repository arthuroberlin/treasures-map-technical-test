// ----- UTILITY ----- //
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
// ----- COMPONENT ----- //
import AdventurerForm from "./index";
// ----- TYPES ----- //
import { Adventurer, Orientation } from "../../../types";
// ----- ----- //

describe("AdventurerForm", () => {
	const defaultAdventurer: Adventurer = {
		name: "Arthur Jones",
		position: { x: 0, y: 0 },
		orientation: "" as Orientation,
		sequence: "",
		tresorsCollected: 0,
	};

	const adventurers: Adventurer[] = [
		{
			name: "Arthur Jones",
			position: { x: 1, y: 2 },
			orientation: "N" as Orientation,
			sequence: "AGASAD",
			tresorsCollected: 0,
		},
	];

	const mockSetNewAdventurer = jest.fn();
	const mockHandleAddAdventurer = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Test if the inputs display with initial values ( from newAdventurers props )
	test("-> Affiche les champs de saisie avec les valeurs initiales.", () => {
		render(
			<AdventurerForm
				adventurers={adventurers}
				newAdventurers={defaultAdventurer}
				setnewAdventurers={mockSetNewAdventurer}
				handleAddAdventurer={mockHandleAddAdventurer}
			/>
		);

		const nameInput = screen.getByTestId("adventurer-name-input") as HTMLInputElement;
		const xInput = screen.getByTestId("adventurer-x-input") as HTMLInputElement;
		const yInput = screen.getByTestId("adventurer-y-input") as HTMLInputElement;
		const orientationInput = screen.getByTestId("adventurer-orientation-input") as HTMLInputElement;
		const sequenceInput = screen.getByTestId("adventurer-sequence-input") as HTMLInputElement;
		const addAdventurerInput = screen.getByTestId("add-adventurer-input") as HTMLInputElement;

		expect(nameInput).toHaveValue("Arthur Jones");
		expect(xInput).toHaveValue(0);
		expect(yInput).toHaveValue(0);
		expect(orientationInput).toHaveValue("");
		expect(sequenceInput).toHaveValue("");
		expect(addAdventurerInput).toBeInTheDocument();
	});

	// Test name input update on change event
	test("-> Met à jour le nom de l'aventurier lorsque l'utilisateur entre une valeur.", () => {
		render(
			<AdventurerForm
				adventurers={adventurers}
				newAdventurers={defaultAdventurer}
				setnewAdventurers={mockSetNewAdventurer}
				handleAddAdventurer={mockHandleAddAdventurer}
			/>
		);

		const nameInput = screen.getByTestId("adventurer-name-input") as HTMLInputElement;
		fireEvent.change(nameInput, { target: { value: "Arthur" } });

		expect(mockSetNewAdventurer).toHaveBeenCalledWith({
			...defaultAdventurer,
			name: "Arthur",
		});
	});

	// Test if the input X is updated when the user enters a value
	test("-> Met à jour la position X de l'aventurier lorsque l'utilisateur entre une valeur.", () => {
		render(
			<AdventurerForm
				adventurers={adventurers}
				newAdventurers={defaultAdventurer}
				setnewAdventurers={mockSetNewAdventurer}
				handleAddAdventurer={mockHandleAddAdventurer}
			/>
		);

		const xInput = screen.getByTestId("adventurer-x-input") as HTMLInputElement;
		fireEvent.change(xInput, { target: { value: "3" } });

		expect(mockSetNewAdventurer).toHaveBeenCalledWith({
			...defaultAdventurer,
			position: { ...defaultAdventurer.position, x: 3 },
		});
	});

	// Test if the input Y is updated when the user enters a value
	test("-> Met à jour la position Y de l'aventurier lorsque l'utilisateur entre une valeur.", () => {
		render(
			<AdventurerForm
				adventurers={adventurers}
				newAdventurers={defaultAdventurer}
				setnewAdventurers={mockSetNewAdventurer}
				handleAddAdventurer={mockHandleAddAdventurer}
			/>
		);

		const yInput = screen.getByTestId("adventurer-y-input") as HTMLInputElement;
		fireEvent.change(yInput, { target: { value: "5" } });

		expect(mockSetNewAdventurer).toHaveBeenCalledWith({
			...defaultAdventurer,
			position: { ...defaultAdventurer.position, y: 5 },
		});
	});
	// Test the update of the orientation of the adventurer when entering a value
	test("-> Met à jour l'orientation de l'aventurier lorsque l'utilisateur entre une valeur.", () => {
		render(
			<AdventurerForm
				adventurers={adventurers}
				newAdventurers={defaultAdventurer}
				setnewAdventurers={mockSetNewAdventurer}
				handleAddAdventurer={mockHandleAddAdventurer}
			/>
		);

		const orientationInput = screen.getByTestId("adventurer-orientation-input") as HTMLInputElement;
		fireEvent.change(orientationInput, { target: { value: "N" } });

		expect(mockSetNewAdventurer).toHaveBeenCalledWith({
			...defaultAdventurer,
			orientation: "N" as Orientation,
		});
	});

	// Test the update of the sequence of the adventurer when entering a value
	test("-> Met à jour la séquence de l'aventurier lors d'une saisie.", () => {
		render(
			<AdventurerForm
				adventurers={adventurers}
				newAdventurers={defaultAdventurer}
				setnewAdventurers={mockSetNewAdventurer}
				handleAddAdventurer={mockHandleAddAdventurer}
			/>
		);

		const sequenceInput = screen.getByTestId("adventurer-sequence-input") as HTMLInputElement;
		fireEvent.change(sequenceInput, { target: { value: "AADG" } });

		expect(mockSetNewAdventurer).toHaveBeenCalledWith({
			...defaultAdventurer,
			sequence: "AADG",
		});
	});

	// Test if the "Ajouter Aventurier" button is disabled if the form is invalid
	test("-> Désactive le bouton d'ajout si le formulaire est invalide.", () => {
		render(
			<AdventurerForm
				adventurers={adventurers}
				newAdventurers={defaultAdventurer}
				setnewAdventurers={mockSetNewAdventurer}
				handleAddAdventurer={mockHandleAddAdventurer}
			/>
		);

		const addAdventurerInput = screen.getByTestId("add-adventurer-input") as HTMLInputElement;
		expect(addAdventurerInput).toBeDisabled();
	});

	// Test if the "Ajouter Aventurier" button is enabled if the form is valid
	test("-> Active le bouton d'ajout si le formulaire est valide.", () => {
		render(
			<AdventurerForm
				adventurers={adventurers}
				newAdventurers={{
					name: "Arthur",
					position: { x: 2, y: 3 },
					orientation: "S" as Orientation,
					sequence: "ADAGDS",
					tresorsCollected: 0,
				}}
				setnewAdventurers={mockSetNewAdventurer}
				handleAddAdventurer={mockHandleAddAdventurer}
			/>
		);

		const addAdventurerInput = screen.getByTestId("add-adventurer-input") as HTMLInputElement;
		expect(addAdventurerInput).not.toBeDisabled();
	});

	// Test if the list of adventurers is displayed after clicking on "Afficher la liste" button and then hidden when clicked again
	test("-> Bascule l'affichage de la liste des aventuriers.", () => {
		render(
			<AdventurerForm
				adventurers={adventurers}
				newAdventurers={defaultAdventurer}
				setnewAdventurers={mockSetNewAdventurer}
				handleAddAdventurer={mockHandleAddAdventurer}
			/>
		);

		const toggleButton = screen.getByTestId("adventurer-toggle-list-button");

		fireEvent.click(toggleButton);
		expect(screen.getByText(/est l'aventurier/)).toBeInTheDocument();

		fireEvent.click(toggleButton);
		expect(screen.queryByText(/est l'aventurier/)).toBeNull();
	});
});
