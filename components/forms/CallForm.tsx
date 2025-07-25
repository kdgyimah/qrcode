import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { HandleContentCreateData } from "@/types/qr-generator";
import IconImage from '../../images/freecall-logo.webp';

const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
});

interface CallFormProps {
  linkContent: (data: HandleContentCreateData) => void;
}

const CallForm: React.FC<CallFormProps> = ({ linkContent }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const [showIcon, setShowIcon] = useState<boolean>(false);

  // 🧠 Update the parent with structured QR content
  useEffect(() => {
    if (!phoneNumber) return;

    const payload: HandleContentCreateData = {
      type: 'call',
      data: {
        phoneNumber,
        showIcon,
      },
    };

    linkContent(payload);
  }, [phoneNumber, showIcon, linkContent]);

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneNumber(value);
  };

  const handleIconToggle = () => {
    setShowIcon((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            control={<Checkbox checked={showIcon} onChange={handleIconToggle} />}
            label="Add Call Image"
          />
          {showIcon && (
            <Box
              component="img"
              src={IconImage.src}
              alt="Call Icon"
              width={30}
              height={30}
              ml={1}
            />
          )}
        </Box>

        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel shrink htmlFor="phone-input">Phone Number</InputLabel>
          <PhoneInput
            id="phone-input"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            defaultCountry="GH"
            required
            style={{
              width: '100%',
              height: '120px',
              padding: '10px 12px',
              fontFamily: '"Sen", sans-serif',
              borderRadius: '4px',
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
              border: 'none',
            }}
          />
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default CallForm;
