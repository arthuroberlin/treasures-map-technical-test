/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface PlayButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	playTheGame: () => void;
	children?: React.ReactNode;
}

const PlayButton: React.FC<PlayButtonProps> = ({ children, playTheGame, ...restProps }) => {
	return (
		<button
			{...restProps}
			type="button"
			data-testid="play-button"
			className={styles.play__button}
			onClick={playTheGame}
		>
			{children}
		</button>
	);
};

export default PlayButton;
