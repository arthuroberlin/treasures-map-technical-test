export type Orientation = "N" | "S" | "E" | "O";

export interface Position {
	x: number;
	y: number;
}

export interface Map {
	width: number;
	height: number;
}

export interface Mountain extends Position {}

export interface Treasure extends Position {
	count: number;
}

export interface Adventurer {
	name: string;
	position: Position;
	orientation: Orientation;
	sequence: string;
	tresorsCollected: number;
}

export interface Scenario {
	map: Map;
	mountains: Mountain[];
	treasures: Treasure[];
	adventurers: Adventurer[];
}
