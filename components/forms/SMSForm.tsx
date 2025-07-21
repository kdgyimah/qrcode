'use client';

import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
});

// Define the type for the props
interface SMSFormProps {
  linkContent: (data: { phoneNumber: string; smsMessage: string }) => void;
}

const SMSForm = ({ linkContent }: SMSFormProps) => {
  const [smsData, setSMSData] = useState({
    phoneNumber: '',
    smsMessage: '',
  });

  // Phone number change handler
  const handlePhoneChange = (value: string | undefined) => {
    const phone = value ?? '';
    setSMSData((prevData) => ({ ...prevData, phoneNumber: phone }));
    linkContent({ ...smsData, phoneNumber: phone });
  };

  // Text field change handler
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSMSData((prevData) => ({ ...prevData, smsMessage: value }));
    linkContent({ ...smsData, smsMessage: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel shrink htmlFor="phone-input">Phone Number</InputLabel>
          <PhoneInput
            id="phone-input"
            placeholder="eg: +233 544112245"
            value={smsData.phoneNumber}
            onChange={handlePhoneChange}
            defaultCountry="GH"
            required
            style={{
              width: '100%',
              height: '120px',
              padding: '10px 12px',
              fontFamily: '"Sen", sans-serif',
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
              border: 'none',
            }}
          />
        </FormControl>

        <TextField
          id="message-field"
          label="Message"
          variant="filled"
          color="primary"
          multiline
          rows={3}
          name="smsMessage"
          placeholder="Enter your message here..."
          value={smsData.smsMessage}
          onChange={handleMessageChange}
          required
          fullWidth
        />
      </Box>
    </ThemeProvider>
  );
};

export default SMSForm;
