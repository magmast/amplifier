import FrequencyVisualiserEffect from "./FrequencyVisualiserEffect";
import GainEffect from "./GainEffect";
import VolumeEffect from "./VolumeEffect";

/**
 * The EffectVisitor interface defines methods for visiting different types of effects.
 * @template T - The return type of the visitor methods.
 */
export default interface EffectVisitor<T> {
  /**
   * Visits a GainEffect.
   * @param effect - The GainEffect instance to visit.
   * @returns The result of visiting the GainEffect.
   */
  visitGainEffect(effect: GainEffect): T;

  /**
   * Visits a VolumeEffect.
   * @param effect - The VolumeEffect instance to visit.
   * @returns The result of visiting the VolumeEffect.
   */
  visitVolumeEffect(effect: VolumeEffect): T;

  /**
   * Visits a FrequencyVisualiserEffect.
   * @param effect - The FrequencyVisualiserEffect instance to visit.
   * @returns The result of visiting the FrequencyVisualiserEffect.
   */
  visitFrequencyVisualiserEffect(effect: FrequencyVisualiserEffect): T;
}
