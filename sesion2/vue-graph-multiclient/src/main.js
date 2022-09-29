import { createApp } from 'vue'
import App from './App.vue'
import * as apolloProvider from './providers/ApolloProvider'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);

// Indicamos a la app el proveedor que vamos a utilizar
app.use(apolloProvider.provider);

app.mount('#app');