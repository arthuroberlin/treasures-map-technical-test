/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface BannerProps extends React.HTMLAttributes<HTMLElement> {
	collectedTreasures: number;
	winMessage: boolean;
}

// Tests in header component (src/components/ui/Header/Header.test.tsx)

const Banner = ({ collectedTreasures, winMessage }: BannerProps) => {
	return (
		<div className={styles.container}>
			{winMessage ? <div>Bien joué 🤠🌴</div> : <p>{collectedTreasures > 0 ? collectedTreasures : "0"} 💰</p>}
		</div>
	);
};
export default Banner;
