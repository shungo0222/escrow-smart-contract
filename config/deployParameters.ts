const escrowDeployParams = {
  minSubmissionDeadlineDays: 1,
  minReviewDeadlineDays: 7,
  minPaymentDeadlineDays: 7,
  lockPeriodDays: 270,
  deadlineExtensionPeriodDays: 14,
};

const forwarderDeployParams = {
  name: "ERC2771Forwarder"
}

const tokenDeployParams = [
  {
    name: "USD Coin",
    symbol: "USDC",
    initialSupply: "1000000000", // 1000 USDC, 6桁の小数点以下
    customDecimals: 6,
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    initialSupply: "1000000000", // 1000 USDT, 6桁の小数点以下
    customDecimals: 6,
  },
  {
    name: "JPY Coin",
    symbol: "JPYC",
    initialSupply: "1000000000000000000000", // 1000 JPYC, 18桁の小数点以下
    customDecimals: 18,
  },
];

export {
  escrowDeployParams,
  forwarderDeployParams,
  tokenDeployParams
};