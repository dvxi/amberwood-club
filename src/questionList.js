const questions = [
  {
    type: 'pick',
    title: 'Ile masz lat?',
    answers: [
      'mniej niż 25',
      '25-40',
      '40+'
    ],
    recommended: [
      ['item_12', 'item_13', 'item_14'],
      ['item_5', 'item_6', 'item_7'],
      ['item_1', 'item_3', 'item_4'],
    ]
  },
  {
    type: 'pick',
    title: 'W jakich sytuacjach nosisz perfumy?',
    answers: [
      'na codzień',
      'na wyjścia wieczorowe',
      'w miejsca gdzie będą kobiety 🥵',
      'różnie/nie wiem'
    ],
    recommended: [
      ['item_9', 'item_6', 'item_4'],
      ['item_1', 'item_3', 'item_7'],
      ['item_1', 'item_3', 'item_4'],
      ['item_1', 'item_3', 'item_4'],
    ]
  }
]

export default questions;
