import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  // eslint-disable-next-line
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      px: 2
    }}>
      <Box sx={{ maxWidth: 800, width: '100%', textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2
        }}>
          Retail Credit Score Calculator
        </Typography>

        <Typography variant="h5" color="text.secondary" paragraph>
          Calculate your business credit score and get personalized loan recommendations
        </Typography>

        <Button
          component={RouterLink}
          to="/credit-score"
          variant="contained"
          size="large"
          sx={{
            mt: 4,
            px: 4,
            py: 2,
            fontSize: '1.1rem'
          }}
        >
          Calculate Your Score
        </Button>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Why Use Our Calculator?
          </Typography>

          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Accurate Scoring
                  </Typography>
                  <Typography>
                    Our algorithm considers multiple factors including financial health,
                    credit history, and operational efficiency.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Personalized Recommendations
                  </Typography>
                  <Typography>
                    Get tailored loan recommendations based on your credit score and business profile.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Detailed Reports
                  </Typography>
                  <Typography>
                    Generate comprehensive reports with visual score breakdowns and improvement suggestions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
