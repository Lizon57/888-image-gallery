import { localStorageService } from "./local-storage.service"
import { BOOKMARK_KEY } from "@/constants/local-storage-keys"


function query() {
    return localStorageService.read(BOOKMARK_KEY) || []
}

function saveBookmark(name: string) {
    const bookmarks = query()
    bookmarks.unshift(name)
    localStorageService.save(BOOKMARK_KEY, bookmarks)
}

function removeBookmark(name: string) {
    let bookmarks = query()
    bookmarks = bookmarks.filter((bookmark: string) => bookmark !== name)
    localStorageService.save(BOOKMARK_KEY, bookmarks)
}


function isBookmarkExist(name: string) {
    const bookmarks = query()
    const index = bookmarks.findIndex((bookmark: string) => bookmark === name)
    if (index === -1) return false
    return true
}


export const bookmarkService = {
    query,
    saveBookmark,
    removeBookmark,
    isBookmarkExist
}