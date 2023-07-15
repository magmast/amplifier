import { makeAutoObservable } from "mobx";

/**
 * The MicrophonePermissionService class provides functionality to manage and query the permission state for microphone access.
 */
export default class MicrophonePermissionService {
  /**
   * Creates a new MicrophonePermissionService instance.
   * @returns A Promise that resolves to the created MicrophonePermissionService instance.
   */
  static async create() {
    const state = await this.queryState();
    return new MicrophonePermissionService(state);
  }

  /**
   * Queries the permission state for microphone access.
   * @returns A Promise that resolves to the permission state.
   */
  private static async queryState() {
    try {
      const { state } = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
      return state;
    } catch (err) {
      return undefined;
    }
  }

  /**
   * Gets the current permission state for microphone access.
   */
  get state() {
    return this._state;
  }

  private set state(state) {
    this._state = state;
  }

  /**
   * Creates a new MicrophonePermissionService instance.
   * @param state - The initial permission state.
   */
  constructor(private _state?: PermissionState) {
    makeAutoObservable(this);
  }

  /**
   * Refreshes the permission state for microphone access.
   */
  async refresh(): Promise<void> {
    this.state = await MicrophonePermissionService.queryState();
  }
}
