import { useState, useEffect, ChangeEvent } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { HandleContentCreateData } from "@/types/qr-generator";
import '../QRInterface/QR-Interface.css';

// 💡 MUI Theme setup
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

// ✅ Component props using shared type
interface ContactFormProps {
  linkContent: (data: HandleContentCreateData) => void;
}

// ✨ This will form the `data` payload for `type: 'contact'`
interface ContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  jobTitle: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ linkContent }) => {
  const [contactData, setContactData] = useState<ContactData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    company: '',
    jobTitle: '',
  });

  // 🔁 Push QR payload on change
  useEffect(() => {
    const payload: HandleContentCreateData = {
      type: 'contact',
      data: contactData,
    };
    linkContent(payload);
  }, [contactData, linkContent]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
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
          {(Object.keys(contactData) as (keyof ContactData)[]).map((field) => (
            <TextField
              key={field}
              id={`${field}-field`}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              variant="filled"
              color="primary"
              name={field}
              value={contactData[field]}
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
