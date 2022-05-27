function useTransactionWaiter(library) {
  const wait = (hash) => {
    return library.getTransactionReceipt(hash)
  }

  return wait
}

export default useTransactionWaiter
