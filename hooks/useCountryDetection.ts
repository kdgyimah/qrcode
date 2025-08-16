// hooks/useCountryDetection.ts
import { useState, useEffect } from "react";
import { timezoneCountryMap } from "../data/countries";

export const useCountryDetection = () => {
  const [detectedCountry, setDetectedCountry] = useState<string>("+233");
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const countryCode = timezoneCountryMap[timezone];
        if (countryCode) {
          setDetectedCountry(countryCode);
        }
      } catch (error) {
        console.log("Could not detect country, using default");
      } finally {
        setIsDetecting(false);
      }
    };

    detectCountry();
  }, []);

  return { detectedCountry, isDetecting };
};
