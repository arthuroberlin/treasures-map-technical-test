/* ----- HOOKS ---- */
import { useState } from "react";
/* ----- COMPONENT ---- */
import PrimaryButton from "../../ui/PrimaryButton";
/* ----- TYPES ---- */
import { Mountain } from "../../../types";
/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface MontainFormProps {
	mountains: Mountain[];
	setMountains: React.Dispatch<React.SetStateAction<Mountain[]>>;
}

const MontainForm: React.FC<MontainFormProps> = ({ mountains, setMountains }) => {
	const [newMountain, setNewMountain] = useState<Mountain>({ x: 0, y: 0 });
	const [showList, setShowList] = useState(false);

	const handleAddMountain = () => {
		setMountains((prev) => [...prev, newMountain]);
		setNewMountain({ x: 0, y: 0 });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: "x" | "y") => {
		const value = parseInt(e.target.value);
		if (value >= 0) {
			setNewMountain((prev) => ({
				...prev,
				[field]: value,
			}));
		}
	};

	const handleDeleteMountain = (index: number) => {
		setMountains((prev) => prev.filter((_, i) => i !== index));
	};

	const toggleList = () => {
		setShowList((prev) => !prev);
	};

	return (
		<div className={`game__options ${styles.container}`}>
			<h3>Ajouter une Montagne</h3>
			<div className="game__options-group">
				<label className="game__options-label" htmlFor="mountain-x-input">
					X:
				</label>
				<input
					id="mountain-x-input"
					className="game__options-input"
					type="number"
					value={newMountain.x}
					onChange={(e) => handleChange(e, "x")}
				/>
			</div>
			<div className="game__options-group">
				<label className="game__options-label" htmlFor="mountain-y-input">
					Y:
				</label>
				<input
					id="mountain-y-input"
					className="game__options-input"
					type="number"
					value={newMountain.y}
					onChange={(e) => handleChange(e, "y")}
				/>
			</div>

			<PrimaryButton data-testid="add-mountain-input" className="game__options-add" onClick={handleAddMountain}>
				🏔️ Ajouter une montagne
			</PrimaryButton>

			<PrimaryButton
				data-testid="mountain-toggle-list-button"
				className="game__options-add game__options-button--toggle"
				onClick={toggleList}
			>
				{showList ? "⬆️Cacher la liste" : "⬇️ Afficher la liste"}
			</PrimaryButton>

			{showList && (
				<div className="game__options-list">
					<h3>Liste des Montagnes</h3>
					{mountains.map((m, index) => (
						<div key={index} className="game__options-list--item">
							<span>
								Montagne {index + 1}: ({m.x}, {m.y})
							</span>
							<button onClick={() => handleDeleteMountain(index)}>❌</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MontainForm;
