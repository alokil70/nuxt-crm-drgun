<template>
    <div>
        <h1>Войти</h1>
        <div class="form">
            <div class="form-group form-w50">
                <label for="login">Логин</label>
                <input v-model="login.user" type="text" name="login" />
            </div>
            <div class="form-group form-w50">
                <label for="password">Пароль</label>
                <input v-model="login.password" type="password" name="login" />
            </div>
            <div class="form-group form-w50">
                <input type="submit" value="Войти" @click="userLogin" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        login: {
            user: '',
            password: ''
        }
    }),
    methods: {
        async userLogin() {
            try {
                const response = await this.$auth.loginWith('local', {
                    data: this.login
                })
            } catch(e) {
                console.log(e)
            }
        }
    },
    head() {
        return {
            meta: [{ name: "robots", content: "noindex,nofollow"}]
        }
    }
}
</script>

<style scoped></style>
