"use client";

import { useState, ChangeEvent } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import EmailImage from "../../images/email.png";
import { HandleContentCreateData } from "@/types/qr-generator";

// --------------------
// Define form data type
// --------------------
interface EmailFormData {
  receiverEmail: string;
  subject: string;
  message: string;
  showIcon: boolean;
}

// --------------------
// Component props
// --------------------
interface EmailFormProps {
  linkContent: (data: HandleContentCreateData) => void;
}

// --------------------
// MUI custom theme
// --------------------
const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderColor: "black",
          "&:hover": {
            borderColor: "black",
          },
          "&.Mui-focused": {
            borderColor: "black",
            backgroundColor: "#e8e8e8",
          },
        },
      },
    },
  },
});

// --------------------
// EmailForm component
// --------------------
const EmailForm: React.FC<EmailFormProps> = ({ linkContent }) => {
  const [formData, setFormData] = useState<EmailFormData>({
    receiverEmail: "",
    subject: "",
    message: "",
    showIcon: false,
  });

  const updateForm = (updatedFields: Partial<EmailFormData>) => {
    const updatedData = { ...formData, ...updatedFields };
    setFormData(updatedData);

    linkContent({
      type: "mail",
      data: updatedData,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateForm({ [name]: value } as Partial<EmailFormData>);
  };

  const handleIconToggle = () => {
    updateForm({ showIcon: !formData.showIcon });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        {/* Icon Toggle */}
        <Box display="flex" alignItems="center" mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.showIcon}
                onChange={handleIconToggle}
              />
            }
            label="Add Icon"
          />
          {formData.showIcon && (
            <Box
              component="img"
              src={EmailImage.src}
              alt="Email Icon"
              sx={{ width: 30, height: 30, ml: 1 }}
            />
          )}
        </Box>

        {/* Receiver Email */}
        <TextField
          label="Receiver Email"
          variant="filled"
          type="email"
          name="receiverEmail"
          value={formData.receiverEmail}
          onChange={handleChange}
          placeholder="example@domain.com"
          fullWidth
          required
          margin="normal"
        />

        {/* Subject */}
        <TextField
          label="Subject"
          variant="filled"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        {/* Message */}
        <TextField
          label="Message"
          variant="filled"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
          margin="normal"
        />
      </Box>
    </ThemeProvider>
  );
};

export default EmailForm;
