/* ----- TYPES ---- */
import { Map, Mountain, Treasure, Adventurer } from "../../types";
/* ----- IMAGES ---- */
import background from "../../assets/game_background.webp";
import adventurer from "../../assets/adventurer.svg";
import mountain from "../../assets/mountain.svg";
import treasure from "../../assets/treasure.svg";
/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface MapComponentProps {
	map: Map;
	mountains: Mountain[];
	treasures: Treasure[];
	adventurers: Adventurer[];
}

const MapComponent: React.FC<MapComponentProps> = ({ map, mountains, treasures, adventurers }) => {
	return (
		<div className={styles.container}>
			<div
				className={styles.map}
				style={{
					gridTemplateColumns: `repeat(${map.width}, 100px)`,
					gridTemplateRows: `repeat(${map.height}, 100px)`,
				}}
			>
				{mountains.map((m, index) => (
					<div
						data-testid={`mountain-${index}`}
						key={`mountain-${index}`}
						className={`${styles.map__element} ${styles.mountain}`}
						style={{ gridColumn: m.x + 1, gridRow: m.y + 1 }}
					>
						<span>M-{index}</span>
						<img src={mountain} alt="Un gros rocher gris, il est impossible de le traverser !" />
					</div>
				))}
				{treasures.map((t, index) => (
					<div
						data-testid={`treasure-${index}`}
						key={`treasure-${index}`}
						className={`${styles.map__element} ${styles.treasure}`}
						style={{ gridColumn: t.x + 1, gridRow: t.y + 1 }}
					>
						<span>{t.count}</span>
						<img src={treasure} alt="Un coffre aux innombrables trésors." />
					</div>
				))}
				{adventurers.map((a, index) => (
					<div
						data-testid={`adventurer-${index}`}
						key={`adventurer-${index}`}
						className={`${styles.map__element} ${styles.adventurer}`}
						style={{ gridColumn: a.position.x + 1, gridRow: a.position.y + 1 }}
					>
						<span>{a.name}</span>
						<img
							src={adventurer}
							alt="C'est un aventurier portant une tenue beige et un sac à dos vert, il ressemblerait presque au célèbre explorateur Indiana Jones !"
						/>
					</div>
				))}
				<img src={background} alt="Plaine fleurie et rocheuse." className={styles.map__background} />
			</div>
		</div>
	);
};

export default MapComponent;
