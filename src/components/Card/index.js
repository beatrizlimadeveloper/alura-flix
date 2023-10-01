import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({titulo, linkRedirect, capa, cor}) {
  return (
    <div className={styles.card} style={{border: `3px solid ${cor}`}}>
      <Link to={linkRedirect} target="_blank">
        <img src={capa} alt={titulo}/>
      </Link>
    </div>
  );
}

export default Card;
