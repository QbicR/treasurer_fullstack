import { $authHost } from './http.service'
const operationEndpoint = 'api/operation'

const operationService = {
    createOperation: async (payload) => {
        try {
            const { data } = await $authHost.post(operationEndpoint, payload)
            return data
        } catch (e) {
            console.log(e.message);
        }
    },
    getOperations: async (userId, cardId, type) => {
        try {
            const { data } = await $authHost.get(operationEndpoint, {
                params: { userId, cardId, type }
            })
            return data
        } catch (e) {
            console.log(e.message);
        }
    },
    deleteOperation: async (operationId, userId) => {
        try {
            const { data } = await $authHost.delete(`${operationEndpoint}/` + operationId, {
                params: { userId }
            })
            return data
        } catch (e) {
            console.log(e.message);
        }
    }
}

export default operationService