export interface CacheUtilities {
  get: (resourceId: string) => Promise<Record<string, any>>
  exists: (resourceId: string) => Promise<boolean>
  update: (
    resourceId: string,
    resource: Record<string, any>
  ) => Promise<boolean>
}
