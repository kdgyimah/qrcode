"use client";

import { useState, ChangeEvent } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import WhatsAppImage from "../../images/whatsapp-logo.jpg";
import { HandleContentCreateData } from "@/types/qr-generator";

// ------------------
// Theme
// ------------------
const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
});

// ------------------
// Types
// ------------------
interface WhatsAppData {
  waPhoneNumber: string | undefined;
  waMessage: string;
  showIcon: boolean;
}

interface WhatsAppFormProps {
  linkContent: (data: HandleContentCreateData) => void;
}

// ------------------
// Component
// ------------------
const WhatsAppForm: React.FC<WhatsAppFormProps> = ({ linkContent }) => {
  const [whatsAppData, setWhatsAppData] = useState<WhatsAppData>({
    waPhoneNumber: "",
    waMessage: "",
    showIcon: false,
  });

  const updateForm = (updatedFields: Partial<WhatsAppData>) => {
    const updated = { ...whatsAppData, ...updatedFields };
    setWhatsAppData(updated);
    linkContent({
      type: "whatsapp",
      data: updated,
    });
  };

  const handlePhoneChange = (value: string | undefined) => {
    updateForm({ waPhoneNumber: value });
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateForm({ waMessage: e.target.value });
  };

  const handleIconToggle = () => {
    updateForm({ showIcon: !whatsAppData.showIcon });
  };

  const handleSendMessage = () => {
    const { waPhoneNumber, waMessage } = whatsAppData;
    if (waPhoneNumber && waMessage) {
      const link = `https://wa.me/${waPhoneNumber}?text=${encodeURIComponent(waMessage)}`;
      window.open(link, "_blank");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        {/* Icon Toggle */}
        <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={whatsAppData.showIcon}
                onChange={handleIconToggle}
              />
            }
            label="Add WhatsApp Icon"
          />
          {whatsAppData.showIcon && (
            <Box
              component="img"
              src={WhatsAppImage.src}
              alt="WhatsApp Icon"
              sx={{ width: 30, height: 30, ml: 1 }}
            />
          )}
        </Box>

        {/* Phone Input */}
        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel shrink htmlFor="whatsapp-phone-input">
            Phone Number
          </InputLabel>
          <PhoneInput
            id="whatsapp-phone-input"
            placeholder="Enter recipient's phone number"
            value={whatsAppData.waPhoneNumber}
            onChange={handlePhoneChange}
            defaultCountry="GH"
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              fontFamily: '"Sen", sans-serif',
              backgroundColor: "rgba(0, 0, 0, 0.06)",
              border: "none",
              borderRadius: 4,
            }}
          />
        </FormControl>

        {/* Message Input */}
        <TextField
          id="whatsapp-message-field"
          label="Message"
          variant="filled"
          multiline
          rows={3}
          name="waMessage"
          placeholder="Enter your message here..."
          value={whatsAppData.waMessage}
          onChange={handleMessageChange}
          required
          fullWidth
        />

        {/* Send Button */}
        <Box mt={2}>
          <button
            type="button"
            onClick={handleSendMessage}
            style={{
              backgroundColor: "#25D366",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            Send via WhatsApp
          </button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WhatsAppForm;
