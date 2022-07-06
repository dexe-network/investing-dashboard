import { parseEther } from "@ethersproject/units"

function useWithdrawalHistory() {
  const data = [
    {
      id: "id_1",
      creationTime: new Date().valueOf(),
      pnl: parseEther("115"),
      profit: parseEther("3000"),
      fee: parseEther("1000"),
    },
    {
      id: "id_2",
      creationTime: new Date().valueOf(),
      pnl: parseEther("142.11"),
      profit: parseEther("4555.67"),
      fee: parseEther("2314.13"),
    },
    {
      id: "id_3",
      creationTime: new Date().valueOf(),
      pnl: parseEther("454.11"),
      profit: parseEther("12209490.67"),
      fee: parseEther("2314.13"),
    },
    {
      id: "id_4",
      creationTime: new Date().valueOf(),
      pnl: parseEther("137.93"),
      profit: parseEther("7505.02"),
      fee: parseEther("4232.63"),
    },
    {
      id: "id_5",
      creationTime: new Date().valueOf(),
      pnl: parseEther("189.56"),
      profit: parseEther("34322.09"),
      fee: parseEther("11449.15"),
    },
  ]

  return data
}

export default useWithdrawalHistory
