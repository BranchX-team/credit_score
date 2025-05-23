import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,

} from '@mui/material';

const schema = yup.object({
  cibilScore: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .nullable()
    .notRequired()
    .min(300, 'CIBIL score must be at least 300')
    .max(850, 'CIBIL score cannot exceed 850'),
  repaymentHistory: yup.string().required('Repayment history is required'),
  defaults: yup.number()
    .min(0, 'Number of defaults must be at least 0')
    .max(10, 'Number of defaults cannot exceed 10')
    .required('Number of defaults is required'),
  bankingRelationship: yup.number()
    .min(0, 'Banking relationship duration must be at least 0')
    .required('Banking relationship duration is required'),
  returnedCheques: yup.number()
    .min(0, 'Number of returned cheques must be at least 0')
    .max(20, 'Number of returned cheques cannot exceed 20')
    .required('Number of returned cheques is required'),
});

const CreditHistoryForm = ({ onSubmit, defaultValues, showBack, onBack }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      repaymentHistory: defaultValues?.repaymentHistory ?? 'Excellent',
      cibilScore: defaultValues?.cibilScore ?? '',
      defaults: defaultValues?.defaults ?? 0,
      bankingRelationship: defaultValues?.bankingRelationship ?? 0,
      returnedCheques: defaultValues?.returnedCheques ?? 0,
    },
  });

  const repaymentHistoryOptions = [
    'Excellent',
    'Good',
    'Average',
    'Poor'
  ];

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="h5" gutterBottom>
        Credit History
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="CIBIL Score (Optional)"
          {...register('cibilScore')}
          error={!!errors.cibilScore}
          helperText={errors.cibilScore?.message}
        />
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Repayment History</InputLabel>
        <Select
          label="Repayment History"
          value={watch('repaymentHistory')}
          onChange={e => setValue('repaymentHistory', e.target.value)}
          error={!!errors.repaymentHistory}
        >
          {repaymentHistoryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Number of Defaults in Last 3 Years"
          {...register('defaults')}
          error={!!errors.defaults}
          helperText={errors.defaults?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Banking Relationship Duration (years)"
          {...register('bankingRelationship')}
          error={!!errors.bankingRelationship}
          helperText={errors.bankingRelationship?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Number of Returned Cheques"
          {...register('returnedCheques')}
          error={!!errors.returnedCheques}
          helperText={errors.returnedCheques?.message}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        {showBack && (
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CreditHistoryForm;
