import { useEffect, useRef } from "react";
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
  DotType,
  CornerDotType,
  CornerSquareType,
  Gradient
} from "qr-code-styling";
import PropTypes from "prop-types";

interface QRStyleOptions {
  type?: DotType | CornerDotType | CornerSquareType;
  color?: string;
  gradient?: Gradient;
}

interface QRFrameStyle extends Partial<QRCodeStylingOptions> {
  width: number;
  height: number;
  data?: string;
  image?: string;
  [key: string]: unknown;
}

interface QRFrameItem {
  id: string | number;
  style: QRFrameStyle;
}

const defaultQrFrames: QRFrameItem[] = [
  // your frames remain unchanged
];

interface QRFrameProps {
  qrCompStyle: (newStyle: QRFrameStyle) => void;
  className?: string;
}

const QRFrame = ({ qrCompStyle, className = "" }: QRFrameProps) => {
  const frameRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    defaultQrFrames.forEach((frame, index) => {
      const qr = new QRCodeStyling(frame.style);

      if (frameRefs.current[index]) {
        frameRefs.current[index].innerHTML = "";
        qr.append(frameRefs.current[index]);
      }
    });
  }, []);

  const handleClick = (style: QRFrameStyle) => {
    qrCompStyle(style);
  };

  return (
    <div className={`frame-container my-2 mx-auto snaps-inline ${className}`}>
      {defaultQrFrames.map((frame, index) => (
        <div
          key={frame.id}
          ref={(el) => {
            if (el) frameRefs.current[index] = el;
          }}
          style={{ cursor: "pointer", border: "2px solid #ccc", padding: "5px" }}
          className="frame-container-item"
          onClick={() => handleClick(frame.style)}
        />
      ))}
    </div>
  );
};

QRFrame.propTypes = {
  qrCompStyle: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default QRFrame;
