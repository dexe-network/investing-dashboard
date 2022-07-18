export default [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "fromToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "toToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fromVolume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toVolume",
        type: "uint256",
      },
    ],
    name: "ProposalActivePortfolioExchanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "timestampLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "investLPLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxTokenPriceLimit",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct ITraderPoolRiskyProposal.ProposalLimits",
        name: "proposalLimits",
        type: "tuple",
      },
    ],
    name: "ProposalCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "divestedLP2",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "receivedLP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "receivedBase",
        type: "uint256",
      },
    ],
    name: "ProposalDivested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "fromToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "toToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fromVolume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toVolume",
        type: "uint256",
      },
    ],
    name: "ProposalExchanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "investedLP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "investedBase",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "receivedLP2",
        type: "uint256",
      },
    ],
    name: "ProposalInvested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "investor",
        type: "address",
      },
    ],
    name: "ProposalInvestorAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "investor",
        type: "address",
      },
    ],
    name: "ProposalInvestorRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "positionToken",
        type: "address",
      },
    ],
    name: "ProposalPositionClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ProposalRestrictionsChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "parentPoolAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "address",
            name: "baseToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "baseTokenDecimals",
            type: "uint256",
          },
        ],
        internalType: "struct ITraderPoolProposal.ParentTraderPoolInfo",
        name: "parentTraderPoolInfo",
        type: "tuple",
      },
    ],
    name: "__TraderPoolProposal_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "parentPoolAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "address",
            name: "baseToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "baseTokenDecimals",
            type: "uint256",
          },
        ],
        internalType: "struct ITraderPoolProposal.ParentTraderPoolInfo",
        name: "parentTraderPoolInfo",
        type: "tuple",
      },
    ],
    name: "__TraderPoolRiskyProposal_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "timestampLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "investLPLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxTokenPriceLimit",
            type: "uint256",
          },
        ],
        internalType: "struct ITraderPoolRiskyProposal.ProposalLimits",
        name: "proposalLimits",
        type: "tuple",
      },
    ],
    name: "changeProposalRestrictions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "timestampLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "investLPLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxTokenPriceLimit",
            type: "uint256",
          },
        ],
        internalType: "struct ITraderPoolRiskyProposal.ProposalLimits",
        name: "proposalLimits",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "lpInvestment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseInvestment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "instantTradePercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minPositionOut",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "optionalPath",
        type: "address[]",
      },
    ],
    name: "create",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lp2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minPositionOut",
        type: "uint256",
      },
    ],
    name: "divest",
    outputs: [
      {
        internalType: "uint256",
        name: "receivedBase",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBound",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "optionalPath",
        type: "address[]",
      },
      {
        internalType: "enum ITraderPoolRiskyProposal.ExchangeType",
        name: "exType",
        type: "uint8",
      },
    ],
    name: "exchange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "getActiveInvestmentsInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lp2Balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseInvested",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lpInvested",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseShare",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positionShare",
            type: "uint256",
          },
        ],
        internalType: "struct ITraderPoolRiskyProposal.ActiveInvestmentInfo[]",
        name: "investments",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBaseToken",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "baseInvestment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "instantTradePercentage",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "optionalPath",
        type: "address[]",
      },
    ],
    name: "getCreationTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "positionTokens",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "positionTokenPrice",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "proposalIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lp2s",
        type: "uint256[]",
      },
    ],
    name: "getDivestAmounts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "positions",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "givenAmounts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "receivedAmounts",
            type: "uint256[]",
          },
        ],
        internalType: "struct ITraderPoolRiskyProposal.Receptions",
        name: "receptions",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "optionalPath",
        type: "address[]",
      },
      {
        internalType: "enum ITraderPoolRiskyProposal.ExchangeType",
        name: "exType",
        type: "uint8",
      },
    ],
    name: "getExchangeAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseInvestment",
        type: "uint256",
      },
    ],
    name: "getInvestTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "baseAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "positionAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lp2Amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInvestedBaseInUSD",
    outputs: [
      {
        internalType: "uint256",
        name: "investedBaseUSD",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "toBeInvested",
        type: "uint256",
      },
    ],
    name: "getInvestmentPercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "getProposalInfos",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenDecimals",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "timestampLimit",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "investLPLimit",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxTokenPriceLimit",
                    type: "uint256",
                  },
                ],
                internalType: "struct ITraderPoolRiskyProposal.ProposalLimits",
                name: "proposalLimits",
                type: "tuple",
              },
              {
                internalType: "uint256",
                name: "lpLocked",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "balanceBase",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "balancePosition",
                type: "uint256",
              },
            ],
            internalType: "struct ITraderPoolRiskyProposal.ProposalInfo",
            name: "proposalInfo",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "totalProposalUSD",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalProposalBase",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lp2Supply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalInvestors",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positionTokenPrice",
            type: "uint256",
          },
        ],
        internalType: "struct ITraderPoolRiskyProposal.ProposalInfoExtended[]",
        name: "proposals",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getTotalActiveInvestments",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "proposalIds",
        type: "uint256[]",
      },
    ],
    name: "getUserInvestmentsLimits",
    outputs: [
      {
        internalType: "uint256[]",
        name: "lps",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lpInvestment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseInvestment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minPositionOut",
        type: "uint256",
      },
    ],
    name: "invest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "investedBase",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeed",
    outputs: [
      {
        internalType: "contract IPriceFeed",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalsTotalNum",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
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
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalLPBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalLockedLP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]
