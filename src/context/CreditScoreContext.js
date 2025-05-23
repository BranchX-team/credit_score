import React, { createContext, useState, useContext } from 'react';

const CreditScoreContext = createContext(null);

export const CreditScoreProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    businessInfo: {},
    financialData: {},
    creditHistory: {},
    operationalMetrics: {}
  });

  const [creditScore, setCreditScore] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateCreditScore = (data) => {
    if (!data || !data.businessInfo || !data.financialData || !data.creditHistory || !data.operationalMetrics) {
      console.error('Missing required form data in calculateCreditScore:', data);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    console.log('Starting credit score calculation with:', data);
    
    // Calculate individual scores with proper data structure
    const financialScore = calculateFinancialScore(data.financialData) || 0;
    const creditHistoryScore = calculateCreditHistoryScore(data.creditHistory) || 0;
    const businessStabilityScore = calculateBusinessStabilityScore(data.businessInfo) || 0;
    const operationalScore = calculateOperationalScore(data.operationalMetrics) || 0;

    // Calculate weighted score
    const finalScore = (
      (financialScore * 0.4) +
      (creditHistoryScore * 0.3) +
      (businessStabilityScore * 0.2) +
      (operationalScore * 0.1)
    );

    // Set the score immediately
    setCreditScore(Math.round(finalScore));
    setReportData({
      businessInfo: data.businessInfo,
      financialData: data.financialData,
      creditHistory: data.creditHistory,
      operationalMetrics: data.operationalMetrics,
      scores: {
        financial: financialScore,
        creditHistory: creditHistoryScore,
        businessStability: businessStabilityScore,
        operational: operationalScore,
        final: finalScore
      }
    });
    setIsLoading(false);
  };

  // Helper functions for score calculations
  const calculateFinancialScore = (financialData) => {
    const { monthlySales = 0, profitMargin = 0, monthlyEMI = 0, averageBankBalance = 0 } = financialData;
    
    // Calculate financial health score
    let score = 50; // Base score
    
    // Debt-to-income ratio
    if (monthlySales > 0) {
      const debtRatio = (monthlyEMI / monthlySales) * 100;
      if (debtRatio <= 30) score += 20;
      else if (debtRatio <= 50) score += 10;
    }
    
    // Profit margin
    score += Math.min(20, profitMargin * 2);
    
    // Bank balance
    score += Math.min(10, averageBankBalance / 10000);
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateCreditHistoryScore = (creditHistory) => {
    const { cibilScore = 0, defaults = 0, bankingRelationship = 0, returnedCheques = 0 } = creditHistory;
    
    // Base score based on CIBIL
    let score = cibilScore ? ((cibilScore - 300) / 5.5) : 50;
    
    // Deduct points for defaults
    score -= Math.min(50, defaults * 10);
    
    // Deduct points for returned cheques
    score -= Math.min(20, returnedCheques * 5);
    
    // Add points for banking relationship
    score += Math.min(20, bankingRelationship * 2);
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateBusinessStabilityScore = (businessInfo) => {
    const { yearsInOperation = 0, annualRevenue = 0, employees = 0 } = businessInfo;
    
    // Base score
    let score = 50;
    
    // Years in operation
    score += Math.min(20, yearsInOperation * 2);
    
    // Annual revenue
    score += Math.min(20, annualRevenue / 1000000);
    
    // Number of employees
    score += Math.min(10, employees / 5);
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateOperationalScore = (operationalMetrics) => {
    const { digitalPayments = 0, inventoryTurnover = 'Monthly', seasonalImpact = 'Low' } = operationalMetrics;
    
    // Base score
    let score = 50;
    
    // Digital payments
    score += Math.min(20, digitalPayments);
    
    // Inventory turnover
    switch (inventoryTurnover) {
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
    
    // Seasonal impact
    switch (seasonalImpact) {
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
    
    return Math.max(0, Math.min(100, score));
  };

  const resetCalculator = () => {
    setFormData({
      businessInfo: {},
      financialData: {},
      creditHistory: {},
      operationalMetrics: {}
    });
    setCreditScore(null);
    setReportData(null);
  };

  return (
    <CreditScoreContext.Provider
      value={{
        formData,
        creditScore,
        reportData,
        isLoading,
        setFormData,
        calculateCreditScore,
        resetCalculator
      }}
    >
      {children}
    </CreditScoreContext.Provider>
  );
};

export const useCreditScore = () => {
  const context = useContext(CreditScoreContext);
  if (context === undefined) {
    throw new Error('useCreditScore must be used within a CreditScoreProvider');
  }
  return context;
};
