import { ethers } from "ethers"

function useWithdrawalHistory() {
  const data = [
    {
      id: "id_1",
      creationTime: new Date().valueOf(),
      pnl: ethers.utils.parseEther("115"),
      profit: ethers.utils.parseEther("3000"),
      fee: ethers.utils.parseEther("1000"),
    },
    {
      id: "id_2",
      creationTime: new Date().valueOf(),
      pnl: ethers.utils.parseEther("142.11"),
      profit: ethers.utils.parseEther("4555.67"),
      fee: ethers.utils.parseEther("2314.13"),
    },
    {
      id: "id_3",
      creationTime: new Date().valueOf(),
      pnl: ethers.utils.parseEther("454.11"),
      profit: ethers.utils.parseEther("12209490.67"),
      fee: ethers.utils.parseEther("2314.13"),
    },
    {
      id: "id_4",
      creationTime: new Date().valueOf(),
      pnl: ethers.utils.parseEther("137.93"),
      profit: ethers.utils.parseEther("7505.02"),
      fee: ethers.utils.parseEther("4232.63"),
    },
    {
      id: "id_5",
      creationTime: new Date().valueOf(),
      pnl: ethers.utils.parseEther("189.56"),
      profit: ethers.utils.parseEther("34322.09"),
      fee: ethers.utils.parseEther("11449.15"),
    },
  ]

  return data
}

export default useWithdrawalHistory
