<template>
  <div class="container">
    <div class="row mt-1">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Cost</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.brand }}</td>
            <td>{{ item.cost }}</td>
            <td>{{ item.Type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag"
import { defineComponent } from "vue"

export default defineComponent({
  apollo: {
    products: {
      query: gql`
        query {
          products {
            id
            name
            brand
            cost
            Type
          }
        }
      `
    }
  },
  data() {
    return {
      products: []
    }
  }
})
</script>