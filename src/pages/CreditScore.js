import React from 'react';
import { useCreditScore } from '../context/CreditScoreContext';
import { Box, Stepper, Step, StepLabel, Typography, Paper, CircularProgress, Button } from '@mui/material';
import BusinessInfoForm from '../components/forms/BusinessInfoForm';
import FinancialDataForm from '../components/forms/FinancialDataForm';
import CreditHistoryForm from '../components/forms/CreditHistoryForm';
import OperationalMetricsForm from '../components/forms/OperationalMetricsForm';
import ScoreReport from '../components/ScoreReport';

const steps = [
  'Business Information',
  'Financial Data',
  'Credit History',
  'Operational Metrics',
  'Score Report'
];

const CreditScore = () => {
  const { formData, setFormData, calculateCreditScore, isLoading, resetCalculator } = useCreditScore();
  const [activeStep, setActiveStep] = React.useState(0);

  // Wrap resetCalculator to also reset the step
  const handleResetCalculator = () => {
    resetCalculator();
    setActiveStep(0);
  }

  const handleNext = () => {
    setActiveStep((prevStep) => {
      const newStep = prevStep + 1;
      // Skip to score report if we're on the last form step
      if (prevStep === 3) {
        return 4; // Skip to score report
      }
      return newStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = (sectionData) => {
    // Merge the new section data with the previous form data
    setFormData((prevData) => {
      const stepKeys = ['businessInfo', 'financialData', 'creditHistory', 'operationalMetrics'];
      const key = stepKeys[activeStep];
      const updatedData = {
        ...prevData,
        [key]: sectionData
      };

      // If we're on the last form step (Operational Metrics), calculate score with the latest data
      if (activeStep === 3) {
        const data = {
          businessInfo: updatedData.businessInfo,
          financialData: updatedData.financialData,
          creditHistory: updatedData.creditHistory,
          operationalMetrics: updatedData.operationalMetrics
        };
        console.log('Calculating score with data:', data);
        calculateCreditScore(data);
        setActiveStep(4);
      } else {
        handleNext();
      }
      return updatedData;
    });
  };


  const getStepContent = (step) => {
    const showBack = step > 0 && step < 4;
    const onBack = handleBack;
    switch (step) {
      case 0:
        return <BusinessInfoForm onSubmit={handleFormSubmit} defaultValues={formData.businessInfo} showBack={showBack} onBack={onBack} />;
      case 1:
        return <FinancialDataForm onSubmit={handleFormSubmit} defaultValues={formData.financialData} showBack={showBack} onBack={onBack} />;
      case 2:
        return <CreditHistoryForm onSubmit={handleFormSubmit} defaultValues={formData.creditHistory} showBack={showBack} onBack={onBack} />;
      case 3:
        return <OperationalMetricsForm onSubmit={handleFormSubmit} defaultValues={formData.operationalMetrics} showBack={showBack} onBack={onBack} />;
      case 4:
        return <ScoreReport handleResetCalculator={handleResetCalculator} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Credit Score Calculator
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {isLoading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Calculating Credit Score...
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <CircularProgress variant="determinate" value={50} />
            </Box>
            <Typography variant="body2">
              Please wait while we analyze your data
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {getStepContent(activeStep)}
          </Box>
        )}


      </Paper>
    </Box>
  );
};

export default CreditScore;
