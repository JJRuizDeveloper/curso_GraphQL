import axios from "axios";

// Doble desestructuración en las respectivas variables
//let {data: {data : authors}} = await axios.get('http://localhost:8055/items/authors');
//let {data: {data : books}} = await axios.get('http://localhost:8055/items/books');
//let {data: {data : reviews}} = await axios.get('http://localhost:8055/items/reviews');
//let {data: {data : forums}} = await axios.get('http://localhost:8055/items/forums');

export const resolvers = {
    Query: {
        authors: async (_, { name }, { dataSources }) => {
            if(!name) return dataSources.authorAPI.getAll();

            return dataSources.authorAPI.getItemsByField('name', name); 
        },
        books: async (_, __, { dataSources }) => {
            return dataSources.bookAPI.getAll();
        },
        reviews: async (_, __, { dataSources }) => {
            return dataSources.reviewAPI.getAll();
        },
        forums: async (_, __, { dataSources }) => {
            return dataSources.forumAPI.getAll();
        }
    },
    Book: {
        author: async (_, __, { dataSources }) => {
            return dataSources.bookAPI.getNestedItem(_.id, 'author');
        },
        reviews: async (_, __, { dataSources }) => {
            return dataSources.bookAPI.getNestedItem(_.id, 'reviews');
        }
    },
    Author:{
        books: async (_, __, { dataSources }) => {
            return dataSources.authorAPI.getNestedItem(_.id, 'books');
        }
    },
    Review: {
        book: async (_, __, { dataSources }) => {
            return dataSources.reviewAPI.getNestedItem(_.id, 'book');
        },
        forum: async (_, __, { dataSources }) => {
            return dataSources.reviewAPI.getNestedItem(_.id, 'forum');
        }
    },
    Forum: {
        reviews: async (_, __, { dataSources }) => {
            return dataSources.forumAPI.getNestedItem(_.id, 'reviews');
        }
    }
}