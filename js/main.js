/**
 * Big Beaver Bank (BBB) - Main JavaScript
 * Handles global interactions and home page financial calculator.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
      if (nav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Personal Loan / Mortgage Calculator
  const calcAmount = document.getElementById('calc-amount');
  const calcRate = document.getElementById('calc-rate');
  const calcTerm = document.getElementById('calc-term');

  if (calcAmount && calcRate && calcTerm) {
    const calculatePayments = () => {
      const principal = parseFloat(calcAmount.value) || 0;
      const annualRate = parseFloat(calcRate.value) || 0;
      const termYears = parseInt(calcTerm.value) || 1;

      const monthlyRate = annualRate / 100 / 12;
      const totalPayments = termYears * 12;

      let monthlyPayment = 0;
      let totalInterest = 0;

      if (principal > 0 && totalPayments > 0) {
        if (monthlyRate === 0) {
          monthlyPayment = principal / totalPayments;
        } else {
          monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
        }
        totalInterest = (monthlyPayment * totalPayments) - principal;
      }

      // Update UI
      const resultVal = document.getElementById('result-monthly');
      const resultPrincipal = document.getElementById('result-principal');
      const resultInterest = document.getElementById('result-interest');

      if (resultVal) {
        resultVal.textContent = `$${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      if (resultPrincipal) {
        resultPrincipal.textContent = `$${principal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      }
      if (resultInterest) {
        resultInterest.textContent = `$${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      }
    };

    // Add event listeners to input elements
    [calcAmount, calcRate, calcTerm].forEach(input => {
      input.addEventListener('input', calculatePayments);
    });

    // Run initial calculation
    calculatePayments();
  }
});
