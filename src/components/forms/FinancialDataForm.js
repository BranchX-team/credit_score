import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  Slider,
  SliderProps,
} from '@mui/material';

const schema = yup.object({
  monthlySales: yup.number()
    .min(0, 'Monthly sales must be at least 0')
    .required('Monthly sales is required'),
  profitMargin: yup.number()
    .min(0, 'Profit margin must be at least 0')
    .max(50, 'Profit margin cannot exceed 50%')
    .required('Profit margin is required'),
  existingLoan: yup.number()
    .min(0, 'Existing loan amount must be at least 0')
    .required('Existing loan amount is required'),
  monthlyEMI: yup.number()
    .min(0, 'Monthly EMI must be at least 0')
    .required('Monthly EMI is required'),
  averageBankBalance: yup.number()
    .min(0, 'Average bank balance must be at least 0')
    .required('Average bank balance is required'),
  bankAccounts: yup.number()
    .min(1, 'Number of bank accounts must be at least 1')
    .max(5, 'Number of bank accounts cannot exceed 5')
    .required('Number of bank accounts is required'),
  insuranceCoverage: yup.number()
    .min(0, 'Insurance coverage amount must be at least 0')
    .required('Insurance coverage amount is required'),
});

const FinancialDataForm = ({ onSubmit, defaultValues, showBack = false, onBack = () => {} }) => {
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      monthlySales: 0,
      profitMargin: 0,
      existingLoan: 0,
      monthlyEMI: 0,
      averageBankBalance: 0,
      bankAccounts: 0,
      insuranceCoverage: 0
    }
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const CustomSlider = ({ value, onChange }) => (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle1" gutterBottom>
        Profit Margin
      </Typography>
      <Slider
        value={typeof value === 'number' ? value : 0}
        onChange={(_, newValue) => onChange(newValue)}
        min={0}
        max={50}
        step={1}
        marks
        valueLabelDisplay="auto"
      />
      <Typography variant="body2" color="textSecondary">
        {value}%
      </Typography>
    </Box>
  );

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="h5" gutterBottom>
        Financial Data
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Monthly Average Sales (last 12 months)"
          {...register('monthlySales')}
          error={!!errors.monthlySales}
          helperText={errors.monthlySales?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Controller
          name="profitMargin"
          control={control}
          render={({ field }) => (
            <CustomSlider value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.profitMargin && (
          <Typography color="error" variant="body2">
            {errors.profitMargin.message}
          </Typography>
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Existing Loan Amount"
          {...register('existingLoan')}
          error={!!errors.existingLoan}
          helperText={errors.existingLoan?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Monthly Loan EMI"
          {...register('monthlyEMI')}
          error={!!errors.monthlyEMI}
          helperText={errors.monthlyEMI?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Average Bank Balance"
          {...register('averageBankBalance')}
          error={!!errors.averageBankBalance}
          helperText={errors.averageBankBalance?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Number of Bank Accounts"
          {...register('bankAccounts')}
          error={!!errors.bankAccounts}
          helperText={errors.bankAccounts?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Insurance Coverage Amount"
          {...register('insuranceCoverage')}
          error={!!errors.insuranceCoverage}
          helperText={errors.insuranceCoverage?.message}
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

export default FinancialDataForm;
