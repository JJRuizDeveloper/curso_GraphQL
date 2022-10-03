import { authors } from '../data/authors.js'
import { books } from '../data/books.js'
import { reviews } from '../data/reviews.js'

export const resolvers = {
    Query: {
        authors(root, { query }) {
            if(!query) { return authors }
            return authors.filter(author => {
                return author.name.toLowerCase().includes(query.toLowerCase())
            })
        },
        books() {
            return books
        },
        reviews() {
            return reviews
        }
    },
    Book: {
        author(root) {
            return authors.find(author => {
                return author.id === root.author
            })
        },
        reviews(root) {
            return reviews.filter(review => {
                return review.book === root.id
            })
        }
    },
    Author: {
        books(root) {
            return books.filter(book => {
                return book.author === root.id;
            })
        }
    },
    Review: {
        book(root) {
            return books.find(book => {
                return book.id === root.book;
            })
        }
    }
}