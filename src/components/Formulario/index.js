import { v4 as uuid } from "uuid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDashboardContext } from "contexts/DashboardConfigContext";
import { useVideoEditContext } from "contexts/VideoEditContext";
import { useEffect, useState } from "react";
import { extrairIDDoVideo } from "helpers/extrairId";
import ChildModalCategoria from "./childModalCategoria";
import BoxConfirmacao from "components/ModalBoxConfirmacao";
import ActionButtonsForms from "components/ActionButtonsForm";

export default function Formulario({ handleCloseModal }) {
  const [titulo, setTitulo] = useState("");
  const [linkRedirect, setLinkRedirect] = useState("");
  const [capa, setCapa] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [linkEmbed, setEmbed] = useState("");
  const [videoEnviado, setVideoEnviado] = useState(false);

  const { addVideo, addCategoria, categorias } = useDashboardContext();
  const { videoToEdit, stopEditing } = useVideoEditContext();

  //atraves do id extraido, gera link embed e url da capa do video (youtube apenas)
  function geraEmbedAndCapa(videoId) {
    if (videoId) {
      setCapa(`https://i.ytimg.com/vi/${videoId}/0.jpg`);
      setEmbed(`https://youtube.com/embed/${videoId}`);
    }
  }

  //coleta os dados do video e confirma o envio
  const handleSubmit = (e) => {
    e.preventDefault();

    const video = {
      id: uuid(),
      titulo,
      descricao,
      capa,
      linkRedirect,
      linkEmbed,
      categoria,
      videoDestaque: false,
    };

    if (video.titulo !== "") {
      setVideoEnviado(true);
      if(videoToEdit !== null){
        video.id = videoToEdit.id
        if(videoToEdit.videoDestaque){
          video.videoDestaque = true;
        }
      }
      addVideo(video);
    }
    stopEditing();
  };

  //caso formulário tenha sido chamado através da página de edição, inicia o formulário preenchido

  useEffect(() => {
    if (videoToEdit) {
      setCapa(videoToEdit.capa);
      setTitulo(videoToEdit.titulo);
      setLinkRedirect(videoToEdit.linkRedirect);
      setCategoria(videoToEdit.categoria);
      setDescricao(videoToEdit.descricao);
    }
  }, [videoToEdit]);

  //chama função de fechar modal ao concluir o envio do video
  useEffect(() => {
    if (videoEnviado) {
      const timer = setTimeout(() => {
        handleCloseModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [videoEnviado, handleCloseModal]);

  return (
    <BoxConfirmacao
      textConfirmacao="Vídeo enviado com sucesso!!!"
      confirmacao={videoEnviado}
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          align="center"
          color="var(--white)"
          component="p"
          fontFamily="var(--font-titulo)"
          fontWeight={600}
        >
          Novo Vídeo
        </Typography>
        <TextField
          required
          label="Título"
          name="titulo"
          id="titulo"
          variant="outlined"
          margin="normal"
          fullWidth
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextField
          required
          type="url"
          placeholder="ex: https://www.youtube.com/watch?v=id"
          label="Link do Vídeo (Youtube)"
          name="linkRedirect"
          id="linkRedirect"
          variant="outlined"
          margin="normal"
          fullWidth
          value={linkRedirect}
          onChange={(e) => setLinkRedirect(e.target.value)}
          onBlur={(e) => geraEmbedAndCapa(extrairIDDoVideo(e.target.value))}
        />
        <TextField
          type="url"
          placeholder="https://exemplo.com"
          label="Link da Imagem do vídeo"
          name="capa"
          id="capa"
          variant="outlined"
          fullWidth
          margin="normal"
          value={capa}
          onChange={(e) => setCapa(e.target.value)}
        />
        <FormControl margin="normal" fullWidth required>
          <InputLabel id="categoria">Categoria</InputLabel>
          <Select
            labelId="categoria"
            id="categoria"
            label="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((categoria) => (
              <MenuItem
                key={uuid()}
                value={categoria.nome}
                sx={{ textTransform: "capitalize" }}
              >
                {categoria.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ChildModalCategoria
          addCategoria={addCategoria}
          categorias={categorias}
        />
        <TextField
          required
          label="Descrição"
          name="descricao"
          id="descricao"
          variant="outlined"
          margin="normal"
          placeholder="Forneça uma breve descrição sobre o vídeo"
          multiline
          rows={3}
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <ActionButtonsForms
          textBtnSubmit="Enviar"
          type="submit"
          bgColor="var(--blue-800)"
          textColor="var(--white)"
          handleClose={handleCloseModal}
        />
      </form>
    </BoxConfirmacao>
  );
}
