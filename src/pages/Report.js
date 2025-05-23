import React from 'react';
import { useCreditScore } from '../context/CreditScoreContext';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
  const { reportData, creditScore } = useCreditScore();

  if (!reportData || !creditScore) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">No Report Available</Typography>
        <Typography>Please calculate your credit score first.</Typography>
      </Box>
    );
  }

  const scoreCategories = [
    { min: 750, max: 850, color: '#4CAF50', label: 'Excellent' },
    { min: 650, max: 749, color: '#2196F3', label: 'Good' },
    { min: 550, max: 649, color: '#FFC107', label: 'Fair' },
    { min: 300, max: 549, color: '#F44336', label: 'Poor' }
  ];

  const scoreCategory = scoreCategories.find(
    (category) => creditScore >= category.min && creditScore <= category.max
  );

  const scoreBreakdown = [
    { label: 'Financial Health', value: reportData.scores.financial },
    { label: 'Credit History', value: reportData.scores.creditHistory },
    { label: 'Business Stability', value: reportData.scores.businessStability },
    { label: 'Operational Efficiency', value: reportData.scores.operational }
  ];

  const doughnutData = {
    labels: scoreBreakdown.map(item => item.label),
    datasets: [{
      data: scoreBreakdown.map(item => item.value),
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
    }],
  };

  const loanRecommendations = () => {
    let maxLoan = 0;
    let interestRate = '';
    let loanTenure = '';

    if (creditScore >= 750) {
      maxLoan = Math.round(reportData.financialData.monthlyRevenue * 12 * 2);
      interestRate = '8-10%';
      loanTenure = '3-5 years';
    } else if (creditScore >= 650) {
      maxLoan = Math.round(reportData.financialData.monthlyRevenue * 12 * 1.5);
      interestRate = '10-12%';
      loanTenure = '2-4 years';
    } else {
      maxLoan = Math.round(reportData.financialData.monthlyRevenue * 12);
      interestRate = '12-15%';
      loanTenure = '1-3 years';
    }

    return {
      maxLoan,
      interestRate,
      loanTenure
    };
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Credit Score Report
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ mr: 2 }}>
            Your Credit Score:
          </Typography>
          <Typography variant="h4" sx={{ color: scoreCategory.color }}>
            {creditScore}
          </Typography>
          <Typography variant="h5" sx={{ ml: 2 }}>
            ({scoreCategory.label})
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Score Breakdown
        </Typography>
        <Doughnut data={doughnutData} />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Loan Recommendations
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">
              Maximum Loan Amount: ₹{loanRecommendations().maxLoan.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">
              Interest Rate: {loanRecommendations().interestRate}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">
              Loan Tenure: {loanRecommendations().loanTenure}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Business Analysis
        </Typography>
        <Typography paragraph>
          <strong>Strengths:</strong>
          <ul>
            {scoreBreakdown
              .filter(item => item.value >= 80)
              .map((item, index) => (
                <li key={index}>{item.label}</li>
              ))}
          </ul>
        </Typography>
        <Typography paragraph>
          <strong>Areas for Improvement:</strong>
          <ul>
            {scoreBreakdown
              .filter(item => item.value < 80)
              .map((item, index) => (
                <li key={index}>{item.label}</li>
              ))}
          </ul>
        </Typography>
      </Paper>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={() => {
            // Export to PDF functionality
          }}
        >
          Export Report
        </Button>
      </Box>
    </Box>
  );
};

export default Report;
