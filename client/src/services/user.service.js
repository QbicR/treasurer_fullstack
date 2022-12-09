import { $authHost } from "./http.service";
const userEndpoint = 'api/user/'

const userServive = {
    getUser: async (id) => {
        try {
            const { data } = await $authHost.get(userEndpoint + id)
            return data
        } catch (e) {
            console.log(e.message);
        }
    },
    updateUser: async (id, img) => {
        try {
            const { data } = await $authHost.put(userEndpoint + id, img)
            return data
        } catch (e) {
            console.log(e.message);
        }
    }
}

export default userServive