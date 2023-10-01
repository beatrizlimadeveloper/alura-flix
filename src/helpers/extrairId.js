 //função para extrair id dos links youtube
 export function extrairIDDoVideo(link) {
  if (link) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = link.match(regex);
    if (match) {
      const videoId = match[1];
      return videoId;
    } else {
      console.log("Erro ao gerar ID");
    }
  }
}