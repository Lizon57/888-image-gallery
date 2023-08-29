function read(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return
    return JSON.parse(value)
}

function save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
}

function saveToMap<T>(storageKey: string, mapKey: string, value: T) {
    const map = read(storageKey) || {}
    map[mapKey] = value
    save(storageKey, map)
}


export const localStorageService = {
    read,
    save,
    saveToMap,
}