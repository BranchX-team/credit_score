#!/usr/bin/env node
// Interactive CLI credit score calculator for retail shop owners
const inquirer = require('inquirer');
const chalk = require('chalk');

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function calcFinancialScore(data) {
  let score = 50;
  if (data.monthlySales > 0) {
    const debtRatio = (data.monthlyEMI / data.monthlySales) * 100;
    if (debtRatio <= 30) score += 20;
    else if (debtRatio <= 50) score += 10;
  }
  score += Math.min(20, data.profitMargin * 2);
  score += Math.min(10, data.averageBankBalance / 10000);
  return clamp(score, 0, 100);
}

function calcCreditHistoryScore(data) {
  let score = data.cibilScore ? ((data.cibilScore - 300) / 5.5) : 50;
  score -= Math.min(50, data.defaults * 10);
  score -= Math.min(20, data.returnedCheques * 5);
  score += Math.min(20, data.bankingRelationship * 2);
  return clamp(score, 0, 100);
}

function calcBusinessStabilityScore(data) {
  let score = 50;
  score += Math.min(20, data.yearsInOperation * 2);
  score += Math.min(20, data.annualRevenue / 1000000);
  score += Math.min(10, data.employees / 5);
  return clamp(score, 0, 100);
}

function calcOperationalScore(data) {
  let score = 50;
  score += Math.min(20, data.digitalPayments);
  switch (data.inventoryTurnover) {
    case 'Weekly':
      score += 20;
      break;
    case 'Monthly':
      score += 10;
      break;
    case 'Quarterly':
      score -= 10;
      break;
    case 'Slower':
      score -= 20;
      break;
  }
  switch (data.seasonalImpact) {
    case 'High':
      score -= 10;
      break;
    case 'Medium':
      score -= 5;
      break;
    case 'Low':
      score += 5;
      break;
    case 'None':
      score += 10;
      break;
  }
  return clamp(score, 0, 100);
}

function getCategory(score) {
  if (score <= 25) return { label: 'Very bad', color: chalk.red };
  if (score <= 50) return { label: 'Bad', color: chalk.yellow };
  if (score <= 70) return { label: 'Average', color: chalk.cyan };
  if (score <= 90) return { label: 'Good', color: chalk.green };
  return { label: 'Very good', color: chalk.greenBright };
}

async function main() {
  console.log(chalk.bold.cyan('\nRetail Credit Score Calculator\n'));

  const answers = await inquirer.prompt([
    { type: 'number', name: 'yearsInOperation', message: 'Years in operation:' },
    { type: 'number', name: 'annualRevenue', message: 'Annual revenue (INR):' },
    { type: 'number', name: 'employees', message: 'Number of employees:' },
    { type: 'number', name: 'monthlySales', message: 'Monthly sales:' },
    { type: 'number', name: 'profitMargin', message: 'Profit margin (%):' },
    { type: 'number', name: 'monthlyEMI', message: 'Monthly EMI:' },
    { type: 'number', name: 'averageBankBalance', message: 'Average bank balance:' },
    { type: 'number', name: 'cibilScore', message: 'CIBIL score (leave blank if unknown):', default: 0 },
    { type: 'number', name: 'defaults', message: 'Number of defaults:' },
    { type: 'number', name: 'bankingRelationship', message: 'Banking relationship (years):' },
    { type: 'number', name: 'returnedCheques', message: 'Number of returned cheques:' },
    { type: 'number', name: 'digitalPayments', message: 'Digital payments percentage (0-100):' },
    {
      type: 'list',
      name: 'inventoryTurnover',
      message: 'Inventory turnover:',
      choices: ['Weekly', 'Monthly', 'Quarterly', 'Slower'],
      default: 'Monthly'
    },
    {
      type: 'list',
      name: 'seasonalImpact',
      message: 'Seasonal impact:',
      choices: ['High', 'Medium', 'Low', 'None'],
      default: 'Low'
    }
  ]);

  const businessInfo = {
    yearsInOperation: answers.yearsInOperation,
    annualRevenue: answers.annualRevenue,
    employees: answers.employees
  };

  const financialData = {
    monthlySales: answers.monthlySales,
    profitMargin: answers.profitMargin,
    monthlyEMI: answers.monthlyEMI,
    averageBankBalance: answers.averageBankBalance
  };

  const creditHistory = {
    cibilScore: answers.cibilScore,
    defaults: answers.defaults,
    bankingRelationship: answers.bankingRelationship,
    returnedCheques: answers.returnedCheques
  };

  const operationalMetrics = {
    digitalPayments: answers.digitalPayments,
    inventoryTurnover: answers.inventoryTurnover,
    seasonalImpact: answers.seasonalImpact
  };

  const financialScore = calcFinancialScore(financialData);
  const creditHistoryScore = calcCreditHistoryScore(creditHistory);
  const businessStabilityScore = calcBusinessStabilityScore(businessInfo);
  const operationalScore = calcOperationalScore(operationalMetrics);

  const finalScore = Math.round(
    financialScore * 0.4 +
    creditHistoryScore * 0.3 +
    businessStabilityScore * 0.2 +
    operationalScore * 0.1
  );

  const { label, color } = getCategory(finalScore);

  console.log('\n' + color(`Your Credit Score: ${finalScore}/100 (${label})`));
  console.log(chalk.bold('\nScore Breakdown:'));
  console.log('  Financial Score: ' + Math.round(financialScore));
  console.log('  Credit History: ' + Math.round(creditHistoryScore));
  console.log('  Business Stability: ' + Math.round(businessStabilityScore));
  console.log('  Operational Score: ' + Math.round(operationalScore));

  console.log(chalk.bold('\nRecommendations to improve your score:'));
  if (financialData.monthlySales > 0 && (financialData.monthlyEMI / financialData.monthlySales) * 100 > 30) {
    console.log(' - Reduce your debt relative to sales to keep debt-to-income ratio below 30%.');
  }
  if (creditHistory.defaults > 0 || creditHistory.returnedCheques > 0) {
    console.log(' - Avoid defaults and cheque bounces to build a stronger credit history.');
  }
  if (operationalMetrics.digitalPayments < 50) {
    console.log(' - Increase digital transactions for better operational efficiency.');
  }
  console.log(' - Make timely payments to maintain a good credit record.');
}

main();
