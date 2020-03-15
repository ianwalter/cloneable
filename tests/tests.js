const v8 = require('v8')
const { test } = require('@ianwalter/bff')
const { requester } = require('@ianwalter/requester')
const cloneable = require('..')

test('object', ({ expect }) => {
  const thing = {
    message: 'Hello!',
    err: new Error('Scratch that'),
    yellMessage () {
      return this.message.toUpperCase()
    },
    song: {
      index: 3,
      date: new Date(),
      getLyrics () {
        return 'Darling its bout time to break free of'
      }
    }
  }
  expect(cloneable(thing)).toMatchSnapshot({
    err: {
      stack: expect.stringContaining('Error: Scratch that')
    },
    song: {
      date: expect.any(Date)
    }
  })
})

test('array', ({ expect }) => {
  const thing = [
    {
      title: 'Bury Us',
      updates: [9, 10]
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

test('serialize', async t => {
  try {
    await requester.get('http://httpstat.us/401')
  } catch (err) {
    const msg = cloneable(err)
    t.expect(v8.deserialize(v8.serialize(msg))).toMatchSnapshot({
      stack: t.expect.any(String),
      response: {
        headers: t.expect.any(Object),
        rawHeaders: t.expect.any(Array)
      }
    })
  }
})
