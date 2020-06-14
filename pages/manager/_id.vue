<template>
    <div>
        {{ $nuxt.$auth.user }}
        <h1>{{ manager.name }}</h1>
        <div class="manager-info text-center">
            Профиль создан
            {{ $dateFns.format(this.manager.date_created, 'd MMMM yyyy r.') }}
        </div>
        <ValidationObserver v-slot="{ invalid }" class="admin-form" tag="div">
            <ValidationProvider
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
                >
                <span class="form-error-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:5|max:40"
                class="form-group w25"
            ></ValidationProvider>
        </validation-observer>
    </div>
</template>

<script>
export default {
    name: 'Id'
}
</script>

<style scoped></style>
