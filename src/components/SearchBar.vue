<script setup>
import { addIcons } from 'ionicons'    
</script>

<template>
    <div>
        <input type="text" placeholder="Annecy, appartement T2 etc ...">
        <button class="btn-loupe">
            <ion-icon name="search-outline"></ion-icon>
        </button>
    </div>
</template>


<style scoped>
    div {
        align-items: center;
    }
    input {
        font-size: 1rem;
        border-radius: 1rem;
        width: 350px;
        height: 2.5rem;
        border: 1px solid black;
        padding-left: 15px;
        padding-right: 45px;
        outline: none;
        vertical-align: middle;
        background-color: #E4E4E4;
    }

    .btn-loupe {
        vertical-align: middle;
        font-size: 1.125rem;
        border: none;
        border-radius: 0.875rem;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        margin-left: -3.5rem;
        color: white;
        background-color: #f27b42;
    }

    img {
        width: 25px;
        display: block;
    }

</style>
