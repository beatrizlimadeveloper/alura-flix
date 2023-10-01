import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer(){
  return(
      <footer className={styles.footer}>
        <Link to='/'><img src="logoAluraFlix.png" width="100" alt="logo AluraFlix" /></Link>
        <div>
          <p>Desenvolvido por <a href="https://www.linkedin.com/in/beatrizlimadeveloper/">Beatriz Lima Developer</a> &copy;2023 Alguns direitos reservados</p>
        </div>
      </footer>
    )
}

export default Footer;