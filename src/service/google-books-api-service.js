const axios = require('axios')
const ApiError = require("../exeptions/api-error");

const altThumbnail = 'https://media.istockphoto.com/id/182732882/photo/book-cover.webp?b=1&s=170667a&w=0&k=20&c=0tjneAWTvuAAoZ9JqMycZnzbPBha3ZDXqH66WEGd1YY='

class GoogleBooksApiService {
    #apiBase
    #apiKey
    // #altThumbnail

    constructor() {
        this.#apiBase = 'https://www.googleapis.com/books/v1/volumes'
        this.#apiKey = 'key=AIzaSyBjD1uZEORgtMNIOUBqbhhkqKmjZyjy32w'
        // this.#altThumbnail = 'https://media.istockphoto.com/id/182732882/photo/book-cover.webp?b=1&s=170667a&w=0&k=20&c=0tjneAWTvuAAoZ9JqMycZnzbPBha3ZDXqH66WEGd1YY='
    }

    async getBooksByPublisher(publisher, offset=0) {
        const response = await axios.get(
            `${this.#apiBase}?q=inpublisher:${publisher}&${this.#apiKey}&startIndex=${offset}&maxResults=18`
        )

        if (response.data.totalItems === 0) {
            return []
        }

        return response.data.items.map(this._normalizeBook)
    }

    async getBooksByAuthor(author, offset=0) {
        const response = await axios.get(
            `${this.#apiBase}?q=inauthor:${author}&${this.#apiKey}&startIndex=${offset}&maxResults=18`
        )

        if (response.data.totalItems === 0) {
            return []
        }

        return response.data.items.map(this._normalizeBook)
    }

    async getBooksByCategory(category, offset=0) {
        const response = await axios.get(
            `${this.#apiBase}?q=subject:${category}&${this.#apiKey}&startIndex=${offset}&maxResults=18`
        )

        if (response.data.totalItems === 0) {
            return []
        }

        return response.data.items.map(this._normalizeBook)
    }

    async getBooksByTitle(title, offset=0) {
        const response = await axios.get(
            `${this.#apiBase}?q=intitle::${title}&${this.#apiKey}&startIndex=${offset}&maxResults=18`
        )

        if (response.data.totalItems === 0) {
            return []
        }

        return response.data.items.map(this._normalizeBook)
    }

    async getBookById(id) {
        try {
            const response = await axios.get(
                `${this.#apiBase}/${id}`
            )

            return this._normalizeBook(response.data)
        }
        catch (error) {
            return null
        }
    }

    _normalizeBook(data) {
        const {title, subtitle, authors, publisher, description, pageCount, categories, imageLinks} = data.volumeInfo
        let {extraLarge, large, medium, small, thumbnail, smallThumbnail} = imageLinks || {}

        return {
            id: data.id,
            title,
            subtitle,
            authors,
            publisher,
            description,
            pageCount,
            categories,
            thumbnail: large || medium || extraLarge || small || thumbnail || smallThumbnail || altThumbnail,
        }
    }
}

module.exports = new GoogleBooksApiService();