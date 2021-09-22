<template>
  <base-card>
    <div class="container flex flex-column">
      <header class="flex">
        <h1>RoadMap</h1>
        <router-link to="/roadmap">
          <span>View</span>
        </router-link>
        
      </header>
      <ul>
        <li class="flex planned">
          <div class="dot dot1"></div>
          <span class="type">Planned</span>
          <span class="total">x</span>
        </li>
        <li class="flex progress">
          <div class="dot dot2"></div>
          <span class="type">In-Progress</span>
          <span class="total">x</span>
        </li>
        <li class="flex live">
          <div class="dot dot3"></div>
          <span class="type">Live</span>
          <span class="total">x</span>
        </li>
      </ul>
    </div>
  </base-card>
</template>

<style scoped>

.container{
  padding: 1rem;
}
header {
  justify-content: space-between;
}

ul {
  margin-top: 15px;
}

ul li .type {
  width: 125px;
  flex: 1;
  margin: 0 10px;
}

li {
  margin: 10px 0;
  justify-content: space-between;
  align-items: center;
}

.dot {
  height: 8px;
  width: 8px;
  border-radius: 1rem;
}

.dot1 {
  background-color: #f49f85;
}
.dot2 {
  background-color: #ad1fea;
}

.dot3 {
  background-color: #62bcfa;
}
</style>