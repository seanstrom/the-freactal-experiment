const defer = (value = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, value)
  })
}

const isPrime = (n) => {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) {
    return false
  }

  const squareRoot = Math.sqrt(n)

  for (const i = 2; i <= squareRoot; i++) {
    if (n % i === 0) {
      return false
    }
  }

  return true;
}

export { defer, isPrime }
