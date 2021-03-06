export default [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "poolType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "at",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proposalContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "basicToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "commission",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "descriptionURL",
        type: "string",
      },
    ],
    name: "TraderPoolDeployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "descriptionURL",
            type: "string",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "bool",
            name: "privatePool",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "totalLPEmission",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "baseToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minimalInvestment",
            type: "uint256",
          },
          {
            internalType: "enum ICoreProperties.CommissionPeriod",
            name: "commissionPeriod",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "commissionPercentage",
            type: "uint256",
          },
        ],
        internalType: "struct IPoolFactory.TraderPoolDeployParameters",
        name: "parameters",
        type: "tuple",
      },
    ],
    name: "deployBasicPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "withValidators",
        type: "bool",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "bool",
                    name: "earlyCompletion",
                    type: "bool",
                  },
                  {
                    internalType: "uint64",
                    name: "duration",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "durationValidators",
                    type: "uint64",
                  },
                  {
                    internalType: "uint128",
                    name: "quorum",
                    type: "uint128",
                  },
                  {
                    internalType: "uint128",
                    name: "quorumValidators",
                    type: "uint128",
                  },
                  {
                    internalType: "uint256",
                    name: "minTokenBalance",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "minNftBalance",
                    type: "uint256",
                  },
                ],
                internalType: "struct IGovSettings.ProposalSettings",
                name: "internalProposalSetting",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "bool",
                    name: "earlyCompletion",
                    type: "bool",
                  },
                  {
                    internalType: "uint64",
                    name: "duration",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "durationValidators",
                    type: "uint64",
                  },
                  {
                    internalType: "uint128",
                    name: "quorum",
                    type: "uint128",
                  },
                  {
                    internalType: "uint128",
                    name: "quorumValidators",
                    type: "uint128",
                  },
                  {
                    internalType: "uint256",
                    name: "minTokenBalance",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "minNftBalance",
                    type: "uint256",
                  },
                ],
                internalType: "struct IGovSettings.ProposalSettings",
                name: "defaultProposalSetting",
                type: "tuple",
              },
            ],
            internalType: "struct IPoolFactory.SettingsDeployParams",
            name: "seetingsParams",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "symbol",
                type: "string",
              },
              {
                internalType: "uint64",
                name: "duration",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "quorum",
                type: "uint128",
              },
              {
                internalType: "address[]",
                name: "validators",
                type: "address[]",
              },
              {
                internalType: "uint256[]",
                name: "balances",
                type: "uint256[]",
              },
            ],
            internalType: "struct IPoolFactory.ValidatorsDeployParams",
            name: "validatorsParams",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "address",
                name: "nftAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "totalPowerInTokens",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "nftsTotalSupply",
                type: "uint256",
              },
            ],
            internalType: "struct IPoolFactory.UserKeeperDeployParams",
            name: "userKeeperParams",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "votesLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feePercentage",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "descriptionURL",
            type: "string",
          },
        ],
        internalType: "struct IPoolFactory.GovPoolDeployParams",
        name: "parameters",
        type: "tuple",
      },
    ],
    name: "deployGovPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "descriptionURL",
            type: "string",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "bool",
            name: "privatePool",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "totalLPEmission",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "baseToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minimalInvestment",
            type: "uint256",
          },
          {
            internalType: "enum ICoreProperties.CommissionPeriod",
            name: "commissionPeriod",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "commissionPercentage",
            type: "uint256",
          },
        ],
        internalType: "struct IPoolFactory.TraderPoolDeployParameters",
        name: "parameters",
        type: "tuple",
      },
    ],
    name: "deployInvestPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getInjector",
    outputs: [
      {
        internalType: "address",
        name: "_injector",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractsRegistry",
        type: "address",
      },
    ],
    name: "setDependencies",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_injector",
        type: "address",
      },
    ],
    name: "setInjector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]
