<template>
    <div class="container">
        <div class="row mt-1">
            <h2>Products from Directus</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col text-center">ID</th>
                        <th scope="col text-center">Name</th>
                        <th scope="col text-center">Brand</th>
                        <th scope="col text-center">Cost</th>
                        <th scope="col text-center">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in fetchAllProducts" :key="product.id">
                        <td>{{ product.id }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.brand }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.type }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import { defineComponent } from "vue";

// Option API
export default defineComponent({
    // apollo lo hemos incorporado a través de los paquetes que hemos ido instalando
    apollo: {
        // definimos qué cliente queremos utilizar en esta query
        $client: 'directusClient',
        // fetchAllProducts es un nombre que le damos nosotros, podría ser cualquiera, pero dándole un nombre propio es más consistente
        // al ser un nombre diferente al que devuelve la query (products), tenemos que asignárselo dentro de la query
        fetchAllProducts: {
            query: gql`
                query {
                    fetchAllProducts: products{
                        id
                        name
                        brand
                        price
                        type
                    }
                }
            `
        }
    },
    data() {
        return {
            fetchAllProducts: []
        }
    }
})
</script>