import styles from "./ChildForm.module.css";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import BoxConfirmacao from "components/ModalBoxConfirmacao";
import ActionButtonsForms from "components/ActionButtonsForm";

export default function ChildModalCategoria({ addCategoria, categorias }) {
  const [cor, setCor] = useState("#ffffff");
  const [nome, setNome] = useState("");
  const [open, setOpen] = useState(false);
  const [categoriaEnviada, setCategoriaEnviada] = useState(false);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCategoriaEnviada(false);
    setNome("");
  };

  const enviaCategoria = () => {
    if (nome !== "" && !categorias.find(cat => cat.nome === nome)) {
      const newCategoria = { id: uuid(), nome, cor, destaque: false };
      addCategoria(newCategoria);
      setCategoriaEnviada(true);
    }
  };

  useEffect(() => {
    if (categoriaEnviada) {
      const timer = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [categoriaEnviada]);

  return (
    <>
      <Typography variant="body2" component="p">
        Não encontrou a categoria que precisava?
      </Typography>
      <Button
        size="small"
        sx={{
          color: "var(--blue-700)",
          fontFamily: "var(--font-padrao)",
          fontWeight: 600,
          padding: 0,
          ":hover": { background: "none" },
        }}
        onClick={handleOpen}
      >
        Clique aqui para uma nova categoria.
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="formulário de adição de categoria"
        aria-describedby="adicione uma nova categoria ao AluraFlix"
      >
        <Box className={styles.boxChildModal}>
          <Typography
            variant="h5"
            align="center"
            color="var(--white)"
            component="p"
            fontFamily="var(--font-titulo)"
            fontWeight={600}
          >
            Nova categoria
          </Typography>

          <BoxConfirmacao
            textConfirmacao="Categoria cadastrada!"
            confirmacao={categoriaEnviada}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                value={nome}
                label="Nome da Categoria"
                id="nome"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => setNome(e.target.value)}
              />
              <TextField
                type="color"
                value={cor}
                label="Selecione a Cor"
                id="cor"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => setCor(e.target.value)}
              />
              <ActionButtonsForms
                bgColor="var(--blue-800)"
                textColor="var(--white)"
                onClick={enviaCategoria}
                handleClose={handleClose}
                textBtnSubmit="Adicionar"
              />
            </form>
          </BoxConfirmacao>
        </Box>
      </Modal>
    </>
  );
}
