/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

const Outputs = ({ outputs }: { outputs: string[] }) => {
	return (
		<>
			<h2 className={styles.title}>Outputs</h2>
			<div className={styles.outputs__list}>
				{outputs.length >= 1 ? (
					outputs.map((line, index) => (
						<div key={index} className={styles.output__line} data-testid={`output-line-${index}`}>
							{line}
						</div>
					))
				) : (
					<div className={styles.noInput}>
						<span>Aucun output 🌴</span>
						<span>Notre aventurier ne va pas se déplacer tout seul !</span>
					</div>
				)}
			</div>
		</>
	);
};

export default Outputs;
