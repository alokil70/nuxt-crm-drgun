<template>
    <header>
        <div class="center">
            <nav
                :class="{ navShow: navToggle }"
                @click="navToggle = !navToggle"
            >
                <nuxt-link to="/client">Клиенты</nuxt-link>
                <nuxt-link v-if="$nuxt.$auth.user.admin" to="/manager"
                    >Менеджеры</nuxt-link
                >
                <nuxt-link v-if="$nuxt.$auth.user.admin" to="/setting"
                    >Настройки</nuxt-link
                >
                <nuxt-link :to="`/manager/${this.$auth.user.id}`">
                    {{ this.$auth.user.name }}
                </nuxt-link>
            </nav>
            <div class="logout" @click="logout">Выйти</div>
            <div class="toggle-nav" @click="navToggle = !navToggle">и</div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data: () => ({
        navToggle: false
    }),
    methods: {
        logout() {}
    }
}
</script>

<style scoped></style>
