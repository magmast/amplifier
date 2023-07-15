import { useState } from "react";
import RotaryEncoder from "./RotaryEncoder";
import mapValue from "../utils/mapValue";
import GainEffect from "../services/GainEffect";
import EffectView from "./EffectView";
import EffectTitle from "./EffectTitle";
import EffectStat from "./EffectStat";

/**
 * Props for the GainEffectView component.
 */
export interface GainEffectViewProps {
  /**
   * The GainEffect instance to display and control.
   */
  effect: GainEffect;
}

/**
 * GainEffectView component represents the view for controlling the gain of a GainEffect.
 * It takes an `effect` prop of type GainEffect to display and control.
 */
const GainEffectView = ({ effect }: GainEffectViewProps) => {
  const [value, setValue] = useState(effect.audioNode.gain.value);

  return (
    <EffectView>
      <EffectTitle>Gain</EffectTitle>
      <RotaryEncoder
        min={1}
        max={50}
        value={value}
        onChange={(value) => {
          setValue(value);
          effect.setGain(value);
        }}
      />
      <EffectStat>
        {Math.round(mapValue({ value, input: [1, 50], output: [0, 100] }))}%
      </EffectStat>
    </EffectView>
  );
};

export default GainEffectView;
