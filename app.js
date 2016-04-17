#!/usr/bin/env node
'use strict'
let words = require('wordlist-english').american
const _ = require('lodash')

var n = []
var p = []
var m = []
var npms = [['node', 'package', 'manager']]

_(words).each((e, i) => {
  if (e.startsWith('n')) n.push(e)
  if (e.startsWith('p')) p.push(e)
  if (e.startsWith('m')) m.push(e)
})

_(n).each((eN, iN) => {
  _(p).each((eP) => {
    _(m).each((eM) => {
      npms.push([eN, eP, eM])
    })
  })
  console.log((iN / n.length) * 100 + '%')
})

console.log('Done. Clearing excess memory so Node does not crash...')

words = null
n = null
p = null
m = null

console.log('Done. Formatting NPMs...')

_(npms).each((e, i) => {
  npms[i] = npms[i][0] + ' ' + npms[i][1] + ' ' + npms[i][2]
})

console.log('Done. Printing ' + npms.length + ' NPMs...')

const purgeFreq = 1000
const count = purgeFreq - 1

for (let i = 0; i < npms.length; i++) {
  for (let i = 0; i < count; i++) {
    console.log(npms[i])
  }
  npms.splice(0, purgeFreq)
}
