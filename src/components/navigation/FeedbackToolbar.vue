<template>
  <div class="heading flex">
    <router-link to="/">
      <button class="backBtn">
        <img src="@/assets/icon-arrow-left.svg" alt="back-arrow" />
        Go Back
      </button>
    </router-link>
    <router-link :to="toUrl">
      <button class="edit">Edit Feedback</button>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    toUrl(){
      return `/edit`;
    },
  }
}
</script>

<style scoped>
.heading {
  width: 100%;
  margin: 25px 0 35px 0;
  justify-content: space-between;
}

button {
  padding: 10px;
}

.backBtn {
  border-style: none;
  background: transparent;
  align-content: center;
}
.backBtn img {
  height: 8px;
  width: 8px;
}
.backBtn:hover {
  font-size: 14px;
}
.backBtn:hover img {
  height: 11px;
  width: 11px;
}

.edit {
  border-radius: 10px;
  color: white;
  background-color: rgb(70, 97, 230);
  border-style: none;
  box-shadow: 0px 3px 10px 0px black;
}

.edit:hover {
  background-color: #7c91f9;
}
</style>