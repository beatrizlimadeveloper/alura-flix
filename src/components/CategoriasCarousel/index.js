import styles from "./CategoriasCarousel.module.css";
import { Typography } from "@mui/material";
import CarouselSwiper from "components/CarouselSwiper";
import { getContrast } from "polished";

function CategoriaCarousel({ videos, categorias }) {
  return (
    <section className={styles.container}>
      {categorias.map((categoria) => {
        const contrastRatio = getContrast(categoria.cor, "#f6f6f6");
        const textColor = contrastRatio >= 4.5 ? "#f6f6f6" : "#080808";

        const videosPorCategoria = videos.filter(
          (video) => video.categoria === categoria.nome
        );

        return (
          videosPorCategoria.length > 0 && (
            <div className={styles.categoriaCarousel} key={categoria.nome}>
              <Typography
                className="tituloCategoria"
                style={{ backgroundColor: categoria.cor, color: textColor }}
                variant="h5"
                component="h3"
                marginBottom="1rem"
              >
                {categoria.nome}
              </Typography>
              <CarouselSwiper
                videos={videosPorCategoria}
                cor={categoria.cor}
              ></CarouselSwiper>
            </div>
          )
        );
      })}
    </section>
  );
}

export default CategoriaCarousel;
