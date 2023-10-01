import styles from "./ButtonModalReset.module.css";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import ActionButtonsForms from "components/ActionButtonsForm";
import BoxConfirmacao from "components/ModalBoxConfirmacao";
import { useEffect, useState } from "react";

export default function ButtonModalReset() {
  const [confirmado, setConfirmado] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const resetApp = () => {
    setConfirmado(true);
    localStorage.clear();
  };

  useEffect(() => {
    if (confirmado) {
      const timer = setTimeout(() => {
        setOpenModal(false);
        window.location.reload();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [confirmado]);

  return (
    <>
      <Button
        className={styles.buttonReset}
        type="button"
        size="large"
        variant="outlined"
        onClick={() => setOpenModal(true)}
      >
        Resetar aplicação
      </Button>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal para resetar a aplicação ao estado inicial"
        aria-describedby="irá restaurar os videos e categoria da aplicação default"
      >
        <Box className={styles.boxModalReset}>
          <BoxConfirmacao
            confirmacao={confirmado}
            textConfirmacao="Aplicação Reinicializada!"
          >
            <Alert
              severity="warning"
              variant="outlined"
              sx={{
                mb: 2,
                fontFamily: "var(--font-padrao)",
                fontSize: "1.1rem",
              }}
            >
              <AlertTitle>Atenção!</AlertTitle>
              Ao resetar a aplicação, toda configuração atual e vídeos que foram
              adicionados serão perdidos e o padrão inicial será reestabelecido.
            </Alert>
            <Typography
              fontFamily={"var(--font-padrao)"}
              textAlign={"center"}
              fontSize={"1.2rem"}
            >
              Confirmar reset?
            </Typography>

            <ActionButtonsForms
              bgColor="var(--red-600)"
              hover="var(--red-800)"
              textColor="var(--white)"
              onClick={resetApp}
              handleClose={() => setOpenModal(false)}
              textBtnSubmit="Resetar"
            />
          </BoxConfirmacao>
        </Box>
      </Modal>
    </>
  );
}
