import { youtubePlaylistRegex, youtubeVideoRegex } from "src/constants/regex";
import { Playlist } from "src/types/playlists";
import { Song, platform } from "src/types/song";
import play from "play-dl";
import ytpl from "ytpl";
import ytsr, { Video } from "ytsr";

export class YoutubeService {
  public static async getVideoDetails(content: string): Promise<Song> {
    const parsedContent = content.match(youtubeVideoRegex);
    let id = "";
    if (!parsedContent) {
      const result = await this.searchVideo(content);
      if (!result) throw new Error();
      id = result;
    } else {
      id = parsedContent[1];
    }
    const videoUrl = this.generateVideoUrl(id);

    const result = await play.video_info(videoUrl);
    return {
      title: result.video_details.title as string,
      length: result.video_details.durationInSec,
      author: result.video_details.channel?.name as string,
      thumbnail:
        result.video_details.thumbnails[
          result.video_details.thumbnails.length - 1
        ].url,
      url: videoUrl,
      platform: platform.YOUTUBE,
    };
  }

  public static async getPlaylist(url: string): Promise<Playlist> {
    const id = url.split("?")[1].split("=")[1];
    const playlist = await ytpl(id);
    const songs: Song[] = [];
    playlist.items.forEach((item) => {
      songs.push({
        title: item.title,
        thumbnail: item.bestThumbnail.url || "",
        author: item.author.name,
        url: item.shortUrl,
        length: item.durationSec || 0,
        platform: platform.YOUTUBE,
      });
    });

    return {
      title: playlist.title,
      thumbnail: playlist.bestThumbnail.url || "",
      author: playlist.author.name,
      songs,
    };
  }

  private static async searchVideo(keyword: string): Promise<string> {
    const result = await ytsr(keyword, { pages: 1 });
    const filteredRes = result.items.filter((item) => item.type === "video");
    if (filteredRes.length === 0) throw new Error();
    const item = filteredRes[0] as Video;
    return item.id;
  }

  public static isPlaylist(url: string): string | null {
    const paths = url.match(youtubePlaylistRegex);
    if (paths) return paths[0];
    return null;
  }

  private static generateVideoUrl(id: string) {
    return `https://www.youtube.com/watch?v=${id}`;
  }
}
