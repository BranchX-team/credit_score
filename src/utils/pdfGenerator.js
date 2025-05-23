import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (reportData) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();

  // Add title
  doc.setFontSize(20);
  doc.text('Retail Credit Score Report', 105, 20, { align: 'center' });

  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${date}`, 105, 30, { align: 'center' });

  // Add score section
  doc.setFontSize(16);
  doc.text('Credit Score:', 15, 50);
  doc.setFontSize(24);
  doc.setTextColor(33, 150, 243);
  doc.text(`${reportData.creditScore}`, 15, 65);

  // Add score breakdown
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Score Breakdown:', 15, 85);
  
  const scoreData = [
    ['Category', 'Score'],
    ['Financial Health', reportData.scores.financial],
    ['Credit History', reportData.scores.creditHistory],
    ['Business Stability', reportData.scores.businessStability],
    ['Operational Efficiency', reportData.scores.operational]
  ];

  doc.autoTable({
    head: scoreData.slice(0, 1),
    body: scoreData.slice(1),
    startY: 95,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 2
    }
  });

  // Add loan recommendations
  doc.setFontSize(14);
  doc.text('Loan Recommendations:', 15, doc.lastAutoTable.finalY + 15);

  const loanData = [
    ['Maximum Loan Amount', `₹${reportData.loanRecommendations.maxLoan.toLocaleString()}`],
    ['Interest Rate Range', reportData.loanRecommendations.interestRate],
    ['Recommended Tenure', reportData.loanRecommendations.loanTenure]
  ];

  doc.autoTable({
    head: [['Parameter', 'Value']],
    body: loanData,
    startY: doc.lastAutoTable.finalY + 20,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 2
    }
  });

  // Add business analysis
  doc.setFontSize(14);
  doc.text('Business Analysis:', 15, doc.lastAutoTable.finalY + 15);

  const strengths = reportData.scoreBreakdown
    .filter(item => item.value >= 80)
    .map(item => item.label);

  const improvements = reportData.scoreBreakdown
    .filter(item => item.value < 80)
    .map(item => item.label);

  doc.setFontSize(12);
  doc.text('Strengths:', 15, doc.lastAutoTable.finalY + 25);
  strengths.forEach((strength, index) => {
    doc.text(`• ${strength}`, 15, doc.lastAutoTable.finalY + 35 + (index * 10));
  });

  doc.text('Areas for Improvement:', 15, doc.lastAutoTable.finalY + 45 + (strengths.length * 10));
  improvements.forEach((improvement, index) => {
    doc.text(`• ${improvement}`, 15, doc.lastAutoTable.finalY + 55 + (strengths.length * 10) + (index * 10));
  });

  // Save PDF
  const filename = `credit-score-report-${date.replace(/\//g, '-')}.pdf`;
  doc.save(filename);
};

export default generatePDF;
