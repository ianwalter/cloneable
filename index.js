function cloneable (src) {
  switch (true) {
    case src instanceof Date:
      return src
    case src && typeof src === 'object':
      return reduce(src)
    case typeof src === 'function':
      throw new Error('NO FUNCTIONS!')
    default:
      return src
  }
}

function reduce (src) {
  if (Array.isArray(src)) {
    return src.reduce(
      (acc, item) => {
        try {
          return acc.concat([cloneable(item)])
        } catch (err) {
          // No-op on error.
        }
        return acc
      },
      []
    )
  } else {
    const dest = {}
    for (const key in src) {
      try {
        dest[key] = cloneable(src[key])
      } catch (err) {
        // No-op on error.
      }
    }
    return dest
  }
}

module.exports = cloneable
