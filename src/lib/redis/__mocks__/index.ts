import { CacheUtilities } from '../types'

export default (): CacheUtilities => ({
  get: () => Promise.resolve({}),
  exists: () => Promise.resolve(true),
  update: () => Promise.resolve(true)
})
