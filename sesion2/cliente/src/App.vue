<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid">
        <div class="collapse navbar-collapse text-white">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">All products</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/create-form" class="nav-link">Create Product</router-link>
            </li>
          </ul>
        </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script setup>

</script>