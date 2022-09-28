import { createApp } from 'vue'
import App from './App.vue'
import * as apolloProvider from './providers/ApolloProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'


const app = createApp(App)
app.use(apolloProvider.provider)
app.mount('#app')
