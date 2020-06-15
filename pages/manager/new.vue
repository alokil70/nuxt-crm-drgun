<template>
    <ValidationObserver v-slot="{ invalid }" class="admin-form" tag="div">
        <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:4|max:12"
            class="form-group w50"
            tag="div"
        >
            <label for="manager-login">Логин</label>
            <input
                id="manager-login"
                v-model="login"
                type="text"
                name="manager-login"
                class="admin-input"
            />
            <span class="form-error-message">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:5|max:40"
            class="form-group w50"
            tag="div"
        >
            <label for="manager-name">Имя</label>
            <input
                id="manager-name"
                v-model="name"
                type="text"
                name="manager-name"
            />
        </ValidationProvider>
    </ValidationObserver>
</template>

<script>
import axios from '@nuxtjs/axios'
import Editor from '@tinymce/tinymce-vue'
import multiselect from 'vue-multiselect'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
    name: 'New',
    async asyncData() {
        const manager = await axios.get('http://localhost:3000/api/manager/', {
            headers: {
                Authorization: $nuxt.$auth.$storage._state['_token.local']
            }
        })
        const setting = await axios.get('http://localhost:3000/api/setting/', {
            headers: {
                Authorization: $nuxt.$auth.$storage._state['_token.local']
            }
        })
    },
    data: () => ({
        company: '',
        manager_current: '',
        manager_currentOptions: '',
        date_contact: '',
        open: true,
        fav: false,
        status: 'Новый',
        statusOptions: [],
        industry: '',
        industryOptions: '',
        geo: '',
        geoOptions: '',
        offer: '',
        offerOptions: ''
    })
}
</script>

<style scoped></style>
