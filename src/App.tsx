/* ----- HOOKS ---- */
import React, { useState, useEffect } from "react";
/* ----- COMPONENTS ---- */
import Header from "./components/ui/Header";
import PlayButton from "./components/ui/PlayButton";
import SecondaryButton from "./components/ui/SecondaryButton";
import MapComponent from "./components/Map";
import Outputs from "./components/Outputs";
import MapForm from "./components/Forms/MapForm";
import MountainForm from "./components/Forms/MountainForm";
import TresorForm from "./components/Forms/TreasureForm";
import AdventurerForm from "./components/Forms/AdventurerForm";
/* ----- SCENARIOS DATAS ---- */
import { Scenarios } from "./scenarios";
/* ----- IMAGE ---- */
import background from "./assets/background.webp";
/* ----- SYLES ---- */
import "./style/global-style.css";
import styles from "./styles.module.css";
/* ----- TYPES ---- */
import { Map, Mountain, Treasure, Adventurer, Scenario } from "./types";
/* ----- ---- */

const App: React.FC = () => {
	/* ----- FOR GAME MECHANICS---- */
	const [map, setMap] = useState<Map>(Scenarios[0].map);
	const [mountains, setMountains] = useState<Mountain[]>(Scenarios[0].mountains);
	const [treasures, setTreasures] = useState<Treasure[]>(Scenarios[0].treasures);
	const [adventurers, setAdventurers] = useState<Adventurer[]>(Scenarios[0].adventurers);
	const [animationSequence, setAnimationSequence] = useState<string[]>([]);
	const [currentAdventurerIndex, setCurrentAdventurerIndex] = useState<number>(0);
	const [newAdventurer, setNewAdventurer] = useState<Adventurer>({
		name: "",
		position: { x: 0, y: 0 },
		orientation: "N",
		sequence: "",
		tresorsCollected: 0,
	});
	/* ----- ALL OUTPUTS IS IN THE RIGHT COL ---- */
	const [output, setOutput] = useState<string[]>([]);
	/* ----- UI / UX ---- */
	const [winMessage, setWinMessage] = useState<boolean>(false);
	const [collectedTreasures, setCollectedTreasures] = useState<number>(0);

	useEffect(() => {
		if (animationSequence.length > 0) {
			const interval = setInterval(() => {
				setAnimationSequence((prev) => {
					if (prev.length === 0) {
						clearInterval(interval);
						return prev;
					}
					return prev.slice(1);
				});
			}, 500);
			return () => clearInterval(interval);
		}
	}, [animationSequence]);

	const handleAddAventurer = () => {
		setAdventurers((prev) => [...prev, newAdventurer]);
		setNewAdventurer({
			name: "",
			position: { x: 0, y: 0 },
			orientation: "N",
			sequence: "",
			tresorsCollected: 0,
		});
	};

	const moveAdventurer = (adventurer: Adventurer) => {
		const { position, orientation, sequence } = adventurer;
		let newPosition = { ...position };
		const moveSequence: string[] = [];
		let tresorCollected = false; // Flag to check if a treasure is collected in the current move of my adventurer

		for (const move of sequence) {
			switch (move) {
				case "A":
					switch (orientation) {
						case "N":
							newPosition.y -= 1;
							break;
						case "S":
							newPosition.y += 1;
							break;
						case "E":
							newPosition.x += 1;
							break;
						case "O":
							newPosition.x -= 1;
							break;
					}
					if (
						newPosition.x < 0 ||
						newPosition.x >= map.width ||
						newPosition.y < 0 ||
						newPosition.y >= map.height ||
						mountains.some((m) => m.x === newPosition.x && m.y === newPosition.y)
					) {
						newPosition = { ...position }; // Reset to current position if blocked
					} else {
						position.x = newPosition.x;
						position.y = newPosition.y;
						const tresor = treasures.find((t) => t.x === newPosition.x && t.y === newPosition.y && t.count > 0);
						if (tresor) {
							tresor.count -= 1;
							adventurer.tresorsCollected += 1;
							tresorCollected = true; // used to check if a treasure is collected in the current move
						}
					}
					moveSequence.push(move);
					break;
				case "D":
					switch (orientation) {
						case "N":
							adventurer.orientation = "E";
							break;
						case "E":
							adventurer.orientation = "S";
							break;
						case "S":
							adventurer.orientation = "O";
							break;
						case "O":
							adventurer.orientation = "N";
							break;
					}
					moveSequence.push(move);
					break;
				case "G":
					switch (orientation) {
						case "N":
							adventurer.orientation = "O";
							break;
						case "O":
							adventurer.orientation = "S";
							break;
						case "S":
							adventurer.orientation = "E";
							break;
						case "E":
							adventurer.orientation = "N";
							break;
					}
					moveSequence.push(move);
					break;
			}
		}
		setAnimationSequence(moveSequence);
		return tresorCollected; // Return the flag to check if a treasure is collected in the current move of the actual adventurer
	};

	const simulate = () => {
		if (currentAdventurerIndex < adventurers.length) {
			const tresorCollected = moveAdventurer(adventurers[currentAdventurerIndex]);

			if (tresorCollected) {
				setCollectedTreasures((prev) => prev + 1);
			}
			setCurrentAdventurerIndex((prev) => prev + 1);
		} else {
			setCurrentAdventurerIndex(0);
			const tresorCollected = moveAdventurer(adventurers[0]); // Move the first adventurer immediately (avoid to need to click the button twice)
			if (tresorCollected) {
				setCollectedTreasures((prev) => prev + 1);
			}
		}

		// ----- GENERATE OUTPUT ONLY FOR TECHNICAL TEST ONLY - NOT FOR PRODUCTION ---- //
		const output = generateOutput(map, mountains, treasures, adventurers);
		console.log("New output -> " + "\n" + output.join("\n"));

		if (treasures.every((t) => t.count === 0)) {
			setWinMessage(true);
		}
	};

	// ----- GENERATE OUTPUT -> const [output, setOutput] ---- //

	const generateOutput = (
		map: Map,
		mountains: Mountain[],
		treasures: Treasure[],
		adventurers: Adventurer[]
	): string[] => {
		const output: string[] = [];

		output.push(`C - ${map.width} - ${map.height}`);
		mountains.forEach((m) => output.push(`M - ${m.x} - ${m.y}`));

		treasures.forEach((t) => {
			if (t.count > 0) {
				output.push(`T - ${t.x} - ${t.y} - ${t.count}`);
			}
		});

		adventurers.forEach((a) =>
			output.push(`A - ${a.name} - ${a.position.x} - ${a.position.y} - ${a.orientation} - ${a.tresorsCollected}`)
		);

		const addOutput = (newOutput: string) => {
			setOutput((prev: string[]): string[] => [...prev, newOutput]);
		};

		addOutput(output.join("\n"));
		return output;
	};

	// ----- LOAD SCENARIO AND DEFAULT SCENARIO FROM scenarios/index.ts  ---- //

	const loadScenario = (scenario: Scenario) => {
		setMap({ ...scenario.map });
		setMountains([...scenario.mountains]);
		setTreasures(scenario.treasures.map((t) => ({ ...t })));
		setAdventurers(scenario.adventurers.map((a) => ({ ...a, position: { ...a.position } })));
		setCurrentAdventurerIndex(0);
		setCollectedTreasures(0);
		setWinMessage(false);
		setAnimationSequence([]);
		setOutput([]);
	};

	useEffect(() => {
		loadScenario(Scenarios[0]);
	}, []);

	// ----- ----- ----- ----- //

	return (
		<main className={styles.main}>
			<Header collectedTreasures={collectedTreasures} winMessage={winMessage} />
			<img src={background} alt="Caverne donnant sur une ouverture sur une jungle." className={styles.background} />
			<div className={styles.layout}>
				<div className={`${styles.layout__col} ${styles.layout__game__options} ${styles.layout__custom__scrollbar}`}>
					<MapForm map={map} setMap={setMap} />
					<MountainForm mountains={mountains} setMountains={setMountains} />
					<TresorForm treasures={treasures} setTreasures={setTreasures} />
					<AdventurerForm
						adventurers={adventurers}
						newAdventurers={newAdventurer}
						setnewAdventurers={setNewAdventurer}
						handleAddAdventurer={handleAddAventurer}
					/>
				</div>

				<div className={`${styles.layout__col} ${styles.layout__map}`}>
					<div className={styles.game__commands}>
						{Scenarios.map((scenario, index) => (
							<SecondaryButton key={index} index={index} loadScenario={loadScenario} scenario={scenario} />
						))}
						<PlayButton playTheGame={simulate}>Jouer</PlayButton>
					</div>
					<MapComponent map={map} mountains={mountains} treasures={treasures} adventurers={adventurers} />
				</div>

				<div className={`${styles.layout__col} ${styles.layout__output} ${styles.layout__custom__scrollbar}`}>
					<Outputs outputs={output} />
				</div>
			</div>
		</main>
	);
};

export default App;
