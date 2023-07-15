import { useState } from "react";
import RotaryEncoder from "./RotaryEncoder";
import VolumeEffect from "../services/VolumeEffect";
import EffectView from "./EffectView";
import EffectTitle from "./EffectTitle";
import EffectStat from "./EffectStat";

/**
 * Props for the VolumeEffectView component.
 */
export interface VolumeEffectViewProps {
  /**
   * The VolumeEffect instance to display and control.
   */
  effect: VolumeEffect;
}

/**
 * VolumeEffectView component represents the view for controlling the volume of a VolumeEffect.
 * It takes an `effect` prop of type VolumeEffect to display and control.
 *
 * @param props - The VolumeEffectView component props.
 * @returns The rendered VolumeEffectView component.
 */
const VolumeEffectView = ({ effect: node }: VolumeEffectViewProps) => {
  const [value, setValue] = useState(node.audioNode.gain.value);

  return (
    <EffectView>
      <EffectTitle>Volume</EffectTitle>
      <RotaryEncoder
        min={0}
        max={1}
        value={value}
        rotations={1}
        onChange={(value) => {
          setValue(value);
          node.setVolume(value);
        }}
      />
      <EffectStat>{Math.round(100 * value)}%</EffectStat>
    </EffectView>
  );
};

export default VolumeEffectView;
