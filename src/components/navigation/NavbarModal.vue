<template>
  <section class="slide-modal">
    <FilterButtons />

    <RoadMap />
  </section>
</template>
<script>
import FilterButtons from "../drawers/FilterButtons.vue";
import RoadMap from "../drawers/RoadMap.vue";
export default {
  components: { FilterButtons, RoadMap },
};
</script>

<style scoped>
.slide-modal {
  background-color: rgb(247, 248, 253);
  width: 260px;
  height: 100%;
  color: black;
  z-index: 2;
  right: 0;
  position: absolute;
  overflow: hidden;
  margin-top: 75px;
  padding-top: 35px;
}
</style>