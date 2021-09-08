<template>
    <section class="card">
        <slot></slot>
    </section>
</template>

<style scoped>
.card {
    border-radius: 10px;
    /* min-height: 180px;
    width: 225px; */
    margin: 0 1.5rem 1.5rem 1.5rem;
    padding: 1.5rem;
    background-color: #fff;
}
</style>