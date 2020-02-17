const Discord = require('discord.js')
const TOKEN = require('./token').token
const { doTransWork } = require('./utils')
const client = new Discord.Client()

const DM_startWith = '_cm'

client.once('ready', () => {
  console.log('Chord Man is ready!')
})

const processMsg = chordTextThatMayWithSpace => {
  const chordText = chordTextThatMayWithSpace.replace(/\s/g, '')
  const result = doTransWork(chordText)
  const resultMsg = `${chordTextThatMayWithSpace} => ${result.join(' ')}`
  return resultMsg
}

client.on('message', msg => {
  const nowMsg = msg.content
  if (msg.isMentioned(client.user)) {
    // @ChordMan 這樣的mentioned訊息 也會是 msg.content裡的一部分，要用@mentioned的話 還要想辦法去除那一部份

    const FirstMentioneDeductedMsg = nowMsg.substring(
      nowMsg.indexOf('>') + 1,
      nowMsg.length
    )
    const result = processMsg(FirstMentioneDeductedMsg)
    msg.reply(result)
    return
  }
  // 不是用mentioned的 可能是DM
  if (nowMsg.startsWith(DM_startWith)) {
    const prefixDeductedMsg = nowMsg.substring(
      nowMsg.indexOf('_cm') + 3,
      nowMsg.length
    )
    const result = processMsg(prefixDeductedMsg)
    msg.reply(result)
    return
  }
  //      processMsg(msg.content)
})

client.login(TOKEN)
