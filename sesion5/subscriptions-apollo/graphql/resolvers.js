const Message = require("../models/Message.js")
const { PubSub } = require("graphql-subscriptions")

const pubsub = new PubSub()

module.exports = {
    Mutation: {
        async createMessage(root, {messageInput: {text, username}}){
            const newMessage = new Message({
                text: text,
                createdBy: username
            })

            const res = await newMessage.save()

            pubsub.publish('MESSAGE_CREATED', {
                messageCreated: {
                    text: text,
                    createdBy: username
                }
            })

            return {
                id: res.id,
                ...res._doc
            }
        }
    },
    Subscription: {
        messageCreated: {
            subscribe: () => pubsub.asyncIterator('MESSAGE_CREATED')
        }

    },
    Query: {
        message: async (root, {ID}) => await Message.findById(ID)
    }
}