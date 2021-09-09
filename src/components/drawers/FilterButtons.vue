<template>

    <base-card>
      <div class="btn-container" >
        <button class="btn"><strong>All</strong></button>
        <button class="btn"><strong>UI</strong></button>
        <button class="btn"><strong>UX</strong></button>
        <button class="btn"><strong>Enhancement</strong></button>
        <button class="btn"><strong>Bug</strong></button>
        <button class="btn"><strong>Feature</strong></button>
      </div>
    </base-card>
  
</template>

<style scoped>



.btn-container{
  height: 170px;
  width: 160px;
  padding: 1rem;
}

.btn {
  border-radius: 10px;
  border-style: none;
  background-color: #f2f4ff;
  margin: 8px;
  padding: 10px;
  color: blue;
}

.btn:hover {
  background-color: rgb(90, 127, 230);
  color: #f2f4ff;
}
</style>