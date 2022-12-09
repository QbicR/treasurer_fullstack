import { $authHost } from './http.service'
const cardEndpoint = 'api/card'

const cardService = {
    createCard: async (payload) => {
        try {
            const { data } = await $authHost.post(cardEndpoint, payload)
            return data
        } catch (e) {
            console.log(e.message);
        }
    },
    getCards: async (userId) => {
        try {
            const { data } = await $authHost.get(cardEndpoint, {
                params: { userId }
            })
            return data
        } catch (e) {
            console.log(e.message);
        }
    },
    getOneCard: async (cardId) => {
        try {
            const { data } = await $authHost.get(`${cardEndpoint}/` + cardId)
            return data
        } catch (e) {
            console.log(e.message);
        }
    },
    deleteCard: async (cardId, userId) => {
        try {
            const { data } = await $authHost.delete(`${cardEndpoint}/` + cardId, {
                params: { userId }
            })
            return data
        } catch (e) {
            console.log(e.message);
        }
    },
    updateCard: async (cardId, value) => {
        try {
            const { data } = await $authHost.put(`${cardEndpoint}/` + cardId, value)
            return data
        } catch (e) {
            console.log(e.message);
        }
    }
}

export default cardService