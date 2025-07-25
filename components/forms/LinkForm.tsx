'use client';

import { useEffect, useState } from 'react';
import { HandleContentCreateData } from '@/types/qr-generator';
import { Box, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import IconImage from '../../images/freecall-logo.webp';

export interface CallFormData {
  phoneNumber: string;
  showIcon: boolean;
}

interface CallFormProps {
  linkContent: (data: HandleContentCreateData) => void;
}

const CallForm = ({ linkContent }: CallFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [showIcon, setShowIcon] = useState<boolean>(false);

  useEffect(() => {
    if (phoneNumber) {
      const payload: HandleContentCreateData = {
        type: 'call',
        data: { phoneNumber, showIcon },
      };
      linkContent(payload);
    }
  }, [phoneNumber, showIcon, linkContent]);

  return (
    <Box component="form" noValidate autoComplete="off">
      <Box display="flex" alignItems="center" mb={1}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showIcon}
              onChange={() => setShowIcon((prev) => !prev)}
            />
          }
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

      <FormControl fullWidth margin="normal">
        <PhoneInput
          id="phone-input"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value ?? '')}
          defaultCountry="GH"
          required
          style={{
            width: '100%',
            height: '55px',
            padding: '10px 12px',
            fontFamily: '"Sen", sans-serif',
            borderRadius: '4px',
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            border: 'none',
            fontSize: '16px',
          }}
        />
      </FormControl>
    </Box>
  );
};

export default CallForm;
