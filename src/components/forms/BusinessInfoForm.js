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
  businessName: yup.string().required('Business name is required'),
  gstNumber: yup.string()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST number')
    .required('GST number is required'),
  yearsInOperation: yup.number()
    .min(0, 'Years in operation must be at least 0')
    .max(50, 'Years in operation cannot exceed 50')
    .required('Years in operation is required'),
  businessType: yup.string().required('Business type is required'),
  annualRevenue: yup.number()
    .min(0, 'Annual revenue must be at least 0')
    .required('Annual revenue is required'),
  employees: yup.number()
    .min(0, 'Number of employees must be at least 0')
    .required('Number of employees is required'),
  ownershipType: yup.string().required('Ownership type is required'),
});

const BusinessInfoForm = ({ onSubmit, defaultValues, showBack, onBack }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
      businessType: defaultValues?.businessType ?? 'Grocery',
      ownershipType: defaultValues?.ownershipType ?? 'Sole Proprietorship',
      yearsInOperation: defaultValues?.yearsInOperation ?? 0,
      annualRevenue: defaultValues?.annualRevenue ?? 0,
      employees: defaultValues?.employees ?? 0,
    }
  });

  const businessTypes = [
    'Grocery',
    'Electronics',
    'Clothing',
    'Pharmacy',
    'Restaurant',
    'Other'
  ];

  const ownershipTypes = [
    'Sole Proprietorship',
    'Partnership',
    'Private Limited'
  ];

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Business Information
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Business Name"
          {...register('businessName')}
          error={!!errors.businessName}
          helperText={errors.businessName?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="GST Number"
          {...register('gstNumber')}
          error={!!errors.gstNumber}
          helperText={errors.gstNumber?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Years in Operation"
          {...register('yearsInOperation')}
          error={!!errors.yearsInOperation}
          helperText={errors.yearsInOperation?.message}
        />
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Business Type</InputLabel>
        <Select
          label="Business Type"
          value={watch('businessType')}
          onChange={e => setValue('businessType', e.target.value)}
          error={!!errors.businessType}
        >
          {businessTypes.map((option) => (
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
          label="Annual Revenue"
          {...register('annualRevenue')}
          error={!!errors.annualRevenue}
          helperText={errors.annualRevenue?.message}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Number of Employees"
          {...register('employees')}
          error={!!errors.employees}
          helperText={errors.employees?.message}
        />
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Ownership Type</InputLabel>
        <Select
          label="Ownership Type"
          value={watch('ownershipType')}
          onChange={e => setValue('ownershipType', e.target.value)}
          error={!!errors.ownershipType}
        >
          {ownershipTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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

export default BusinessInfoForm;
