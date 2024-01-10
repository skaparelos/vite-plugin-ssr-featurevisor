import { createInstance, FeaturevisorInstance } from '@featurevisor/sdk'

const DATAFILE_URL = "https://raw.githubusercontent.com/skaparelos/random/main/datafile-tag-all.json"

let instance: FeaturevisorInstance

export async function getInstance(): Promise<FeaturevisorInstance> {
  if (instance) {
    return instance
  }

  const f = createInstance({
    datafileUrl: DATAFILE_URL,
  })

  instance = await f.onReady()

  return instance
}
