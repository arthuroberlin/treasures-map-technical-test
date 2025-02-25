/* ----- TYPES ---- */
import { Map } from "../../../types";
/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface MapFormProps {
	map: Map;
	setMap: React.Dispatch<React.SetStateAction<Map>>;
}

const MapForm: React.FC<MapFormProps> = ({ map, setMap }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: "width" | "height") => {
		const value = parseInt(e.target.value);
		if (value >= 0) {
			setMap((prev) => ({ ...prev, [field]: value }));
		}
	};

	return (
		<div className={`game__options ${styles.container}`}>
			<div className="game__options-group">
				<label className="game__options-label" htmlFor="map-width-input">
					Largeur de la carte:
				</label>
				<input
					id="map-width-input"
					className="game__options-input"
					type="number"
					value={map.width}
					onChange={(e) => handleChange(e, "width")}
				/>
			</div>
			<div className="game__options-group">
				<label className="game__options-label" htmlFor="map-height-input">
					Hauteur de la carte:
				</label>
				<input
					id="map-height-input"
					className="game__options-input"
					type="number"
					value={map.height}
					onChange={(e) => handleChange(e, "height")}
				/>
			</div>
		</div>
	);
};

export default MapForm;
