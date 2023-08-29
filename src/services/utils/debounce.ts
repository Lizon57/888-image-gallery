export function debounce(func: Function, wait: number = 300) {
    let timeoutID: number

    return function <T>(this: T, ...args: any[]) {
        clearTimeout(timeoutID)
        const context = this

        timeoutID = setTimeout(function () {
            func.apply(context, args)
        }, wait)
    }
}