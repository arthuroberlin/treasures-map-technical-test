/* ----- HOOKS ---- */
import { useState } from "react";
/* ----- COMPONENT ---- */
import PrimaryButton from "../../ui/PrimaryButton";
/* ----- TYPES ---- */
import { Treasure } from "../../../types";
/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface TresorFormProps {
	treasures: Treasure[];
	setTreasures: React.Dispatch<React.SetStateAction<Treasure[]>>;
}

const TreasureForm: React.FC<TresorFormProps> = ({ treasures, setTreasures }) => {
	const [newTresor, setNewTresor] = useState<Treasure>({ x: 0, y: 0, count: 1 });
	const [showList, setShowList] = useState(false);

	const handleAddTreasure = () => {
		setTreasures((prev) => [...prev, newTresor]);
		setNewTresor({ x: 0, y: 0, count: 1 });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: "x" | "y" | "count") => {
		const value = parseInt(e.target.value);
		if (value >= 0) {
			setNewTresor((prev) => ({
				...prev,
				[field]: parseInt(e.target.value),
			}));
		}
	};

	const handleDeleteTresor = (index: number) => {
		setTreasures((prev) => prev.filter((_, i) => i !== index));
	};

	const toggleList = () => {
		setShowList((prev) => !prev);
	};

	return (
		<div className={`game__options ${styles.container}`}>
			<h3>Ajouter un Trésor</h3>
			<div className="game__options-group">
				<label className="game__options-label" htmlFor="treasure-x-input">
					X:
				</label>
				<input
					id="treasure-x-input"
					className="game__options-input"
					type="number"
					value={newTresor.x}
					onChange={(e) => handleChange(e, "x")}
				/>
			</div>
			<div className="game__options-group">
				<label className="game__options-label" htmlFor="treasure-y-input">
					Y:
				</label>
				<input
					id="treasure-y-input"
					className="game__options-input"
					type="number"
					value={newTresor.y}
					onChange={(e) => handleChange(e, "y")}
				/>
			</div>
			<div className="game__options-group">
				<label className="game__options-label" htmlFor="treasure-count-input">
					Nombre:
				</label>
				<input
					id="treasure-count-input"
					className="game__options-input"
					type="number"
					value={newTresor.count}
					onChange={(e) => handleChange(e, "count")}
				/>
			</div>
			<PrimaryButton data-testid="add-treasure-input" onClick={handleAddTreasure}>
				💰 Ajouter Trésor
			</PrimaryButton>

			<PrimaryButton data-testid="treasure-toggle-list-button" className="toggle-button" onClick={toggleList}>
				{showList ? "⬆️Cacher la liste" : "⬇️ Afficher la liste"}
			</PrimaryButton>

			{showList && (
				<div className="game__options-list">
					<h3>Liste des Trésors</h3>
					{treasures.map((t, index) => (
						<div key={index} className="game__options-list--item">
							<span>
								Trésor {index + 1}: ({t.x}, {t.y}) - Count: {t.count}
							</span>
							<button onClick={() => handleDeleteTresor(index)}>❌</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TreasureForm;
