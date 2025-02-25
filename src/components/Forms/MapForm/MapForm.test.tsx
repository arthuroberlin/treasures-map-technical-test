// ----- UTILITY ----- //
import { render, screen, fireEvent } from "@testing-library/react";
// ----- COMPONENT ----- //
import MapForm from "./index";
// ----- TYPES ----- //
import { Map } from "../../../types";
// ----- ----- //

describe("MapForm", () => {
	const defaultMap: Map = { width: 5, height: 5 };
	const mockSetMap = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Tests if the inputs for the map width and height are displayed and have default values
	test("-> Affiche les valeurs initiales de la carte.", () => {
		render(<MapForm map={defaultMap} setMap={mockSetMap} />);

		const widthInput = screen.getByLabelText("Largeur de la carte:") as HTMLInputElement;
		const heightInput = screen.getByLabelText("Hauteur de la carte:") as HTMLInputElement;

		expect(widthInput).toHaveValue(5);
		expect(heightInput).toHaveValue(5);
	});

	// Tests if map width is updated when input changes
	test("-> Met à jour la largeur de la carte quand l'input change.", () => {
		render(<MapForm map={defaultMap} setMap={mockSetMap} />);

		const widthInput = screen.getByLabelText("Largeur de la carte:") as HTMLInputElement;

		fireEvent.change(widthInput, { target: { value: "10" } });
		expect(mockSetMap).toHaveBeenCalledWith(expect.any(Function));

		const updater = mockSetMap.mock.calls[0][0];
		expect(updater(defaultMap)).toEqual({ ...defaultMap, width: 10 });
	});

	// Tests if the map height is updated when the input changes
	test("-> Met à jour la hauteur de la carte quand l'input change.", () => {
		render(<MapForm map={defaultMap} setMap={mockSetMap} />);

		const heightInput = screen.getByLabelText("Hauteur de la carte:") as HTMLInputElement;

		fireEvent.change(heightInput, { target: { value: "10" } });
		expect(mockSetMap).toHaveBeenCalledWith(expect.any(Function));

		const updater = mockSetMap.mock.calls[0][0];
		expect(updater(defaultMap)).toEqual({ ...defaultMap, height: 10 });
	});

	// Checks if the map is not updated with a negative value, even if it's “impossible” to enter a negative value in the formMap inputs
	test("-> Non update de la carte avec une valeur négative.", () => {
		render(<MapForm map={defaultMap} setMap={mockSetMap} />);

		const widthInput = screen.getByLabelText("Largeur de la carte:") as HTMLInputElement;
		const heightInput = screen.getByLabelText("Hauteur de la carte:") as HTMLInputElement;

		fireEvent.change(widthInput, { target: { value: "-5" } });
		expect(mockSetMap).not.toHaveBeenCalled();

		fireEvent.change(heightInput, { target: { value: "-5" } });
		expect(mockSetMap).not.toHaveBeenCalled();
	});
});
