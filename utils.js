const chordSplit = msg => msg.split("");

const notesExpressMethodArr1 = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];

const notesExpressMethodArr2 = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B"
];

const notesExpressMethodMap1 = {
  C: "C",
  "C#": "C#",
  D: "D",
  "D#": "D#",
  E: "E",
  F: "F",
  "F#": "F#",
  G: "G",
  "G#": "G#",
  A: "A",
  "A#": "A#",
  B: "B"
};

const notesExpressMethodMap2 = {
  "C":"C",
  "Db":"Db",
  "D":"D",
  "Eb":"Eb",
  "E":"E",
  "F":"F",
  "Gb":"Gb",
  "G":"G",
  "Ab":"Ab",
  "A":"A",
  "Bb":"Bb",
  "B":"B",
};

const getCorrespondingArrAndGetNext = (root) => {
  if(notesExpressMethodArr1.includes(root)) {
    return notesExpressMethodArr1
  }
  return notesExpressMethodArr2
}

const processOverOctave = (idx) => {
  if(idx > 11) {
    return idx -12
  }
  return idx
}

exports.doTransWork = (codeMsg) => {
  const textArray = chordSplit(codeMsg)
  const result = []
  let root;
  const textLength = textArray.length;
  let idx = 0;
  let isSlashCode = false;
  if (codeMsg.indexOf("/") !== -1) {
    isSlashCode = true;
  }
  while (idx < textLength) {
    switch (idx) {
      case 0:
        if(textArray[1] === '#' || textArray[1] === 'b') {
          root = textArray[idx] + textArray[idx+1]
          result.push(root)
          idx += 2
        }else {
          root = textArray[idx]
          result.push(root)
          idx += 1
        }

        if(!textArray[idx]){
          const notesArr = getCorrespondingArrAndGetNext(root)
          const now2 = notesArr.indexOf(root)
          result.push(notesArr[processOverOctave(now2 + 4)])
          result.push(notesArr[processOverOctave(now2 + 7)])
        }
      case 1:
        const notesArr = getCorrespondingArrAndGetNext(root)
        if(textArray[1] === 'm') {
          // 小三和弦
          const now1 = notesArr.indexOf(root)
          result.push(notesArr[processOverOctave(now1 + 3)])

          result.push(notesArr[processOverOctave(now1 + 7)])

        }else if(textArray[1] === 'M') {
          // 大三和弦
          const now2 = notesArr.indexOf(root)
          result.push(notesArr[processOverOctave(now2 + 4)])
          result.push(notesArr[processOverOctave(now2 + 7)])

        }
       default:
         idx += 1   
          

    }
  }
  return result
};
