<template>
    <div>
        <h1>Добавить клиента</h1>
        <validation-observer v-slot="{ invalid }" class="admin-form" tag="div">
            <validation-provider
                v-slot="{ errors }"
                rules=""
                class="form-group w12"
                tag="div"
            >
                <label for="client-company">Название компании</label>
                <input
                    id="client-company"
                    v-model="company"
                    type="text"
                    class="admin-input"
                />
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                rules="required"
                class="form-group w25"
                tag="div"
            >
                <label for="current-manager">Текущий менеджер</label>
                <multiselect
                    id="current-manager"
                    v-model="manager_current"
                    :options="manager_currentOptions"
                    placeholder="Выберите менеджера"
                    label="name"
                    track-by="_id"
                    select-label="Выбрать"
                    deselect-label="Убрать"
                    selected-label="Выбрано"
                ></multiselect>
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                rules=""
                class="form-group w12"
                tag="div"
            >
                <label for="client-date">Дата следующего контакта</label>
                <input
                    id="client-date"
                    v-model="date_contact"
                    type="datetime-local"
                    class="admin-input"
                />
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                rules=""
                class="form-group w12"
                tag="div"
            >
                <label for="open">Открытый для всех</label>
                <input id="open" v-model="open" type="checkbox" />
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                rules=""
                class="form-group w12"
                tag="div"
            >
                <label for="fav">Избранный</label>
                <input id="fav" v-model="fav" type="checkbox" />
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                rules="required"
                class="form-group w25"
                tag="div"
            >
                <label for="status">Статус</label>
                <multiselect
                    id="status"
                    v-model="status"
                    :options="statusOptions"
                    placeholder="Выберите статус"
                    select-label="Выбрать"
                    deselect-label="Убрать"
                    selected-label="Выбрано"
                ></multiselect>
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                rules="required"
                class="form-group w25"
                tag="div"
            >
                <label for="industry">Отрасль</label>
                <multiselect
                    id="industry"
                    v-model="industry"
                    :options="industryOptions"
                    placeholder="Выберите отрасль"
                    select-label="Выбрать"
                    deselect-label="Убрать"
                    selected-label="Выбрано"
                ></multiselect>
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                rules="required"
                class="form-group w25"
                tag="div"
            >
                <label for="geo">Регион</label>
                <multiselect
                    id="geo"
                    v-model="geo"
                    :options="geoOptions"
                    placeholder="Выберите регион"
                    select-label="Выбрать"
                    deselect-label="Убрать"
                    selected-label="Выбрано"
                ></multiselect>
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                rules="required"
                class="form-group w25"
                tag="div"
            >
                <label for="offer">Услуга</label>
                <multiselect
                    id="offer"
                    v-model="offer"
                    :options="offerOptions"
                    placeholder="Выберите услугу"
                    select-label="Выбрать"
                    deselect-label="Убрать"
                    selected-label="Выбрано"
                ></multiselect>
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <validation-provider
                v-slot="{ errors }"
                rules=""
                class="form-group w100"
                tag="div"
            >
                <label for="note">Заметки</label>
                <editor
                    id="note"
                    v-model="note"
                    api-key="fhdfkhdskjfhkdsfhkdsh"
                    :init="{
                        height: 340,
                        menubar: true,
                        plugins: [
                            'autolink lists image visualblocks code table paste'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | image',
                        images_upload_handler: function(blobInfo, success) {
                            tinyAddFile(blobInfo, success)
                        }
                    }"
                />
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>

            <div class="form-group w100">
                <div class="admin-buttons-block">
                    <button
                        class="admin-input admin-button"
                        :disabled="invalid"
                        @click="createClient"
                    >
                        Опубликовать
                    </button>
                </div>
            </div>
        </validation-observer>
    </div>
</template>

<script>
import axios from '@nuxtjs/axios'
import Editor from '@tinymce/tinymce-vue'
import multiselect from 'vue-multiselect'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
    name: 'New',
    components: {
        Editor,
        multiselect,
        ValidationObserver,
        ValidationProvider
    },
    async asyncData() {
        const manager = await axios.get('http://localhost:3000/api/manager/', {
            headers: {
                Authorization: this.$auth.$storage._state['_token.local']
            }
        })
        const data = await axios.get('http://localhost:3000/api/setting/', {
            headers: {
                Authorization: this.$auth.$storage._state['_token.local']
            }
        })
        return {
            managerList: manager.data,
            statusList: data.data[0].status,
            industryList: data.data[0].industry,
            geoList: data.data[0].geo,
            offerList: data.data[0].offer
        }
    },
    data: () => ({
        company: '',
        manager_current: '',
        manager_currentOptions: [],
        date_contact: '',
        open: true,
        fav: false,
        status: 'Новый',
        statusOptions: [],
        industry: '',
        industryOptions: [],
        geo: '',
        geoOptions: [],
        offer: '',
        offerOptions: [],
        note: ''
    }),
    mounted() {
        this.manager_current = this.$auth.user
        this.manager_currentOptions = this.managerList
        this.statusOptions = this.statusList
        this.industryOptions = this.industryList
        this.geoOptions = this.geoList
        this.offerOptions = this.offerList
    },
    methods: {
        createClient() {
            const formData = {
                company: this.company,
                manager_current: this.manager_current,
                manager_created: $nuxt.$auth.user.id,
                date_contact: this.date_contact,
                industry: this.industry,
                status: this.status,
                offer: this.offer,
                open: this.open,
                note: this.note,
                fav: this.fav,
                geo: this.geo
            }
            axios
                .post('http://localhost:3000/api/client', formData, {
                    headers: {
                        Authorization: this.$auth.$storage._state[
                            '_token.local'
                        ]
                    }
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$router.push('/client')
                    }, 500)
                })
                .catch((e) => console.log(e.response.data.message))
        },
        tinyAddFile(blobInfo, success) {
            const formData = new FormData()
            formData.append('file', blobInfo.blob(), blobInfo.filename())
            axios
                .post('http://localhost:3000/api/client/addFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: this.$auth.$storage._state[
                            '_token.local'
                        ]
                    }
                })
                .then((res) => success(`/uploads/client/${res.data.filename}`))
                .catch((e) => console.log(e.response.data.message))
        }
    }
}
</script>

<style scoped></style>
