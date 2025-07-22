import { useState, ChangeEvent } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EmailImage from '../../images/email.png'; // Adjust path as needed

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

interface EmailFormData {
  receiverEmail: string;
  subject: string;
  message: string;
  showIcon?: boolean;
}

interface EmailFormProps {
  linkContent: (data: EmailFormData) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ linkContent }) => {
  const [formInfo, setFormInfo] = useState<EmailFormData>({
    receiverEmail: '',
    subject: '',
    message: '',
  });

  const [showEmailIcon, setShowEmailIcon] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedFormInfo: EmailFormData = {
      ...formInfo,
      [name]: value,
      showIcon: showEmailIcon,
    };
    setFormInfo(updatedFormInfo);
    linkContent(updatedFormInfo);
  };

  const handleIconToggle = () => {
    const newShowIcon = !showEmailIcon;
    setShowEmailIcon(newShowIcon);
    const updatedFormInfo: EmailFormData = {
      ...formInfo,
      showIcon: newShowIcon,
    };
    setFormInfo(updatedFormInfo);
    linkContent(updatedFormInfo);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            control={<Checkbox checked={showEmailIcon} onChange={handleIconToggle} />}
            label="Add Icon"
          />
          {showEmailIcon && (
           <Box component="img" src={EmailImage.src} alt="Icon" width={30} height={30} ml={1} />

          )}
        </Box>

        <TextField
          id="receiver-email"
          label="Receiver Email"
          variant="filled"
          color="primary"
          type="email"
          name="receiverEmail"
          placeholder="example@domain.com"
          value={formInfo.receiverEmail}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          id="subject"
          label="Subject"
          variant="filled"
          color="primary"
          type="text"
          name="subject"
          value={formInfo.subject}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          id="message"
          label="Message"
          variant="filled"
          color="primary"
          multiline
          rows={4}
          name="message"
          value={formInfo.message}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
      </Box>
    </ThemeProvider>
  );
};

export default EmailForm;
