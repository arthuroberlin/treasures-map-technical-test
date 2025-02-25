// ----- UTILITY ----- //
import { render, screen } from "@testing-library/react";
// ----- COMPONENT ----- //
import MapComponent from "./index";
// ----- TYPES ----- //
import { Map, Mountain, Treasure, Adventurer } from "../../types";
// ----- ----- //

describe("MapComponent", () => {
	const testMap: Map = { width: 1, height: 1 };
	const testMountains: Mountain[] = [{ x: 1, y: 1 }];
	const testTreasures: Treasure[] = [{ x: 0, y: 0, count: 3 }];
	const testAdventurers: Adventurer[] = [
		{
			name: "Arthur Jones",
			position: { x: 2, y: 3 },
			orientation: "N",
			sequence: "AGASAD",
			tresorsCollected: 0,
		},
	];

	// Test if the grid is displayed with the correct dimensions (width and height)
	test("-> Affiche la grille de la carte avec les bonnes dimensions.", () => {
		const { container } = render(<MapComponent map={testMap} mountains={[]} treasures={[]} adventurers={[]} />);

		const gridDiv = container.querySelector("div[style*='repeat']");

		expect(gridDiv).toBeInTheDocument();
		expect(gridDiv).toHaveStyle(`grid-template-columns: repeat(${testMap.width}, 100px)`);
		expect(gridDiv).toHaveStyle(`grid-template-rows: repeat(${testMap.height}, 100px)`);
	});

	// Test if the mountains are displayed and positioned correctly (X / Y)
	test("-> Affiche les montagnes avec la bonne position.", () => {
		render(<MapComponent map={testMap} mountains={testMountains} treasures={[]} adventurers={[]} />);

		const mountainElement = screen.getByTestId("mountain-0");

		expect(mountainElement).toBeInTheDocument();
		expect(mountainElement).toHaveStyle(`grid-column: ${testMountains[0].x + 1}`);
		expect(mountainElement).toHaveStyle(`grid-row: ${testMountains[0].y + 1}`);
	});

	// Test if the treasures are displayed with the correct position (X / Y) + count
	test("-> Affiche les trésors avec la bonne position et le bon nombre.", () => {
		render(<MapComponent map={testMap} mountains={[]} treasures={testTreasures} adventurers={[]} />);

		const treasureElement = screen.getByTestId("treasure-0");

		expect(treasureElement).toBeInTheDocument();
		expect(treasureElement).toHaveStyle(`grid-column: ${testTreasures[0].x + 1}`);
		expect(treasureElement).toHaveStyle(`grid-row: ${testTreasures[0].y + 1}`);
	});

	// Test if the adventurer and the background image are displayed correctly
	test("-> Affiche l'aventurier, son image et l'image de fond.", () => {
		render(<MapComponent map={testMap} mountains={[]} treasures={[]} adventurers={testAdventurers} />);

		const adventurerElement = screen.getByText("Arthur Jones");
		expect(adventurerElement).toBeInTheDocument();

		const adventurerImg = screen.getByTestId("adventurer-0");
		expect(adventurerImg).toBeInTheDocument();

		const backgroundImg = screen.getByAltText("Plaine fleurie et rocheuse.");
		expect(backgroundImg).toBeInTheDocument();
	});
});
