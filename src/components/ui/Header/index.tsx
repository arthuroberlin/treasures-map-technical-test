/* ----- COMPONENTS ---- */
import PrimaryButton from "../PrimaryButton";
import Banner from "../Banner";
/* ----- IMAGE ---- */
import Image from "../../../assets/logo.webp";
/* ----- STYLES ---- */
import styles from "./styles.module.css";
/* ----- ---- */

interface HeaderProps extends React.ComponentProps<"header"> {
	collectedTreasures: number;
	winMessage: boolean;
}

const Header: React.FC<HeaderProps> = ({ collectedTreasures, winMessage }) => {
	return (
		<header className={styles.header}>
			<img
				src={Image}
				alt="Carte au fond bleu avec une montagne en son centre, accompagné par deux mots Carbon et Adventure à côté."
				className={styles.header__logo}
			/>

			<Banner collectedTreasures={collectedTreasures} winMessage={winMessage} />

			<a href="https://arthuroberlin.fr/carbon" target="_blank" rel="noopener noreferrer">
				<PrimaryButton>Lien live 🧷</PrimaryButton>
			</a>
		</header>
	);
};
export default Header;
