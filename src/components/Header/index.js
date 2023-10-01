import styles from "./Header.module.css";
import Formulario from "components/Formulario";
import Button from "@mui/material/Button"
import { Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { Add, Dashboard } from "@mui/icons-material";
import { useModalFormContext } from "contexts/ModalFormContext";
import { useVideoEditContext } from "contexts/VideoEditContext";

function Header() {

  const {isOpen, closeModal, openModal} = useModalFormContext();
  const {stopEditing} = useVideoEditContext();

  const handleClose = ()=>{
    closeModal();
    stopEditing();
  }

  return (
    <header className={styles.container}>
      <Link to="/">
        <img src="logoAluraFlix.png" width="150" alt="logo AluraFlix" />
      </Link>
      <div className={styles.wrap}>
        <Button
          component={Link}
          className={styles.button}
          endIcon={<Dashboard />}
          variant="outlined"
          size="large"
          aria-label="adicionar novo vídeo"
          to="/dashboard" 
        >
          Painel de Controle
        </Button>
        <Button
          className={styles.button}
          variant="outlined"
          size="large"
          endIcon={<Add />}
          aria-label="adicionar novo vídeo"
          onClick={openModal}
        >
          Novo Vídeo
        </Button>
      </div>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="formulário de adição de video"
        aria-describedby="adicione um novo vídeo ao AluraFlix"
      >
        <Box className={styles.boxModal}>
          <Formulario handleCloseModal={handleClose} />
        </Box>
      </Modal>
    </header>
  );
}

export default Header;
