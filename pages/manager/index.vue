<template>
    <div>
        <h1>Менеджеры</h1>
        <div class="managers-block">
            <div v-for="manager in managers" :key="manager._id" class="manager">
                <nuxt-link :to="`/manager/${manager._id}`">
                    <div class="manager-name">{{ manager.name }}</div>
                    <div v-if="manager.admin" class="manager-admin">
                        Администратор
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '~/.nuxt/axios'
export default {
    name: 'Index',
    async asyncData() {
        const { data } = await axios.get('http://localhost:3000/api/manager/', {
            headers: {
                Authorization: $nuxt.$auth.$storage._state['_token.local']
            }
        })
        return { managers: data }
    }
}
</script>

<style scoped></style>
