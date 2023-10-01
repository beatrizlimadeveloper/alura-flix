import Banner from "components/Banner";
import ButtonModalReset from "components/ButtonModalReset";
import CategoriaCarousel from "components/CategoriasCarousel";
import { useDashboardContext } from "contexts/DashboardConfigContext";
import SemVideos from "pages/SemVideos";

function Home() {
  const { videos, categorias } = useDashboardContext();

  const categoriaDestaque = categorias.find((categoria) => categoria.destaque);

  const videosCategoriaDestaque = videos.filter(
    (video) => video.categoria === categoriaDestaque.nome
  );
  const videoDestaque = videosCategoriaDestaque.find(
    (video) => video.videoDestaque
  );

  if(videos.length === 0){
    return(
        <SemVideos>
          <ButtonModalReset/>
        </SemVideos>
      )
  }

  return (
    <>
      <main>
        <Banner
          categoriaDestaque={categoriaDestaque}
          outrosVideosDaCategoria={videosCategoriaDestaque.filter(
            (video) => video !== videoDestaque
          )}
          videoDestaque={videoDestaque}
        />
      </main>
      <CategoriaCarousel
        videos={videos.filter(
          (video) => video.categoria !== categoriaDestaque.nome
        )}
        categorias={categorias.filter(
          (categoria) => categoria.nome !== categoriaDestaque.nome
        )}
      ></CategoriaCarousel>
    </>
  );
}

export default Home;
