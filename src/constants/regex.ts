export const youtubeVideoRegex = new RegExp(
  /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11})/
);
export const youtubePlaylistRegex = new RegExp(
  /(https?:\/\/)?(www\.)?(youtube\.com\/playlist\?list=)([a-zA-Z0-9\-_]+)/g
);
