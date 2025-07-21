import { useState, useEffect, ChangeEvent } from 'react';
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

interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  jobTitle: string;
}

interface ContactFormProps {
  linkContent: (data: ContactInfo) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ linkContent }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    linkContent(contactInfo);
  }, [contactInfo, linkContent]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const requiredFields = ['firstName', 'lastName', 'phone', 'email'];

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
          {(Object.keys(contactInfo) as (keyof ContactInfo)[]).map((field) => (
            <TextField
              key={field}
              id={`${field}-field`}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              variant="filled"
              color="primary"
              name={field}
              value={contactInfo[field]}
              onChange={handleChange}
              required={requiredFields.includes(field)}
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ContactForm;
