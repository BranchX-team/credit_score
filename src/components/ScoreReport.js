import React from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, LinearProgress, Button } from '@mui/material';
import { useCreditScore } from '../context/CreditScoreContext';

const ScoreReport = ({ handleResetCalculator }) => {
  const { creditScore, reportData, isLoading, resetCalculator } = useCreditScore();

  const doReset = handleResetCalculator || resetCalculator;

  if (!creditScore || !reportData || isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <CircularProgress />
        <Button
          variant="contained"
          onClick={doReset}
          sx={{
            backgroundColor: '#dc004e',
            '&:hover': {
              backgroundColor: '#b00036'
            },
            mt: 3
          }}
        >
          Reset Calculator
        </Button>
      </Box>
    );
  }

  const { scores } = reportData;
  const { businessInfo, financialData, creditHistory, operationalMetrics } = reportData;

  // Helper to get score category
  const getScoreCategory = (score) => {
    if (score <= 25) return 'Very bad';
    if (score <= 50) return 'Bad';
    if (score <= 70) return 'Average';
    if (score <= 90) return 'Good';
    return 'Very good';
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Credit Score Report
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Your Credit Score: {Math.round(creditScore)}/100 ({getScoreCategory(creditScore)})
            </Typography>
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress variant="determinate" value={creditScore} />
            </Box>
            <Typography variant="body1" color="textSecondary">
              Based on your inputs, this is your calculated credit score.
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Score Breakdown
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Financial Score: {Math.round(scores.financial)}/100 ({getScoreCategory(scores.financial)})</Typography>
                <Typography variant="body2" color="textSecondary">
                  Based on monthly sales, profit margin, and financial health
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Credit History: {Math.round(scores.creditHistory)}/100 ({getScoreCategory(scores.creditHistory)})</Typography>
                <Typography variant="body2" color="textSecondary">
                  Based on CIBIL score and payment history
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Business Stability: {Math.round(scores.businessStability)}/100 ({getScoreCategory(scores.businessStability)})</Typography>
                <Typography variant="body2" color="textSecondary">
                  Based on years in operation and business size
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Operational Score: {Math.round(scores.operational)}/100 ({getScoreCategory(scores.operational)})</Typography>
                <Typography variant="body2" color="textSecondary">
                  Based on digital payments and operational metrics
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recommendations
            </Typography>
            <Typography variant="body1">
              1. Maintain good financial health by keeping debt-to-income ratio below 30%<br />
              2. Build good credit history by making timely payments<br />
              3. Increase digital transactions for better operational scores<br />
              4. Avoid cheque bounces and defaults<br />
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={doReset}
                sx={{ ml: 2 }}
              >
                Reset Calculator
              </Button>
            </Box>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => {
                resetCalculator();
              }}
              sx={{
                backgroundColor: '#dc004e',
                '&:hover': {
                  backgroundColor: '#b00036'
                }
              }}
            >
              Reset Calculator
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ScoreReport;
