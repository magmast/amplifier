import { makeAutoObservable } from "mobx";
import Effect from "./Effect";
import GainEffect from "./GainEffect";
import VolumeEffect from "./VolumeEffect";
import FrequencyVisualiserEffect from "./FrequencyVisualiserEffect";

/**
 * The Amplifier class represents an audio amplifier that applies effects to an audio source.
 */
export default class Amplifier {
  private _source: AudioNode;

  /**
   * The audio source node of the amplifier.
   */
  get source() {
    return this._source;
  }

  private set source(source) {
    this.source.disconnect();
    this._source = source;
    this.source.connect(this.getDestinationNode(0));
  }

  private _inputDeviceInfo?: MediaDeviceInfo;

  /**
   * The input device information used for capturing audio.
   */
  get inputDeviceInfo() {
    return this._inputDeviceInfo;
  }

  /**
   * Creates a new Amplifier instance.
   * @param audioContext - The AudioContext to use. If not provided, a new AudioContext will be created.
   * @returns A Promise that resolves to the created Amplifier instance.
   */
  static async create(audioContext = new AudioContext()) {
    const source = await this.createSource(audioContext);
    const effects = [
      new FrequencyVisualiserEffect(audioContext, "0"),
      new GainEffect(audioContext, "1"),
      new VolumeEffect(audioContext, "2"),
    ];
    return new Amplifier(audioContext, source, effects);
  }

  private constructor(
    readonly audioContext: AudioContext,
    source: AudioNode,
    readonly effects: Effect[]
  ) {
    this._source = source;
    this._inputDeviceInfo = undefined;
    makeAutoObservable(this);

    for (let i = 0; i < effects.length; i++) {
      const effect = effects[i];
      const destination = this.getDestinationNode(i + 1);
      effect.audioNode.connect(destination);
    }

    this._source.connect(this.getDestinationNode(0));
  }

  /**
   * Sets the input device for capturing audio.
   * @param deviceInfo - The MediaDeviceInfo of the input device. If null or undefined, the default input device will be used.
   */
  async setInputDevice(deviceInfo?: MediaDeviceInfo): Promise<void> {
    this._inputDeviceInfo = deviceInfo ?? undefined;
    this.source = await Amplifier.createSource(this.audioContext, deviceInfo);
  }

  private static async createSource(
    audioContext: AudioContext,
    deviceInfo?: MediaDeviceInfo
  ): Promise<AudioNode> {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: deviceInfo?.deviceId ?? undefined,
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
      },
    });
    return audioContext.createMediaStreamSource(stream);
  }

  private getDestinationNode(index: number): AudioNode {
    if (this.effects.length <= 0 || index >= this.effects.length) {
      return this.audioContext.destination;
    }
    return this.effects[index].audioNode;
  }
}
