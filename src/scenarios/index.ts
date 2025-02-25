import { Scenario } from "../types";

export const Scenarios: Scenario[] = [
	// Default scenario
	{
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
			{ name: "Indy", position: { x: 1, y: 1 }, orientation: "S", sequence: "AADADAGGA", tresorsCollected: 0 },
		],
	},
	// Scenario 1
	{
		map: { width: 5, height: 5 },
		mountains: [{ x: 2, y: 2 }],
		treasures: [{ x: 4, y: 4, count: 1 }],
		adventurers: [
			{ name: "Prado", position: { x: 0, y: 0 }, orientation: "E", sequence: "AADAADAADA", tresorsCollected: 0 },
		],
	},
	// Scenario 2
	{
		map: { width: 5, height: 5 },
		mountains: [
			{ x: 1, y: 1 },
			{ x: 3, y: 3 },
		],
		treasures: [
			{ x: 2, y: 4, count: 1 },
			{ x: 4, y: 2, count: 1 },
		],
		adventurers: [
			{
				name: "David",
				position: { x: 0, y: 0 },
				orientation: "E",
				sequence: "AADAADAADAADA",
				tresorsCollected: 0,
			},
			{ name: "Yanick", position: { x: 4, y: 4 }, orientation: "O", sequence: "AAGAAG", tresorsCollected: 0 },
		],
	},
	// Scenario 3
	{
		map: { width: 5, height: 5 },
		mountains: [
			{ x: 1, y: 1 },
			{ x: 3, y: 3 },
		],
		treasures: [
			{ x: 2, y: 4, count: 1 },
			{ x: 4, y: 2, count: 1 },
			{ x: 2, y: 2, count: 1 },
		],
		adventurers: [
			{
				name: "Steeve",
				position: { x: 0, y: 0 },
				orientation: "E",
				sequence: "AADAADAADAA",
				tresorsCollected: 0,
			},
			{
				name: "Mark",
				position: { x: 4, y: 4 },
				orientation: "O",
				sequence: "AAGAAGAAG",
				tresorsCollected: 0,
			},
			{
				name: "Bill",
				position: { x: 2, y: 0 },
				orientation: "S",
				sequence: "AAADADAA",
				tresorsCollected: 0,
			},
		],
	},
];
