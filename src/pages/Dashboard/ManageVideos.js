import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDashboardContext } from "contexts/DashboardConfigContext";
import styles from './DashboardVideos.module.css';
import { useModalFormContext } from "contexts/ModalFormContext";
import { useVideoEditContext } from "contexts/VideoEditContext";
import SemVideos from "pages/SemVideos";
import ButtonModalReset from "components/ButtonModalReset";

export default function ManageVideos() {
  const { videos, excluirVideo } = useDashboardContext();
  const {openModal} = useModalFormContext()
  const {startEditing} = useVideoEditContext()

  const handleClick = (video)=>{
    startEditing(video)
    openModal()
  }

  if (videos.length === 0) {
    return (
      <SemVideos>
        <ButtonModalReset />
      </SemVideos>
    );
  }

  return (
    <section className={styles.areaTableVideos}>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Categoria</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => (
          
          <tr key={video.id}>
              <td>
                {video.titulo}
              </td>
              <td>
                {video.categoria}
              </td>
              <td>
                <IconButton onClick={()=>handleClick(video)}>
                  <Edit/>
                </IconButton>
              </td>
              <td>
                 <IconButton onClick={()=>excluirVideo(video)}>
                  <Delete/>
                 </IconButton>
              </td>
          </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
