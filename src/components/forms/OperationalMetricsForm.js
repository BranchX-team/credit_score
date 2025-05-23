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
  digitalPayments: yup.number()
    .min(0, 'Digital payment percentage must be at least 0')
    .max(100, 'Digital payment percentage cannot exceed 100')
    .required('Digital payment percentage is required'),
  customerPaymentTerms: yup.string().required('Customer payment terms are required'),
  inventoryTurnover: yup.string().required('Inventory turnover frequency is required'),
  seasonalImpact: yup.string().required('Seasonal variation impact is required'),
  supplierPaymentTerms: yup.string().required('Supplier payment terms are required'),
});

const OperationalMetricsForm = ({ onSubmit, defaultValues, showBack, onBack }) => {
  const { register, handleSubmit, formState: { errors }, setValue, control, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
      digitalPayments: defaultValues?.digitalPayments ?? 0,
      customerPaymentTerms: defaultValues?.customerPaymentTerms ?? 'Cash',
      inventoryTurnover: defaultValues?.inventoryTurnover ?? 'Monthly',
      seasonalImpact: defaultValues?.seasonalImpact ?? 'Low',
      supplierPaymentTerms: defaultValues?.supplierPaymentTerms ?? 'Immediate',
    }
  });

  // Remove sliderValue state, use react-hook-form state only

  const customerPaymentOptions = [
    'Cash',
    '15 days',
    '30 days',
    '60+ days'
  ];

  const inventoryTurnoverOptions = [
    'Weekly',
    'Monthly',
    'Quarterly',
    'Slower'
  ];

  const seasonalImpactOptions = [
    'High',
    'Medium',
    'Low',
    'None'
  ];

  const supplierPaymentOptions = [
    'Immediate',
    '15 days',
    '30 days',
    '45+ days'
  ];

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  // No need for handleSliderChange, Controller will handle

  // Remove sliderRef and sliderValue effect

  // Remove CustomSlider, use Controller + MUI Slider directly

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="h5" gutterBottom>
        Operational Metrics
      </Typography>

      <Box sx={{ width: '100%', mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Digital Payment Percentage
        </Typography>
        <Controller
          name="digitalPayments"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              value={field.value || 0}
              onChange={(_, value) => field.onChange(value)}
              min={0}
              max={100}
              step={1}
              marks
              sx={{ mt: 2 }}
            />
          )}
        />
        <Typography variant="body2" color={errors.digitalPayments ? 'error' : 'textSecondary'}>
          {errors.digitalPayments ? errors.digitalPayments.message : `Current: ${watch('digitalPayments') ?? 0}%`}
        </Typography>
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Customer Payment Terms</InputLabel>
        <Select
          label="Customer Payment Terms"
          value={watch('customerPaymentTerms')}
          onChange={e => setValue('customerPaymentTerms', e.target.value)}
          error={!!errors.customerPaymentTerms}
        >
          {customerPaymentOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Inventory Turnover Frequency</InputLabel>
        <Select
          label="Inventory Turnover Frequency"
          value={watch('inventoryTurnover')}
          onChange={e => setValue('inventoryTurnover', e.target.value)}
          error={!!errors.inventoryTurnover}
        >
          {inventoryTurnoverOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Seasonal Variation Impact</InputLabel>
        <Select
          label="Seasonal Variation Impact"
          value={watch('seasonalImpact')}
          onChange={e => setValue('seasonalImpact', e.target.value)}
          error={!!errors.seasonalImpact}
        >
          {seasonalImpactOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Supplier Payment Terms</InputLabel>
        <Select
          label="Supplier Payment Terms"
          value={watch('supplierPaymentTerms')}
          onChange={e => setValue('supplierPaymentTerms', e.target.value)}
          error={!!errors.supplierPaymentTerms}
        >
          {supplierPaymentOptions.map((option) => (
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

export default OperationalMetricsForm;
