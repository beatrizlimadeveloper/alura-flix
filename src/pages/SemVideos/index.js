import styles from './SemVideos.module.css'

export default function SemVideos({children}){
  return(
      <section className={styles.semVideos}>
        <h1>Parece que não há vídeos ou categorias cadastradas no momento, clique no botão acima para adicionar uma categoria ou vídeo, se preferir, você pode reinicar a aplicação utilizando o botão abaixo.</h1>
        {children}
      </section>
    )
}