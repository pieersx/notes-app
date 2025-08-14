const { reverse } = require('../utils/for_testing')

test.skip('reverse de pieersx', () => {
  const result = reverse('pieersx')
  expect(result).toBe('xsreeip')
})

test.skip('reverse de un string vacío', () => {
  const result = reverse('')
  expect(result).toBe('')
})

test.skip('reverse de undefined', () => {
  const result = reverse()
  expect(result).toBeUndefined()
})

// import assert from 'node:assert'
// import { test } from 'node:test'
// import { reverse } from '../utils/for_testing.js'

// test('reverse of a', () => {
//   const result = reverse('a')

//   assert.strictEqual(result, 'a')
// })

// test('reverse of react', () => {
//   const result = reverse('react')

//   assert.strictEqual(result, 'tcaer')
// })

// test('reverse of saippuakauppias', () => {
//   const result = reverse('saippuakauppias')

//   assert.strictEqual(result, 'saippuakauppias')
// })
