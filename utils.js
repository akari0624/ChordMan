const Result = require('./models').ResultClass
const chordSplit = msg => msg.split('')

const notesExpressMethodArr1 = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]

const notesExpressMethodArr2 = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
]

const notesExpressMethodMap1 = {
  C: 'C',
  'C#': 'C#',
  D: 'D',
  'D#': 'D#',
  E: 'E',
  F: 'F',
  'F#': 'F#',
  G: 'G',
  'G#': 'G#',
  A: 'A',
  'A#': 'A#',
  B: 'B',
}

const notesExpressMethodMap2 = {
  C: 'C',
  Db: 'Db',
  D: 'D',
  Eb: 'Eb',
  E: 'E',
  F: 'F',
  Gb: 'Gb',
  G: 'G',
  Ab: 'Ab',
  A: 'A',
  Bb: 'Bb',
  B: 'B',
}

const getCorrespondingArrAndGetNext = root => {
  if (notesExpressMethodArr1.includes(root)) {
    return notesExpressMethodArr1
  }
  return notesExpressMethodArr2
}

const processOverOctave = idx => {
  if (idx > 11) {
    return idx - 12
  }
  return idx
}

// SIDE EFFECT to be refractor
const handle_m_or_M = (targetText, root, result) => {
  console.log('in m_M')
  const notesArr = getCorrespondingArrAndGetNext(root)
  if (targetText === 'm') {
    // 小三和弦
    const now1 = notesArr.indexOf(root)
    result.addResultNote(notesArr[processOverOctave(now1 + 3)])

    result.addResultNote(notesArr[processOverOctave(now1 + 7)])
  } else if (targetText === 'M') {
    // 準備是大七 所以要先算好大三和弦
    const now2 = notesArr.indexOf(root)
    result.addResultNote(notesArr[processOverOctave(now2 + 4)])
    result.addResultNote(notesArr[processOverOctave(now2 + 7)])
  }
}

// 注意這裡一定是要找完1 3 5之後再找，不然會錯
const handle_7_6_5 = (targetText, root, result) => {
  switch (targetText) {
    case '7': 
    const notesArr = getCorrespondingArrAndGetNext(root)
  }
}

exports.doTransWork = codeMsg => {
  console.log('doTrans', codeMsg)

  const textArray = chordSplit(codeMsg)
  const result = new Result()
  let root
  const textLength = textArray.length
  let idx = 0
  let isSlashCode = false
  if (codeMsg.indexOf('/') !== -1) {
    isSlashCode = true
  }
  while (idx < textLength) {
    switch (idx) {
      case 0:
        if (textArray[idx + 1] === '#' || textArray[idx + 1] === 'b') {
          root = textArray[idx] + textArray[idx + 1]
          result.addResultNote(root)
          handle_m_or_M(textArray[idx + 2], root, result)
          idx += 2
        } else {
          root = textArray[idx]
          result.addResultNote(root)
          idx += 1
        }
        // 後面已經沒字，沒升降的大三和弦的情況
        if (!textArray[idx]) {
          const notesArr = getCorrespondingArrAndGetNext(root)
          const now2 = notesArr.indexOf(root)
          result.addResultNote(notesArr[processOverOctave(now2 + 4)])
          result.addResultNote(notesArr[processOverOctave(now2 + 7)])
        }
        break;
      case 1:
        handle_m_or_M(textArray[idx], root, result)
        idx += 1
        break;
      default:
        idx += 1
    }
  }
  return result.getResultNotes()
}
