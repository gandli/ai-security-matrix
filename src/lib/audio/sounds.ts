/**
 * WebAudio sound engine — tiny, synthetic, zero assets
 * Mirrors cue-based approach from cuesite but fully inline
 */

export type SoundName = 'hover' | 'click' | 'toggle' | 'focus';

class SoundEngine {
  ctx: AudioContext | null = null;
  volume: number = 0.08; // subtle, professional (0-1)
  enabled: boolean = false;
  private oscMap = new Map<string, { start: number; gain: GainNode }>();

  async init(): Promise<void> {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.enabled = true;
  }

  setVolume(v: number): void {
    this.volume = Math.max(0, Math.min(1, v));
  }

  toggleEnabled(force?: boolean): boolean {
    this.enabled = force !== undefined ? force : !this.enabled;
    return this.enabled;
  }

  isAudioReady(): boolean {
    return !!this.ctx && this.ctx.state === 'running';
  }

  play(sound: SoundName, options?: { volume?: number }): void {
    if (!this.isAudioReady()) return;
    
    const vol = options?.volume ?? this.volume;
    
    switch (sound) {
      case 'hover':
        this.playHover(vol);
        break;
      case 'click':
        this.playClick(vol);
        break;
      case 'toggle':
        this.playToggle(vol);
        break;
      case 'focus':
        this.playFocus(vol);
        break;
    }
  }

  private playHover(volume: number): void {
    const now = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    
    // Soft tick: quick sine sweep
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
    
    gain.gain.setValueAtTime(volume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    
    osc.start(now);
    osc.stop(now + 0.05);
  }

  private playClick(volume: number): void {
    const now = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    
    // Gentle click: triangle with decay
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    
    gain.gain.setValueAtTime(volume * 0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    osc.start(now);
    osc.stop(now + 0.08);
  }

  private playToggle(volume: number): void {
    const now = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    
    // Satisfying toggle: square wave, slightly longer
    osc.type = 'square';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.linearRampToValueAtTime(300, now + 0.1);
    
    gain.gain.setValueAtTime(volume * 0.6, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.1);
  }

  private playFocus(volume: number): void {
    const now = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    
    // Soft chime for focus state
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
    
    gain.gain.setValueAtTime(volume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }

  destroy(): void {
    this.ctx?.close();
    this.ctx = null;
  }
}

export const audio = new SoundEngine();
