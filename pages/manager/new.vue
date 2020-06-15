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
export default {
    name: 'New'
}
</script>

<style scoped></style>
