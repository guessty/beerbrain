const barObject = {
  id: null,
  name: null,
  lat: null,
  long: null,
  image_url: null
}

const productObject = {
  id: null,
  name: null,
  image_url: null,
}

const currentPricesObject = {
  bar_id: null,
  product_id: null,
  current_price: null
}

const generateBars = () => {
  const bars = []
  for (let i = 0; i < 20; i++) {
    bars.push(Object.assign({}, barObject, {
      id: `bar_${i}`,
      name: `Bar ${i}`
    }))
  }
  return bars
}

const generatePrice = () => {
  const prices = [4.50, 3.80, 3.50, 4.10, 5.00, 2.00, 2.75, 2.40]
  return prices[Math.floor(Math.random() * prices.length)]
}

const generateProducts = () => {
  const products = []
  for (let i = 0; i < 10; i++) {
    products.push(Object.assign({}, productObject, {
      id: `product_${i}`,
      name: `Product ${i}`
    }, {
      price: generatePrice()
    }))
  }
  return products
}

export const _getAllBars = () => new Promise((resolve, reject) => {
  resolve(generateBars())
})

export const _getBarDetails = (id) => new Promise((resolve, reject) => {
  const barDetails = Object.assign(
    {}, generateBars().filter((bar) => bar.id === id)[0],
    { products: generateProducts() }
  )
  resolve(barDetails)
})
