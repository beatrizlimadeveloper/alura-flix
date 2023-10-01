import styles from "./Dashboard.module.css";
import {
  Alert,
  AlertTitle,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import {
  Delete,
  FavoriteBorder,
  FavoriteOutlined,
  VideoSettings,
} from "@mui/icons-material";
import { useDashboardContext } from "contexts/DashboardConfigContext";
import { useEffect, useState } from "react";
import BoxConfirmacao from "components/ModalBoxConfirmacao";
import ActionButtonsForms from "components/ActionButtonsForm";
import SemVideos from "pages/SemVideos";
import ButtonModalReset from "components/ButtonModalReset";
import { Link } from "react-router-dom";

function ColorPicker({ categoria, onChange }) {
  const [localColor, setLocalColor] = useState(categoria.cor);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
  };

  const handleColorBlur = () => {
    onChange(localColor);
  };

  return (
    <TextField
      className={styles.selectCor}
      id={categoria.nome}
      size="small"
      type="color"
      label="Cor"
      fullWidth
      value={localColor}
      onChange={handleColorChange}
      onBlur={handleColorBlur}
    />
  );
}

export default function Dashboard() {
  const {
    videos,
    categorias,
    mudarCorCategoria,
    mudarFavorito,
    mudarVideoFavorito,
    excluirCategoria,
  } = useDashboardContext();

  const [idCategoriaDelete, setIdCategoriaDelete] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const initialVideoDestaquePorCategoria = categorias.reduce(
    (acc, categoria) => {
      const videosPorCategoria = videos.filter(
        (video) => video.categoria === categoria.nome
      );
      const videoDestaque = videosPorCategoria.find(
        (video) => video.videoDestaque
      );

      if (videoDestaque) {
        acc[categoria.id] = videoDestaque.id;
      }
      return acc;
    },
    {}
  );

  const [videoDestaquePorCategoria, setVideoDestaquePorCategoria] = useState(
    initialVideoDestaquePorCategoria
  );

  const handleVideoDestaqueChange = (categoriaId, videoId, categoriaNome) => {
    setVideoDestaquePorCategoria((prevState) => ({
      ...prevState,
      [categoriaId]: videoId,
    }));
    mudarVideoFavorito(videoId, categoriaNome);
  };

  const excluir = (cat) => {
    setConfirmado(true);
    excluirCategoria(cat);
  };

  const handleClose = () => {
    setOpenModal(false);
    setConfirmado(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (confirmado) {
      const timer = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [confirmado]);

  if (videos.length === 0 || categorias.length === 0) {
    return (
      <SemVideos>
        <ButtonModalReset />
      </SemVideos>
    );
  }

  return (
    <section className={styles.tableArea}>
      {isMobile ? (
        <>
          {categorias.map((cat) => {
            const videosPorCategoria = videos.filter(
              (video) => video.categoria === cat.nome
            );
            const disabled = videosPorCategoria.length <= 0 ? true : false;

            return (
              <table className={styles.mobile} key={cat.id}>
                <tbody>
                  <tr>
                    <th>Categoria</th>
                    <td>{cat.nome}</td>
                  </tr>
                  <tr>
                    <th>Cor</th>
                    <td className={styles.tdCor}>
                      <ColorPicker
                        categoria={cat}
                        onChange={(newColor) =>
                          mudarCorCategoria(newColor, cat.id)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Video Destaque</th>
                    <td className={styles.tdVideoDestaque}>
                      <FormControl
                        disabled={disabled}
                        margin="normal"
                        size="small"
                        sx={{
                          maxWidth: 200,
                          minWidth: 200,
                          color: "var(--white)",
                        }}
                      >
                        <InputLabel id={`video-${cat.id}`}>
                          Selecione o Vídeo
                        </InputLabel>
                        <Select
                          labelId={`video-${cat.id}`}
                          id={`video-${cat.id}`}
                          name={`video-${cat.id}`}
                          label="Selecione o Vídeo"
                          value={videoDestaquePorCategoria[cat.id] || ""}
                          onChange={(e) =>
                            handleVideoDestaqueChange(
                              cat.id,
                              e.target.value,
                              cat.nome
                            )
                          }
                        >
                          {videosPorCategoria.map((video) => (
                            <MenuItem key={video.id} value={video.id}>
                              {video.titulo}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <th>Banner</th>
                    <td>
                      <IconButton
                        disabled={disabled}
                        variant="solid"
                        onClick={() => {
                          mudarFavorito(cat.id);
                        }}
                      >
                        {cat.destaque ? (
                          <FavoriteOutlined sx={{ color: "var(--white)" }} />
                        ) : (
                          <FavoriteBorder sx={{ color: "var(--white)" }} />
                        )}
                      </IconButton>
                    </td>
                  </tr>
                  <tr>
                    <th>Deletar</th>
                    <td>
                      {" "}
                      <IconButton
                        onClick={() => {
                          setOpenModal(true);
                          setIdCategoriaDelete({
                            id: cat.id,
                            nome: cat.nome,
                          });
                        }}
                      >
                        <Delete />
                      </IconButton>
                      <Modal
                        open={openModal}
                        onClose={() => handleClose()}
                        aria-labelledby="modal para confirmar exclusão de categorias e videos"
                        aria-describedby="Confirme ou Cancele a exclusão da categoria e dos videos da categoria"
                      >
                        <Box className={styles.boxModalDel}>
                          <BoxConfirmacao
                            confirmacao={confirmado}
                            textConfirmacao="Excluído com sucesso!"
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
                              Excluir a categoria também excluíra todos os
                              vídeos dessa categoria.
                            </Alert>
                            <Typography
                              fontFamily={"var(--font-padrao)"}
                              textAlign={"center"}
                              fontSize={"1.2rem"}
                            >
                              Você deseja confirmar a exclusão?
                            </Typography>

                            <ActionButtonsForms
                              bgColor="var(--red-600)"
                              hover="var(--red-800)"
                              textColor="var(--white)"
                              onClick={() => excluir(idCategoriaDelete)}
                              handleClose={() => handleClose()}
                              textBtnSubmit="Confirmar"
                            />
                          </BoxConfirmacao>
                        </Box>
                      </Modal>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Categorias</th>
              <th>Cor</th>
              <th>Quantidade de videos</th>
              <th>Video Destaque</th>
              <th>Banner</th>
              <th>Excluir?</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => {
              const videosPorCategoria = videos.filter(
                (video) => video.categoria === categoria.nome
              );
              const disabled = videosPorCategoria.length <= 0 ? true : false;

              const contemVideo =
                videos.filter((video) => video.categoria === categoria.nome)
                  .length > 0
                  ? true
                  : false;

              return (
                <tr key={categoria.id}>
                  {contemVideo && (
                    <>
                      <td>{categoria.nome}</td>
                      <td className={styles.tdCor}>
                        <ColorPicker
                          categoria={categoria}
                          onChange={(newColor) =>
                            mudarCorCategoria(newColor, categoria.id)
                          }
                        />
                      </td>
                      <td>{videosPorCategoria.length}</td>
                      <td className={styles.tdVideoDestaque}>
                        <FormControl
                          disabled={disabled}
                          margin="normal"
                          size="small"
                          sx={{ maxWidth: 250, color: "var(--white)" }}
                        >
                          <InputLabel id={`video-${categoria.id}`}>
                            Selecione o Vídeo
                          </InputLabel>
                          <Select
                            labelId={`video-${categoria.id}`}
                            id={`video-${categoria.id}`}
                            name={`video-${categoria.id}`}
                            label="Selecione o Vídeo"
                            value={
                              videoDestaquePorCategoria[categoria.id] || ""
                            }
                            onChange={(e) =>
                              handleVideoDestaqueChange(
                                categoria.id,
                                e.target.value,
                                categoria.nome
                              )
                            }
                          >
                            {videosPorCategoria.map((video) => (
                              <MenuItem key={video.id} value={video.id}>
                                {video.titulo}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </td>
                      <td>
                        <IconButton
                          disabled={disabled}
                          variant="solid"
                          onClick={() => {
                            mudarFavorito(categoria.id);
                          }}
                        >
                          {categoria.destaque ? (
                            <FavoriteOutlined sx={{ color: "var(--white)" }} />
                          ) : (
                            <FavoriteBorder sx={{ color: "var(--white)" }} />
                          )}
                        </IconButton>
                      </td>
                      <td>
                        <IconButton
                          onClick={() => {
                            setOpenModal(true);
                            setIdCategoriaDelete({
                              id: categoria.id,
                              nome: categoria.nome,
                            });
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <Modal
                          open={openModal}
                          onClose={() => handleClose()}
                          aria-labelledby="modal para confirmar exclusão de categorias e videos"
                          aria-describedby="Confirme ou Cancele a exclusão da categoria e dos videos da categoria"
                        >
                          <Box className={styles.boxModalDel}>
                            <BoxConfirmacao
                              confirmacao={confirmado}
                              textConfirmacao="Excluído com sucesso!"
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
                                Excluir a categoria também excluíra todos os
                                vídeos dessa categoria.
                              </Alert>
                              <Typography
                                fontFamily={"var(--font-padrao)"}
                                textAlign={"center"}
                                fontSize={"1.2rem"}
                              >
                                Você deseja confirmar a exclusão?
                              </Typography>

                              <ActionButtonsForms
                                bgColor="var(--red-600)"
                                hover="var(--red-800)"
                                textColor="var(--white)"
                                onClick={() => excluir(idCategoriaDelete)}
                                handleClose={() => handleClose()}
                                textBtnSubmit="Confirmar"
                              />
                            </BoxConfirmacao>
                          </Box>
                        </Modal>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className={styles.flex}>
        <ButtonModalReset />
        <Button
          component={Link}
          className={styles.button}
          endIcon={<VideoSettings />}
          variant="outlined"
          size="large"
          aria-label="adicionar novo vídeo"
          to="/dashboard-videos"
        >
          Gerenciar Vídeos
        </Button>
      </div>
    </section>
  );
}
