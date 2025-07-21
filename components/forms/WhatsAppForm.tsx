"use client";

import { useState, ChangeEvent } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import WhatsAppImage from "../../images/whatsapp-logo.jpg"; // Adjust as necessary
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
});

interface WhatsAppData {
  waPhoneNumber: string | undefined;
  waMessage: string;
  showIcon: boolean;
}

interface WhatsAppFormProps {
  linkContent: (data: WhatsAppData) => void;
}

const WhatsAppForm: React.FC<WhatsAppFormProps> = ({ linkContent }) => {
  const [whatsAppData, setWhatsAppData] = useState<WhatsAppData>({
    waPhoneNumber: "",
    waMessage: "",
    showIcon: false,
  });

  const handlePhoneChange = (value: string | undefined) => {
    setWhatsAppData((prevData) => {
      const updated = { ...prevData, waPhoneNumber: value };
      linkContent(updated);
      return updated;
    });
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWhatsAppData((prevData) => {
      const updated = { ...prevData, waMessage: value };
      linkContent(updated);
      return updated;
    });
  };

  const handleIconToggle = () => {
    setWhatsAppData((prevData) => {
      const updated = { ...prevData, showIcon: !prevData.showIcon };
      linkContent(updated);
      return updated;
    });
  };

  const handleSendMessage = () => {
    const { waPhoneNumber, waMessage } = whatsAppData;
    if (waPhoneNumber && waMessage) {
      const link = `https://wa.me/${waPhoneNumber}?text=${encodeURIComponent(
        waMessage
      )}`;
      window.open(link, "_blank");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
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
              width={30}
              height={30}
              ml={1}
            />
          )}
        </Box>

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
              height: "120px",
              padding: "10px 12px",
              fontFamily: '"Sen", sans-serif',
              backgroundColor: "rgba(0, 0, 0, 0.06)",
              border: "none",
            }}
          />
        </FormControl>

        <TextField
          id="whatsapp-message-field"
          label="Message"
          variant="filled"
          color="primary"
          multiline
          rows={3}
          name="waMessage"
          placeholder="Enter your message here..."
          value={whatsAppData.waMessage}
          onChange={handleMessageChange}
          required
          fullWidth
        />

        <Box mt={2}>
          <button type="button" onClick={handleSendMessage}>
            Send via WhatsApp
          </button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WhatsAppForm;
