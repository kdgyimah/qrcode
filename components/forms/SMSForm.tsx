'use client';

import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { HandleContentCreateData } from '@/types/qr-generator';

const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
});

interface SMSFormProps {
  linkContent: (data: HandleContentCreateData) => void;
}

const SMSForm = ({ linkContent }: SMSFormProps) => {
  const [smsData, setSMSData] = useState({
    phoneNumber: '',
    smsMessage: '',
  });

  const handlePhoneChange = (value: string | undefined) => {
    const phone = value ?? '';
    const updatedData = {
      phoneNumber: phone,
      smsMessage: smsData.smsMessage,
    };
    setSMSData(updatedData);
    linkContent({ type: 'sms', data: updatedData });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedData = {
      phoneNumber: smsData.phoneNumber,
      smsMessage: value,
    };
    setSMSData(updatedData);
    linkContent({ type: 'sms', data: updatedData });
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
