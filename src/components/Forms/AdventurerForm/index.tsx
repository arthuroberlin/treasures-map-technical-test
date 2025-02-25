// ----- HOOKS ---- */
import { useState } from "react";
/* ----- COMPONENT ---- */
import PrimaryButton from "../../ui/PrimaryButton";
/* ----- TYPES ---- */
import { Adventurer, Orientation } from "../../../types";
/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface AdventurerFormProps {
	adventurers: Adventurer[];
	newAdventurers: Adventurer;
	setnewAdventurers: React.Dispatch<React.SetStateAction<Adventurer>>;
	handleAddAdventurer: () => void;
}

const AdventurerForm: React.FC<AdventurerFormProps> = ({
	adventurers,
	newAdventurers,
	setnewAdventurers,
	handleAddAdventurer,
}) => {
	const [showList, setShowList] = useState(false);

	const isFormValid = () => {
		return (
			newAdventurers.name.trim() !== "" &&
			!isNaN(newAdventurers.position.x) &&
			!isNaN(newAdventurers.position.y) &&
			newAdventurers.orientation.trim() !== "" &&
			newAdventurers.sequence.trim() !== ""
		);
	};

	const handlePositionChange = (coord: "x" | "y", value: string) => {
		const numValue = parseInt(value);
		if (!isNaN(numValue) && numValue >= 0) {
			setnewAdventurers({
				...newAdventurers,
				position: { ...newAdventurers.position, [coord]: numValue },
			});
		}
	};

	const toggleList = () => {
		setShowList((prev) => !prev);
	};

	return (
		<div className={`game__options ${styles.container}`}>
			<h3>Ajouter un/une aventurier/ière</h3>
			<div className="game__options-group">
				<input
					data-testid="adventurer-name-input"
					type="text"
					placeholder="Nom"
					className="game__options-input"
					value={newAdventurers.name}
					onChange={(e) => setnewAdventurers({ ...newAdventurers, name: e.target.value })}
				/>
			</div>
			<div className="game__options-group">
				<input
					data-testid="adventurer-x-input"
					type="number"
					placeholder="X"
					className="game__options-input"
					value={newAdventurers.position.x}
					onChange={(e) => handlePositionChange("x", e.target.value)}
				/>
			</div>
			<div className="game__options-group">
				<input
					data-testid="adventurer-y-input"
					type="number"
					placeholder="Y"
					className="game__options-input"
					value={newAdventurers.position.y}
					onChange={(e) => handlePositionChange("y", e.target.value)}
				/>
			</div>
			<input
				data-testid="adventurer-orientation-input"
				type="text"
				placeholder="Orientation"
				className="game__options-input"
				value={newAdventurers.orientation}
				onChange={(e) => setnewAdventurers({ ...newAdventurers, orientation: e.target.value as Orientation })}
			/>
			<div className="game__options-group">
				<input
					data-testid="adventurer-sequence-input"
					type="text"
					placeholder="Séquence"
					className="game__options-input"
					value={newAdventurers.sequence}
					onChange={(e) => setnewAdventurers({ ...newAdventurers, sequence: e.target.value })}
				/>
			</div>
			<PrimaryButton data-testid="add-adventurer-input" onClick={handleAddAdventurer} disabled={!isFormValid()}>
				🤠 Ajouter l'aventurier
			</PrimaryButton>

			<PrimaryButton data-testid="adventurer-toggle-list-button" className="toggle-button" onClick={toggleList}>
				{showList ? "⬆️Cacher la liste" : "⬇️ Afficher la liste"}
			</PrimaryButton>

			{showList && (
				<div className="game__options-list">
					{adventurers.map((a, index) => (
						<div
							data-testid={`adventurer-profile-${index}`}
							className={styles["game__options-list--item--aventurer"]}
							key={index}
						>
							<span>
								{a.name} est l'aventurier n°{index + 1}
							</span>
							<span>Position X : {a.position.x}</span>
							<span>Position Y : {a.position.y}</span>
							<span>Orientation: {a.orientation}</span>
							<span>Sequence: {a.sequence}</span>
							<span>Trésors collectés : {a.tresorsCollected}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AdventurerForm;
