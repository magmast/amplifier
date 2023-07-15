import EffectVisitor from "./EffectVisitor";

/**
 * The Effect interface represents an audio effect that extends the AudioNode interface.
 */
export default interface Effect {
  /**
   * The unique identifier of the effect.
   */
  readonly id: string;

  /**
   * The underlying AudioNode associated with the effect.
   */
  readonly audioNode: AudioNode;

  /**
   * Accepts an EffectVisitor to perform operations on the effect.
   *
   * @param visitor - The EffectVisitor instance.
   * @returns The result of the visitor operation.
   * @template T - The return type of the visitor operation.
   */
  accept<T>(visitor: EffectVisitor<T>): T;
}
