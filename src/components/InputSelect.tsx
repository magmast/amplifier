import { observer } from "mobx-react-lite";
import { suspend } from "suspend-react";
import { useMemo } from "react";
import MicrophonePermissionService from "../services/MicrophonePermissionService";

/**
 * Props for the InputSelect component.
 */
export interface InputSelectProps {
  /**
   * The microphone permission service instance.
   */
  microphonePermissionService: MicrophonePermissionService;

  /**
   * CSS class name for the component.
   */
  className?: string;

  /**
   * The currently selected MediaDeviceInfo value.
   */
  value?: MediaDeviceInfo | null;

  /**
   * Callback function called when the selection changes.
   * @param value - The newly selected MediaDeviceInfo value.
   */
  onChange?: (value: MediaDeviceInfo | null) => void;
}

/**
 * InputSelect component provides a select input for choosing from available input devices.
 * It fetches and displays a list of audio input devices and allows selection of a default device or a specific device.
 *
 * @param props - The InputSelect component props.
 * @returns The rendered InputSelect component.
 */
const InputSelect = observer(
  ({
    microphonePermissionService,
    className,
    value,
    onChange,
  }: InputSelectProps) => {
    const devices = suspend(async () => {
      if (!navigator.mediaDevices) {
        return [];
      }

      return (await navigator.mediaDevices.enumerateDevices()).filter(
        (d) => d.kind === "audioinput"
      );
    }, ["InputSelect/devices", microphonePermissionService.state]);

    const index = useMemo(
      () => devices.findIndex((device) => device === value),
      [devices, value]
    );

    return (
      <select
        className={className}
        value={index}
        onChange={(event) => {
          if (!onChange) {
            return;
          }

          const newIndex = parseInt(event.currentTarget.value);
          onChange(newIndex < 0 ? null : devices[newIndex]);
        }}
      >
        <option value={-1}>Default</option>
        {devices.map((info, index) => (
          <option key={index} value={index}>
            {info.label.length <= 0 ? "(No name)" : info.label}
          </option>
        ))}
      </select>
    );
  }
);

export default InputSelect;
