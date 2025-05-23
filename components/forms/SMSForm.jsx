import { useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import PhoneInput from 'react-phone-number-input';
// import FormHelperText from '@mui/material/FormHelperText';
import 'react-phone-number-input/style.css';
// import IconImage from '../../images/freecall-logo.webp'; // Optional image for icon
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';



const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
});

const SMSForm = ({ linkContent }) => {
  const [smsData, setSMSData] = useState({
    phoneNumber: '',
    smsMessage: '',
    // showIcon: false,
  });

  const handlePhoneChange = (value) => {
    setSMSData((prevData) => ({ ...prevData, phoneNumber: value }));
    linkContent({ ...smsData, phoneNumber: value });
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    setSMSData((prevData) => ({ ...prevData, smsMessage: value }));
    linkContent({ ...smsData, smsMessage: value });
  };

  // const handleIconToggle = () => {
  //   setSMSData((prevData) => ({ ...prevData, showIcon: !prevData.showIcon }));
  //   linkContent({ ...smsData, showIcon: !smsData.showIcon });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        {/* <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={smsData.showIcon}
                onChange={handleIconToggle}
              />
            }
            label="Add SMS Icon"
          />
          {smsData.showIcon && (
            <Box component="img" src={IconImage} alt="SMS Icon" width={30} height={30} ml={1} />
          )}
        </Box> */}

        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel shrink htmlFor="phone-input">Phone Number</InputLabel>
          <PhoneInput
            id="phone-input"
            placeholder="eg: +233 544112245"
            value={smsData.phoneNumber}
            onChange={handlePhoneChange}
            defaultCountry="GH"
            // international
            limitMaxLength={16}
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
          {/* <FormHelperText>Please enter your phone number, starting with the country code.</FormHelperText> */}
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

SMSForm.propTypes = {
  linkContent: PropTypes.func.isRequired,
};

export default SMSForm;
