import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../QRInterface/QR-Interface.css';

const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderColor: 'black',
          '&:hover': {
            borderColor: 'black',
          },
          '&.Mui-focused': {
            borderColor: 'black',
            backgroundColor: '#e8e8e8',
          },
        },
      },
    },
  },
});

const ContactForm = ({ linkContent }) => {
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    linkContent(contactInfo); // Pass the updated contact info to the parent component
  }, [contactInfo, linkContent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          width: '100%',
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
        >
          {['firstName', 'lastName', 'phone', 'email', 'address', 'company', 'jobTitle'].map((field) => (
            <TextField
              key={field}
              id={`${field}-field`}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              variant="filled"
              color="primary"
              name={field}
              value={contactInfo[field]}
              onChange={handleChange}
              required={['firstName', 'lastName', 'phone', 'email'].includes(field)} // Required fields
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

ContactForm.propTypes = {
  linkContent: PropTypes.func.isRequired, // Function to pass form data for QR code generation
};

export default ContactForm;