import double from './double.js'

export default string => {
  const doubled = double(string)
  return { string, doubled }
}
