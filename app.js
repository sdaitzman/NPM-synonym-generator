#!/usr/bin/env node
'use strict'
let words = require('wordlist-english').american
const _ = require('lodash')
var ProgressBar = require('progress')

var n = []
var p = []
var m = []
var npms = [['node', 'package', 'manager']]

_(words).each((e, i) => {
  if (e.startsWith('n')) n.push(e)
  if (e.startsWith('p')) p.push(e)
  if (e.startsWith('m')) m.push(e)
})

var bar = new ProgressBar('Iterating word combinations {:bar}   [:percent] ETA :etas ', {
  total: n.length
})

_(n).each((eN, iN) => {
  _(p).each((eP) => {
    _(m).each((eM) => {
      npms.push([eN, eP, eM])
    })
  })
  bar.tick()
})

bar = new ProgressBar('Clearing excess memory :bar   [:percent]', {
  total: 4
})

words = null
bar.tick()
n = null
bar.tick()
p = null
bar.tick()
m = null
bar.tick()

const barFreq = 50

bar = new ProgressBar('Formatting NPMs {:bar}   [:percent] ETA :etas ', {
  total: npms.length / barFreq
})

_(npms).each((e, i) => {
  npms[i] = npms[i][0] + ' ' + npms[i][1] + ' ' + npms[i][2]
  if (i % barFreq === 0) bar.tick()
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
