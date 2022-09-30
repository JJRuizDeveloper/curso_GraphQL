import ProductList from '../components/ProductList.vue'
import CreateForm from '../components/CreateForm.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: ProductList,
    },
    {
        path: '/create-form',
        component: CreateForm,
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})