import { Song } from "./song.interface";

export interface Playlist {
  title: string;
  thumbnail: string;
  author: string;
  songs: Song[];
}
