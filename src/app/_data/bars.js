
const barObject = {
  id: null,
  name: null,
  lat: null,
  long: null,
  image_url: null
}

export default () => {
  const bars = []
  for (let i = 0; i < 20; i++) {
    bars.push(Object.assign({}, barObject, {
      id: `bar_${i}`,
      name: `Bar ${i}`
    }))
  }
  return bars
}
