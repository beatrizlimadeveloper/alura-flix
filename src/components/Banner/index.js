import CarouselSwiper from "components/CarouselSwiper";
import styles from "./Banner.module.css";
import { Typography } from "@mui/material";
import { getContrast } from "polished";

function Banner({ outrosVideosDaCategoria, categoriaDestaque, videoDestaque }) {

  const contrastRatio = getContrast(categoriaDestaque.cor, "#f6f6f6");
  const textColor = contrastRatio >= 4.5 ? "#f6f6f6" : "#080808";

  return (
    <>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${videoDestaque.capa})` }}
      >
        <div className={styles.flex}>
          <div className={styles.textos}>
            <Typography
              style={{ backgroundColor: categoriaDestaque.cor, color: textColor }}
              className="tituloCategoria"
              variant="h3"
              component="h1"
              marginBottom='1rem'
            >
              {categoriaDestaque.nome}
            </Typography>
            <Typography
              className="tituloVideo"
              variant="h4"
              component="h2"
              marginBottom="1rem"
              fontFamily="Roboto Condensed"
              fontWeight="600"
            >
              {videoDestaque.titulo}
            </Typography>
            <p className={styles.descricao}>{videoDestaque.descricao}</p>
          </div>
          <div>
            <iframe
            style={{border: `3px solid ${categoriaDestaque.cor}`}}
              width="560"
              height="315"
              src={videoDestaque.linkEmbed}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture;"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <CarouselSwiper cor={categoriaDestaque.cor} videos={outrosVideosDaCategoria}></CarouselSwiper>
    </>
  );
}

export default Banner;
