import { DraftType } from '../ui/steps/steps.types'

const DB_NAME = 'draftsDB'
const STORE_NAME = 'drafts'

export const initDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const saveDraft = async (data: DraftType): Promise<boolean> => {
  const db = await initDB()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)

    store.put({
      id: 'current',
      data: data,
      createdAt: new Date().toISOString(),
    })

    tx.oncomplete = () => resolve(true)
    tx.onerror = () => reject(tx.error)
  })
}

export const loadDraft = async (): Promise<DraftType | null> => {
  const db = await initDB()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get('current')

    request.onsuccess = () => {
      const result = request.result?.data
      resolve(result || null)
    }

    request.onerror = () => reject(request.error)
  })
}
