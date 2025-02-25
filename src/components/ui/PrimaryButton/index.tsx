/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface PrimaryButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactNode;
	children?: React.ReactNode;
	disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, icon, disabled, ...restProps }) => {
	return (
		<button {...restProps} type="button" className={styles.primary__button} disabled={disabled}>
			{children}
			{icon && icon}
		</button>
	);
};

export default PrimaryButton;
