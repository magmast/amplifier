import { Line, OrthographicCamera, Plane, Text } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { observer } from "mobx-react-lite";
import FrequencyVisualiserEffect from "../services/FrequencyVisualiserEffect";
import mapValue from "../utils/mapValue";
import range from "../utils/range";
import EffectView from "./EffectView";

/**
 * Props for the FrequencyVisualiserEffectView component.
 */
export interface FrequencyVisualiserEffectViewProps {
  effect: FrequencyVisualiserEffect;
}

/**
 * FrequencyVisualiserEffectView component displays a visual representation of a FrequencyVisualiserEffect.
 * It takes an `effect` prop of type FrequencyVisualiserEffect to visualize.
 */
const FrequencyVisualiserEffectView = ({
  effect,
}: FrequencyVisualiserEffectViewProps) => (
  <EffectView className="w-full p-0">
    <Canvas>
      <InsideCanvas effect={effect} />
    </Canvas>
  </EffectView>
);

export default FrequencyVisualiserEffectView;

interface InsideCanvasProps {
  effect: FrequencyVisualiserEffect;
}

/**
 * InsideCanvas component is an observer that renders the content inside the Canvas of FrequencyVisualiserEffectView.
 * It takes an `effect` prop of type FrequencyVisualiserEffect.
 */
const InsideCanvas = observer(({ effect }: InsideCanvasProps) => {
  const viewport = useThree(({ viewport }) => viewport);
  const max = Math.max(...effect.frequencies.map(({ volume }) => volume));
  const min = Math.min(...effect.frequencies.map(({ volume }) => volume));

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 1000]} zoom={20} />

      {effect.frequencies.map(({ frequency, volume }, index) => (
        <group
          key={frequency}
          position-x={mapValue({
            value: index,
            input: [0, effect.frequencies.length],
            output: [-viewport.width / 2, viewport.width / 2],
          })}
        >
          <Plane
            scale={[
              viewport.width / effect.frequencies.length,
              mapValue({
                value: volume,
                input: [min, max],
                output: [0, viewport.height],
              }),
              1,
            ]}
          />
        </group>
      ))}

      <Line
        color={0xaaaaaa}
        points={[
          [-viewport.width / 2, 0, 10],
          [viewport.width / 2, 0, 10],
        ]}
      />

      {range({
        to: mapValue({
          value: viewport.width / 2,
          input: [-viewport.width / 2, viewport.width / 2],
          output: [0, effect.audioNode.context.sampleRate / 2],
        }),
        step: 1_000,
      }).map((frequency, index) => (
        <group
          key={index}
          position-x={mapValue({
            value: frequency,
            input: [0, effect.audioNode.context.sampleRate / 2],
            output: [-viewport.width / 2, viewport.width / 2],
          })}
        >
          <Line
            points={[
              [0, -0.3, 20],
              [0, 0.3, 20],
            ]}
          />
          <Text color="black" fontSize={0.7} position-y={-0.7}>
            {frequency / 1000} kHz
          </Text>
        </group>
      ))}
    </>
  );
});
