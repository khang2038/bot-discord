import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  VoiceConnection,
  VoiceConnectionDisconnectReason,
  VoiceConnectionState,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import { Snowflake } from "discord.js";
import { platform, Song } from "src/types/song";
import ytdl from "ytdl-core";

export interface QueueItem {
  song: Song;
  requester: string;
}

export class Server {
  public guildId: string;
  public playing?: QueueItem;
  public queue: QueueItem[];
  public readonly voiceConnection: VoiceConnection;
  public readonly audioPlayer: AudioPlayer;
  public isReady = false;

  constructor(voiceConnection: VoiceConnection, guildId: string) {
    this.voiceConnection = voiceConnection;
    this.audioPlayer = createAudioPlayer();
    this.queue = [];
    this.playing = undefined;
    this.guildId = guildId;

    this.voiceConnection.on("stateChange", async (_, newState) => {
      handleDisconnect(newState, this);
    });

    this.audioPlayer.on("stateChange", async (oldState, newState) => {
      if (
        newState.status === AudioPlayerStatus.Idle &&
        oldState.status !== AudioPlayerStatus.Idle
      ) {
        await this.play();
      }
    });

    voiceConnection.subscribe(this.audioPlayer);
  }

  public async addSongs(queueItems: QueueItem[]): Promise<void> {
    this.queue = this.queue.concat(queueItems);
    if (!this.playing) {
      await this.play();
    }
  }

  public stop(): void {
    this.playing = undefined;
    this.queue = [];
    this.audioPlayer.stop();
  }

  public leave(): void {
    if (this.voiceConnection.state.status !== VoiceConnectionStatus.Destroyed) {
      this.voiceConnection.destroy();
    }
    this.stop();
    servers.delete(this.guildId);
  }

  public pause(): void {
    this.audioPlayer.pause();
  }

  public resume(): void {
    this.audioPlayer.unpause();
  }

  public async jump(position: number): Promise<QueueItem> {
    const target = this.queue[position - 1];
    this.queue = this.queue
      .splice(0, position - 1)
      .concat(this.queue.splice(position, this.queue.length - 1));
    this.queue.unshift(target);
    await this.play();
    return target;
  }

  public remove(position: number): QueueItem {
    return this.queue.splice(position - 1, 1)[0];
  }

  public async play(): Promise<void> {
    try {
      if (this.queue.length > 0) {
        this.playing = this.queue.shift() as QueueItem;
        const highWaterMark = 1024 * 1024 * 10;
        const stream = ytdl(this.playing.song.url, {
          highWaterMark,
          filter: "audioonly",
          quality: "highestaudio",
        });
        const audioResource = createAudioResource(stream);
        this.audioPlayer.play(audioResource);
      } else {
        this.playing = undefined;
        this.audioPlayer.stop();
      }
    } catch (e) {
      this.play();
    }
  }
}

export const handleDisconnect = async (
  state: VoiceConnectionState,
  server: Server
) => {
  if (state.status === VoiceConnectionStatus.Disconnected) {
    if (
      state.reason === VoiceConnectionDisconnectReason.WebSocketClose &&
      state.closeCode === 4014
    ) {
      try {
        await entersState(
          server.voiceConnection,
          VoiceConnectionStatus.Connecting,
          5_000
        );
      } catch (e) {
        server.leave();
      }
    } else if (server.voiceConnection.rejoinAttempts < 5) {
      server.voiceConnection.rejoin();
    } else {
      server.leave();
    }
  } else if (state.status === VoiceConnectionStatus.Destroyed) {
    server.leave();
  } else if (
    !server.isReady &&
    (state.status === VoiceConnectionStatus.Connecting ||
      state.status === VoiceConnectionStatus.Signalling)
  ) {
    server.isReady = true;
    try {
      await entersState(
        server.voiceConnection,
        VoiceConnectionStatus.Ready,
        20_000
      );
    } catch {
      if (
        server.voiceConnection.state.status !== VoiceConnectionStatus.Destroyed
      )
        server.voiceConnection.destroy();
    } finally {
      server.isReady = false;
    }
  }
};

export const servers = new Map<Snowflake, Server>();
