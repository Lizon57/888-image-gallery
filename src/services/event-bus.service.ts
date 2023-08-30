const createEventEmitter = () => {
    const listenersMap: ListenersMap = {}

    return {
        on(evName: string, listener: Listener) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName: string, data?: unknown) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBus = createEventEmitter()


type ListenersMap = { [key: string]: Listener[] }
type Listener = (data: unknown) => void


export const popMessage = (data: string) => {
    eventBus.emit('popMessage', data)
}

export const updateBookmark = () => {
    eventBus.emit('updateBookmark')
}