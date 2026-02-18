import { Howl } from "howler";

// Audio manager สำหรับจัดการเสียงในเกม
export class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private musicVolume: number = 0.7;
  private sfxVolume: number = 0.8;

  // โหลดเสียง
  loadSound(key: string, src: string, options?: { loop?: boolean; volume?: number }) {
    const sound = new Howl({
      src: [src],
      loop: options?.loop || false,
      volume: options?.volume || this.sfxVolume,
      html5: true, // ใช้ HTML5 Audio สำหรับ mobile
    });

    this.sounds.set(key, sound);
    return sound;
  }

  // เล่นเสียง
  play(key: string) {
    const sound = this.sounds.get(key);
    if (sound) {
      sound.play();
    }
  }

  // หยุดเสียง
  stop(key: string) {
    const sound = this.sounds.get(key);
    if (sound) {
      sound.stop();
    }
  }

  // หยุดเสียงทั้งหมด
  stopAll() {
    this.sounds.forEach((sound) => sound.stop());
  }

  // ตั้งค่าระดับเสียง music
  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
  }

  // ตั้งค่าระดับเสียง SFX
  setSFXVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  // ปิดเสียงทั้งหมด
  mute() {
    Howler.mute(true);
  }

  // เปิดเสียงทั้งหมด
  unmute() {
    Howler.mute(false);
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
