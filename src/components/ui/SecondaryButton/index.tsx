/* ----- TYPES ---- */
import { Scenario } from "../../../types";
/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface SecondaryButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	scenario: Scenario;
	index?: number;
	loadScenario: (scenario: Scenario) => void;
	children?: React.ReactNode;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ scenario, index, loadScenario, children, ...restProps }) => {
	return (
		<button
			{...restProps}
			type="button"
			className={styles.secondary__button}
			onClick={() => scenario && loadScenario && loadScenario(scenario)}
			data-testid={`load-scenario-button-${index}`}
		>
			Scénario {index}
		</button>
	);
};

export default SecondaryButton;
