import Effect from "./Effect";
import EffectVisitor from "./EffectVisitor";

/**
 * The VolumeEffect class extends the GainNode class and implements the Effect interface.
 * It represents a volume effect that can be applied to an audio signal.
 */
export default class VolumeEffect implements Effect {
  readonly audioNode: GainNode;

  /**
   * Creates a new VolumeEffect instance.
   * @param context - The AudioContext to use.
   * @param id - The unique identifier of the volume effect.
   */
  constructor(context: AudioContext, readonly id: string) {
    this.audioNode = context.createGain();
  }

  /**
   * Accepts an EffectVisitor to perform operations on the volume effect.
   * @param visitor - The EffectVisitor instance.
   * @returns The result of the visitor operation.
   * @template T - The return type of the visitor operation.
   */
  accept<T>(visitor: EffectVisitor<T>): T {
    return visitor.visitVolumeEffect(this);
  }

  /**
   * Sets the volume value of the volume effect.
   * @param value - The new volume value.
   */
  setVolume(value: number): void {
    this.audioNode.gain.value = value;
  }
}
