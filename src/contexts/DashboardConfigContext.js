import db from "json/db.json";
import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export function DashboardProvider({ children }) {
  const localVideos = JSON.parse(localStorage.getItem("videos"));
  const localCategorias = JSON.parse(localStorage.getItem("categorias"));

  if (!localVideos) {
    localStorage.setItem("videos", JSON.stringify(db.videos));
  }
  if (!localCategorias) {
    localStorage.setItem("categorias", JSON.stringify(db.categorias));
  }

  const [videos, setVideos] = useState(localVideos);
  const [categorias, setCategorias] = useState(localCategorias);

  const addVideo = (newVideo) => {
    const verificaVideoUnico =
      videos.filter(
        (video) =>
          newVideo.categoria.toLowerCase() === video.categoria.toLowerCase()
      ).length === 0
        ? true
        : false;

    if (verificaVideoUnico) {
      newVideo.videoDestaque = true;
    }

    const verificaVideoEditado = videos.find(
      (video) => video.id === newVideo.id
    );

    if (verificaVideoEditado) {
      const updateVideos = videos.map((video) =>
        video.id === newVideo.id ? newVideo : video
      );
      localStorage.setItem("videos", JSON.stringify(updateVideos));
      setVideos(updateVideos);
    } else {
      localStorage.setItem("videos", JSON.stringify([newVideo, ...videos]));
      setVideos([newVideo, ...videos]);
    }
  };

  const addCategoria = (categoria) => {
    if (categorias.length === 0) {
      categoria.destaque = true;
    }

    localStorage.setItem(
      "categorias",
      JSON.stringify([...categorias, categoria])
    );
    setCategorias([...categorias, categoria]);
  };

  const mudarCorCategoria = (cor, id) => {
    categorias.map((categoria) => {
      if (categoria.id === id) {
        categoria.cor = cor;
      }
      return categoria;
    });
    localStorage.setItem("categorias", JSON.stringify(categorias));
    setCategorias(categorias);
  };

  const mudarFavorito = (id) => {
    const updatedCategorias = categorias.map((categoria) => {
      if (categoria.id !== id) {
        categoria.destaque = false;
      } else {
        categoria.destaque = true;
      }
      return categoria;
    });

    localStorage.setItem("categorias", JSON.stringify(updatedCategorias));
    setCategorias(updatedCategorias);
  };

  const mudarVideoFavorito = (idVideo, categoriaNome) => {
    const updateVideos = videos.map((video) => {
      if (video.categoria.toLowerCase() === categoriaNome.toLowerCase()) {
        if (video.id !== idVideo) {
          video.videoDestaque = false;
        } else {
          video.videoDestaque = true;
        }
      }
      return video;
    });

    localStorage.setItem("videos", JSON.stringify(updateVideos));
    setVideos(updateVideos);
  };

  const excluirCategoria = (categoriaDeletada) => {
    const idsVideosCategoriaDel = videos
      .filter(
        (video) =>
          video.categoria.toLowerCase() === categoriaDeletada.nome.toLowerCase()
      )
      .map((video) => video.id);
    const videosAtuais = videos.filter(
      (video) => !idsVideosCategoriaDel.includes(video.id)
    );
    const categoriasAtualizadas = categorias.filter(
      (cat) => cat.id !== categoriaDeletada.id
    );

    const temFavorito = categoriasAtualizadas.find((cat) => cat.destaque);

    if (!temFavorito && categoriasAtualizadas.length !== 0) {
      categoriasAtualizadas[0].destaque = true;
    }

    setCategorias(categoriasAtualizadas);
    setVideos(videosAtuais);
    localStorage.setItem("videos", JSON.stringify(videosAtuais));
    localStorage.setItem("categorias", JSON.stringify(categoriasAtualizadas));
  };

  const excluirVideo = (videoExcluido) => {
    const videosAtualizados = videos.filter(
      (video) => video.id !== videoExcluido.id
    );

    if (videoExcluido.videoDestaque) {
      const videosNaMesmaCategoria = videosAtualizados.filter(
        (video) => video.categoria === videoExcluido.categoria
      );
      const temVideoDestaque = videosNaMesmaCategoria.some(
        (video) => video.videoDestaque
      );
      if (!temVideoDestaque) {
        const primeiroVideoIndex = videosAtualizados.findIndex(
          (video) => video.categoria === videoExcluido.categoria
        );
        if (primeiroVideoIndex !== -1) {
          videosAtualizados[primeiroVideoIndex].videoDestaque = true;
        }
      }
      const temVideosNaCategoria = categoriaTemVideos(
        videoExcluido.categoria,
        videosAtualizados
      );

      if (!temVideosNaCategoria) {
        const categoriasComVideos = categorias.filter((categoria) =>
          categoriaTemVideos(categoria.nome, videosAtualizados)
        );
        if (categoriasComVideos.length > 0) {
          const primeiraCategoriaComVideos = categoriasComVideos[0].nome;
          const categoriasAtualizadas = categorias.map((cat) => {
            if (cat.nome === primeiraCategoriaComVideos) {
              cat.destaque = true;
            }else{
              cat.destaque = false;
            }
            return cat;
          });
          localStorage.setItem("categorias", JSON.stringify(categoriasAtualizadas));
          setCategorias(categoriasAtualizadas);
        }
      }
    }

    localStorage.setItem("videos", JSON.stringify(videosAtualizados));
    setVideos(videosAtualizados);
  };

  function categoriaTemVideos(categoria, videos) {
    return videos.some((video) => video.categoria === categoria);
  }

  return (
    <DashboardContext.Provider
      value={{
        videos,
        categorias,
        addVideo,
        addCategoria,
        mudarCorCategoria,
        mudarFavorito,
        excluirCategoria,
        mudarVideoFavorito,
        excluirVideo,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
