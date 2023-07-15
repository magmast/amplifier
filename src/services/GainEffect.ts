import Effect from "./Effect";
import EffectVisitor from "./EffectVisitor";

/**
 * The GainEffect class extends the GainNode class and implements the Effect interface.
 * It represents a gain effect that can be applied to an audio signal.
 */
export default class GainEffect implements Effect {
  readonly audioNode: GainNode;

  /**
   * Creates a new GainEffect instance.
   * @param context - The AudioContext to use.
   * @param id - The unique identifier of the gain effect.
   */
  constructor(context: AudioContext, readonly id: string) {
    this.audioNode = context.createGain();
  }

  /**
   * Accepts an EffectVisitor to perform operations on the gain effect.
   * @param visitor - The EffectVisitor instance.
   * @returns The result of the visitor operation.
   * @template T - The return type of the visitor operation.
   */
  accept<T>(visitor: EffectVisitor<T>): T {
    return visitor.visitGainEffect(this);
  }

  /**
   * Sets the gain value of the gain effect.
   * @param value - The new gain value.
   */
  setGain(value: number): void {
    this.audioNode.gain.value = value;
  }
}
