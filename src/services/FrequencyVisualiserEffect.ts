import { makeAutoObservable } from "mobx";
import Effect from "./Effect";
import EffectVisitor from "./EffectVisitor";
import mapValue from "../utils/mapValue";

/**
 * FrequencyVisualiserEffect represents an audio effect that visualizes the frequency spectrum of the audio input.
 * It extends the Effect interface and uses an AnalyserNode to analyze the audio signal.
 */
export default class FrequencyVisualiserEffect implements Effect {
  readonly id: string;

  readonly audioNode: AnalyserNode;

  private buffer: Float32Array;

  private _frequencies = [] as { frequency: number; volume: number }[];

  /**
   * The array of frequencies and their corresponding volumes.
   */
  get frequencies() {
    return this._frequencies;
  }

  private set frequencies(frequencies) {
    this._frequencies = frequencies;
  }

  /**
   * Constructs a new FrequencyVisualiserEffect.
   * @param context - The AudioContext instance.
   * @param id - The unique identifier for the effect.
   */
  constructor(private readonly context: AudioContext, id: string) {
    makeAutoObservable(this);
    this.id = id;
    this.audioNode = context.createAnalyser();
    this.buffer = new Float32Array(this.audioNode.frequencyBinCount);
    requestAnimationFrame(this.updateFrequencies);
  }

  /**
   * Accepts an EffectVisitor to perform operations on the effect.
   * @param visitor - The EffectVisitor instance.
   * @returns The result of the visitor operation.
   * @template T - The return type of the visitor operation.
   */
  accept<T>(visitor: EffectVisitor<T>): T {
    return visitor.visitFrequencyVisualiserEffect(this);
  }

  private updateFrequencies = () => {
    this.audioNode.getFloatFrequencyData(this.buffer);
    this.frequencies = Array.from(this.buffer).map((volume, index, arr) => ({
      volume,
      frequency: mapValue({
        value: index,
        input: [0, arr.length],
        output: [0, this.context.sampleRate / 2],
      }),
    }));
    requestAnimationFrame(this.updateFrequencies);
  };
}
