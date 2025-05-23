# Retail Credit Score Calculator

A comprehensive web application for calculating credit scores for retail shops in India. This tool helps both business owners and financial institutions assess creditworthiness and make informed lending decisions.

## Features

- Multi-step form interface for data collection
- Real-time validation and error handling
- Weighted scoring algorithm
- Detailed credit reports with visualizations
- Loan recommendations based on credit score
- Mobile-responsive design
- Dark/light theme support
- PDF report generation
- Progress saving

## Technical Stack

- React
- Material-UI
- React Router
- React Hook Form
- Yup (Form validation)
- Chart.js
- JSPDF

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Fill out the business information form
2. Provide financial data
3. Enter credit history details
4. Submit operational metrics
5. View your credit score and detailed report

## Credit Score Calculation Methodology

The credit score is calculated using a weighted algorithm with four main components:

1. **Financial Health (40%)**
   - Revenue stability
   - Profit margin
   - Debt-to-income ratio

2. **Credit History (30%)**
   - CIBIL score
   - Repayment history
   - Default history
   - Banking relationship duration

3. **Business Stability (20%)**
   - Years in operation
   - Business type risk factor

4. **Operational Efficiency (10%)**
   - Digital adoption
   - Inventory turnover
   - Payment terms

## Score Categories

- 750-850: Excellent (Green)
- 650-749: Good (Blue)
- 550-649: Fair (Yellow)
- 300-549: Poor (Red)

## Security

- All form inputs are validated
- Data is sanitized before processing
- No sensitive data is stored
- Secure PDF generation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact support@retailcredit.com or create an issue in the GitHub repository.
