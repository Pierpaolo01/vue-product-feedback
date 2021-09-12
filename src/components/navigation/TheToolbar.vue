<template>
  <section class="toolbar flex">
    <div class="filter flex" @click="toggleFilter">
      <div>
        <span>
          Sort by
          <span v-if="GET_FILTER"
            >: <strong>{{ GET_FILTER }}</strong>
          </span>
        </span>
        <img
          v-if="!filteredMenu"
          src="@/assets/icon-arrow-down.svg"
          alt="open filter menu"
          class="arrow-down"
        />
        <img
          v-else
          src="@/assets/icon-arrow-up.svg"
          alt="close filter menu"
          class="arrow-down"
        />
      </div>
      <ul v-show="filteredMenu" class="filter-menu">
        <li @click="filterChoice">Default</li>
        <li @click="filterChoice">Most Upvotes</li>
        <li @click="filterChoice">Least Upvotes</li>
        <li @click="filterChoice">Most comments</li>
        <li @click="filterChoice">Least comments</li>
      </ul>
    </div>
    <button class="add-feebdback"><strong>+ Add Feeback</strong></button>
  </section>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      filteredMenu: false,
    };
  },
  methods: {
    ...mapMutations(['CHANGE_FILTER']),
    filterChoice(e) {
      console.log(e.target.innerText)

      this.filteredBy = e.target.innerText;
      this.CHANGE_FILTER(this.filteredBy);
      
    },
    toggleFilter() {
      this.filteredMenu = !this.filteredMenu;
    },
  },
  computed:{
    ...mapGetters(['GET_FILTER']),
  },
  created() {
    // this.filterChoice("Most Upvotes");
  },
};
</script>

<style scoped>
.toolbar {
  height: 55px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: #373f68;
  color: white;
}

.filter {
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 1;
}

.add-feebdback {
  width: 130px;
  height: 40px;
  background-color: #ad1fea;
  margin-right: 1.5rem;
  border-radius: 10px;
  border-style: none;
  color: white;
  font-size: 13px;
  cursor: pointer;
  }

  .add-feebdback:hover {
      background-color: #ba48eb;
  }
.filter-menu {
  list-style-type: none;
  color: black;
  background: #fefefe;
  align-content: flex-start;
  margin-top: 215px;
  margin-left: 50px;
  border-radius: 10px;
  border: 1px darkslategray solid;
  position: absolute;
}

.filter-menu li:first-child {
  border-radius: 10px 10px 0px 0px;
}
.filter-menu li {
  padding: 0.5rem;
  border-bottom: 1px darkslategray solid;
}
.filter-menu li:last-child {
  border-bottom: 0;
  border-radius: 0px 0px 10px 10px;
}
.filter-menu li:hover {
  background-color: lightgray;
}

@media screen and (min-width: 700px) {
.toolbar {
  width: 100%;
  margin: 0 auto 25px auto;
  border-radius: 15px;
}
}
</style>