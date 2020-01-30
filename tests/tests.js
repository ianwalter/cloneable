const { test } = require('@ianwalter/bff')
const cloneable = require('..')

test('object', ({ expect }) => {
  const thing = {
    message: 'Hello!',
    yellMessage () {
      return this.message.toUpperCase()
    },
    song: {
      index: 3,
      getLyrics () {
        return 'Darling its bout time to break free of'
      }
    }
  }
  expect(cloneable(thing)).toMatchSnapshot()
})

test('array', ({ expect }) => {
  const thing = [
    {
      title: 'Bury Us',
      updates: [
        {
          timestamp: new Date()
        },
        {
          timestamp: new Date()
        }
      ]
    },
    [
      {
        regex: /(naked|famous)/,
        search () {
          this.results = []
        },
        results: [
          {
            title: 'Stay Forever',
            add () {
              this.count++
            },
            otherActions: [
              function remove () {}
            ]
          }
        ]
      }
    ]
  ]
  expect(cloneable(thing)).toMatchSnapshot()
})
