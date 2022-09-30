<template>
    <div class="container mt-4">
        <form class="col-lg-6 offset-lg-3">
            <div class="row text-center">
                <h4>Create product</h4>
            </div>
            <input class="form-control mt-2" type="text" placeholder="Enter product name" v-model="product.name" />
            <input class="form-control mt-2" type="text" placeholder="Enter product brand" v-model="product.brand" />
            <input class="form-control mt-2" type="text" placeholder="Enter cost" v-model="product.cost" />
            <input class="form-control mt-2" type="text" placeholder="Enter type" v-model="product.type" />
            <button class="btn btn-primary offset-5 mt-2 justify-content-center" type="button"
                @click="addProduct">Create</button>
        </form>
    </div>
</template>

<script>
//import gql from 'graphql-tag'
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            product: {
                name: "",
                brand: "",
                cost: 0,
                type: ""
            }
        }
    },
    methods: {
        addProduct() {
            this.$apollo.mutate({
                mutation: gql`
                    mutation {
	                        create_products_item(data: { 
                                title: "Hello world!", // TODO : CONTINUE HERE <--
                            }) {
		                        name
		                        brand
                            }
                        }
                    `
            })
        }
    }
})
</script>