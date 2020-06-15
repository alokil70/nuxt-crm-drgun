<template>
    <div>
        {{ $nuxt.$auth.user }}
        <h1>{{ manager.name }}</h1>
        <div class="manager-info text-center">
            Профиль создан
            {{ $dateFns.format(this.manager.date_created, 'd MMMM yyyy r.') }}
        </div>
        <validation-observer v-slot="{ invalid }" class="admin-form" tag="div">
            <validation-provider
                v-slot="{ errors }"
                rules="required|min:4|max:12"
                class="form-group w25"
                tag="div"
            >
                <label for="manager-login">Логин</label>
                <input
                    id="manager-login"
                    v-model="login"
                    name="manager-login"
                    type="text"
                    class="admin-input"
                />
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                rules="required|min:5|max:40"
                class="form-group w25"
                tag="div"
            >
                <label for="manager-name">Имя и фамилия</label>
                <input
                    id="manager-name"
                    v-model="name"
                    name="manager-name"
                    type="text"
                    class="admin-input"
                />
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                rules=""
                class="form-group w100"
                tag="div"
            >
                <label for="manager-note">Заметки</label>
                <Editor
                    v-model="note"
                    api-key="ciecnieninr"
                    :init="{
                        height: 500,
                        menubar: true,
                        plugins: [
                            'autolink lists link image visualblocks code table paste'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | image',
                        images_upload_handler: function(blobInfo, success) {
                            TinyAddFile(blobInfo, success)
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
                        @click="managerUpdate"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </validation-observer>

        <validation-observer
            v-if="$nuxt.$auth.user.admin"
            v-slot="{ invalidPassword }"
            class="admin-form"
            tag="div"
        >
            <validation-provider
                v-slot="{ errors }"
                rules="min:5"
                class="form-group w25"
                tag="div"
            >
                <label for="manager-password">Новый пароль</label>
                <input
                    id="manager-password"
                    v-model="password"
                    name="manager-password"
                    type="text"
                    placeholder="не меньше 6 символов"
                    class="admin-input"
                />
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>
            <div class="form-group w100">
                <div class="admin-buttons-block">
                    <button
                        class="admin-input admin-button"
                        :disabled="invalidPassword"
                        @click="managerPasswordUpdate"
                    >
                        Сохранить пароль
                    </button>
                </div>
            </div>
        </validation-observer>

        <validation-observer
            v-if="$nuxt.$auth.user.admin"
            v-slot="{ invalidAdmin }"
            class="admin-form"
            tag="div"
        >
            <validation-provider
                v-if="$nuxt.$auth.user.admin"
                v-slot="{ errors }"
                rules="required|min:5|max:40"
                class="form-group w25"
                tag="div"
            >
                <label for="manager-admin">Права</label>
                <select
                    id="manager-admin"
                    v-model="name"
                    name="manager-admin"
                    class="admin-input"
                >
                    <option value="false">Менеджер</option>
                    <option value="true">Администратор</option>
                </select>
                <span class="form-error-message">{{ errors[0] }}</span>
            </validation-provider>
            <div class="form-group w100">
                <div class="admin-buttons-block">
                    <button
                        class="admin-input admin-button"
                        :disabled="invalidAdmin"
                        @click="managerAdminUpdate"
                    >
                        Изменить
                    </button>
                </div>
            </div>
            <div class="form-group w100">
                <div class="admin-buttons-block">
                    <button
                        class="admin-input admin-button admin-delete"
                        @click="managerDelete"
                    >
                        Удалить пользователя
                    </button>
                </div>
            </div>
        </validation-observer>
    </div>
</template>

<script>
import axios from '@nuxtjs/axios'
import Editor from '@tinymce/tinymce-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
    name: 'Id',
    components: {
        Editor,
        ValidationObserver,
        ValidationProvider
    },
    async asyncData({ params }) {
        const data = await axios.get(`http://localhost/api/manager${params.id}`)
        return { manager: data.data }
    },
    data: () => ({
        login: '',
        password: '',
        name: '',
        note: '',
        admin: false,
        date_created: ''
    }),
    mounted() {
        this.name = this.manager.name
        this.admin = this.manager.admin
        this.login = this.manager.login
        this.note = this.manager.note
        this.date_created = this.manager.date_created
    },
    methods: {
        managerUpdate() {
            const formData = {
                login: this.login,
                name: this.name,
                note: this.note
            }
            axios
                .patch(
                    `http://localhost/api/manager/${this.manager._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: this.$auth.$storage._state[
                                '_token.local'
                            ]
                        }
                    }
                )
                .then((res) => {
                    this.manager.login = res.data.login
                    this.manager.name = res.data.name
                    this.manager.note = res.data.note
                })
                .catch((err) => console.log(err.response.data.message))
        },
        managerPasswordUpdate() {
            const formData = {
                password: this.password
            }
            axios
                .patch(
                    `http://localhost/api/manager/password/${this.manager._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: this.$auth.$storage._state[
                                '_token.local'
                            ]
                        }
                    }
                )
                .then((res) => console.log('Пароль обновлен'))
                .catch((err) => console.log(err.response.data.message))
        },
        managerAdminUpdate() {
            const formData = {
                admin: this.admin
            }
            axios
                .patch(
                    `http://localhost/api/manager/admin/${this.manager._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: this.$auth.$storage._state[
                                '_token.local'
                            ]
                        }
                    }
                )
                .then((res) => console.log('Права пользователя обновлены'))
                .catch((err) => console.log(err.response.data.message))
        },
        managerDelete() {
            axios
                .delete(`http://localhost/api/manager/${this.manager._id}`, {
                    headers: {
                        Authorization: this.$auth.$storage._state[
                            '_token.local'
                        ]
                    }
                })
                .then(
                    setTimeout(() => {
                        this.router.push('/manager')
                    }, 500)
                )
        },
        TinyAddFile(blobInfo, success) {
            const formData = new FormData()
            formData.append('file', blobInfo.blob(), blobInfo.filename())
            axios
                .post('http://localhost/api/manager/addFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: this.$auth.$storage._state[
                            '_token.local'
                        ]
                    }
                })
                .then((res) => success(`/uploads/${res.data.filename}`))
        }
    }
}
</script>

<style scoped></style>
