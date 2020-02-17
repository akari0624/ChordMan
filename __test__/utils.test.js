const { doTransWork } = require('../utils')

test('test chord text generator', () => {
  expect(doTransWork('Am')).toEqual(['A', 'C', 'E',])
  expect(doTransWork('Am')).toEqual(['A', 'C', 'E',])
  expect(doTransWork('Bm')).toEqual(['B', 'D', 'F#',])
  expect(doTransWork('B')).toEqual(['B', 'D#', 'F#',])
  expect(doTransWork('Bb')).toEqual(['Bb', 'D', 'F',])
  expect(doTransWork('F#')).toEqual(['F#', 'A#', 'C#',])
})
