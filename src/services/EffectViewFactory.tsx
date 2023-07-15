import { ReactNode } from "react";
import EffectVisitor from "./EffectVisitor";
import VolumeEffect from "./VolumeEffect";
import GainEffectView from "../components/GainEffectView";
import VolumeEffectView from "../components/VolumeEffectView";
import GainEffect from "./GainEffect";
import FrequencyVisualiserEffect from "./FrequencyVisualiserEffect";
import FrequencyVisualiserEffectView from "../components/FrequencyVisualiserEffectView";

/**
 * The EffectViewFactory class implements the EffectVisitor interface
 * to create React components for different types of effects.
 */
export default class EffectViewFactory implements EffectVisitor<ReactNode> {
  /**
   * Creates a React component for a GainEffect.
   *
   * @param effect - The GainEffect instance.
   * @returns The rendered GainEffectView component.
   */
  visitGainEffect(effect: GainEffect) {
    return <GainEffectView effect={effect} />;
  }

  /**
   * Creates a React component for a VolumeEffect.
   *
   * @param effect - The VolumeEffect instance.
   * @returns The rendered VolumeEffectView component.
   */
  visitVolumeEffect(effect: VolumeEffect) {
    return <VolumeEffectView effect={effect} />;
  }

  /**
   * Creates a React component for a FrequencyVisualiserEffect.
   *
   * @param effect - The FrequencyVisualiserEffect instance.
   * @returns The rendered FrequencyVisualiserEffectView component.
   */
  visitFrequencyVisualiserEffect(effect: FrequencyVisualiserEffect) {
    return <FrequencyVisualiserEffectView effect={effect} />;
  }
}
