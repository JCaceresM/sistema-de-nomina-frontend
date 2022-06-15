/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { EmployeeType } from "../../../actions/employee/employee.actions";

/* eslint-disable @typescript-eslint/no-explicit-any */
const scaleOne = 34685.0;
const scaleTwo = 52027.41;
const scaleTree = 72260.25;
export const ISR = (value = 0): number => {
  const retentionSFS = SFS(value);
  const retentionAFP = AFP(value);
  const salaryAfterRetentionNSS = value - retentionSFS - retentionAFP;

  return (
    levelOne(salaryAfterRetentionNSS) +
    levelTwo(salaryAfterRetentionNSS) +
    levelTree(salaryAfterRetentionNSS)
  );
};
const levelOne = (value: number): number => {
  if (value < scaleOne) {
    return 0;
  }
  return (value - scaleOne) * 0.15;
};
const levelTwo = (value: number): number => {
  if (value > scaleTwo) {
    return (value - scaleTwo) * (20 / 100);
  }
  return 0;
};
const levelTree = (value: number): number => {
  if (value > scaleTree) {
    return (value - scaleTree) * 0.25;
  }
  return 0;
};
export const SFS = (value: number): number => {
  const res = value * 0.0304;
  return res > 4742.4 ? 4742.4 : res;
};
export const AFP = (value: number): number => {
  const res = value * 0.0287;
  return res > 8954.4 ? 8954.4 : res;
};

export const totalDiscount = (
  employee: EmployeeType,
  payrollNews: any = []
) => {
  const retentionSFS = SFS(employee.salary);
  const retentionAFP = AFP(employee.salary);
  const retentionISR = ISR(employee.salary);
  const payroll_news = employee?.payroll_news || [];
  const discountsMixed = [...payroll_news, ...payrollNews]
    .filter((e) => e.operation === "RESTA")
    .reduce((acc, news) => acc + news.amount, 0);
  return discountsMixed + retentionSFS + retentionAFP + retentionISR;
};
export const othersIncome = (employee: any, payrollNews: any) => {
  const payroll_news = employee.payroll_news || [];
  return [...payroll_news, ...payrollNews]
    .filter((e) => e.operation === "SUMA")
    .reduce((acc, news) => acc + news.amount, 0);
};
export const netEarnings = (
  employee: any,
  payrollNews: any,
  calculateTSS = false
) => {
  return (
    othersIncome(employee, payrollNews) +
    employee.salary -
    (calculateTSS ? totalDiscount(employee, payrollNews) : 0)
  );
};
export const sumNews = (arr = [], operation = "RESTA") => {
  return arr.reduce(
    (acc, item: Record<string, any>) =>
      operation === item.operation ? acc + item.amount : acc + 0,
    0
  );
};
