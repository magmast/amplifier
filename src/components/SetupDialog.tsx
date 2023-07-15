import { animated, useTransition } from "@react-spring/web";
import { observer } from "mobx-react-lite";
import { Portal } from "react-portal";
import useMeasure from "react-use-measure";
import { useState } from "react";
import MicrophonePermissionService from "../services/MicrophonePermissionService";

/**
 * Props for the SetupDialog component.
 */
export interface SetupDialogProps {
  /**
   * The MicrophonePermissionService instance for managing microphone permission.
   */
  microphonePermissionService: MicrophonePermissionService;

  /**
   * Callback function called when permission is granted.
   */
  onPermissionGranted?: () => void;
}

/**
 * SetupDialog component is a dialog used for the setup process.
 * It displays a permission request for microphone access and handles the continue button click.
 *
 * @param props - The SetupDialog component props.
 * @returns The rendered SetupDialog component.
 */
const SetupDialog = observer(
  ({ microphonePermissionService, onPermissionGranted }: SetupDialogProps) => {
    const [continueClicked, setContinueClicked] = useState(false);

    const transition = useTransition(
      (microphonePermissionService.state !== "granted" &&
        microphonePermissionService.state !== undefined) ||
        !continueClicked,
      {
        from: {
          opacity: 0,
          scale: 0,
          blur: 0,
        },
        enter: {
          opacity: 0.6,
          scale: 1,
          blur: 8,
        },
        leave: {
          opacity: 0,
          scale: 0,
          blur: 0,
        },
      }
    );

    /**
     * Handles the click event when the "CONTINUE" button is clicked.
     * It requests microphone access and refreshes the permission status.
     */
    const handleContinueClicked = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setContinueClicked(true);
        onPermissionGranted && onPermissionGranted();
      } finally {
        await microphonePermissionService.refresh();
      }
    };

    return transition(
      ({ opacity, scale, blur }, open) =>
        open && (
          <Portal>
            <animated.div
              className="bg-black bg-opacity-60 fixed w-full h-full backdrop-blur flex items-center justify-center top-0"
              style={{
                ["--tw-bg-opacity" as string]: opacity,
                ["--tw-backdrop-blur" as string]: blur.to(
                  (b) => `blur(${b}px)`
                ),
              }}
            >
              <animated.div
                className="bg-white shadow-xl w-96 rounded"
                style={{ transform: scale.to((s) => `scale(${s})`) }}
              >
                <h2 className="text-xl pt-4 pr-4 pb-2 pl-4">Setup</h2>
                <hr />
                <div className="pt-2 pr-4 pb-4 pl-4">
                  {microphonePermissionService.state ? (
                    <p>
                      We need access to your microphone to continue. Please
                      press the "CONTINUE" button and allow microphone access.
                    </p>
                  ) : (
                    <p>
                      We can't query microphone permission status. Please press
                      the continue button and hope that everything works as
                      expected.
                    </p>
                  )}

                  <PermissionDeniedWarning
                    open={microphonePermissionService.state === "denied"}
                  />
                </div>
                <hr />
                <div className="flex justify-end pt-2 pr-4 pb-2 pl-4">
                  <button
                    className="p-2 text-sm rounded text-teal-600 font-medium hover:text-teal-700"
                    type="button"
                    onClick={handleContinueClicked}
                  >
                    CONTINUE
                  </button>
                </div>
              </animated.div>
            </animated.div>
          </Portal>
        )
    );
  }
);

export default SetupDialog;

/**
 * Props for the PermissionDeniedWarning component.
 */
export interface PermissionDeniedWarningProps {
  /**
   * Determines if the warning should be displayed.
   */
  open?: boolean;
}

/**
 * PermissionDeniedWarning component displays a warning message when microphone permission is denied.
 *
 * @param props - The PermissionDeniedWarning component props.
 * @returns The rendered PermissionDeniedWarning component.
 */
const PermissionDeniedWarning = ({ open }: PermissionDeniedWarningProps) => {
  const [ref, measure] = useMeasure({ offsetSize: true });

  const transition = useTransition(open, {
    from: { height: 0 },
    enter: { height: measure.height },
    update: { height: measure.height },
    leave: { height: 0 },
  });

  return transition(
    ({ height }, open) =>
      open && (
        <animated.div className="overflow-y-hidden" style={{ height }}>
          <div ref={ref} className="pt-2">
            <div className="bg-red-700 rounded p-2">
              <p>
                We can't ask you for permission because you already denied it.
                You need to check your browser settings to fix that.
              </p>
            </div>
          </div>
        </animated.div>
      )
  );
};
