<template>
  <base-card>
    <div class="btn-container">
      <button class="btn" :class="all ? 'active' : ''" @click="categoryFilter">
        <strong>All</strong>
      </button>
      <button class="btn" :class="UI ? 'active' : ''" @click="categoryFilter">
        <strong>UI</strong>
      </button>
      <button class="btn" :class="UX ? 'active' : ''" @click="categoryFilter">
        <strong>UX</strong>
      </button>
      <button
        class="btn"
        :class="enhancement ? 'active' : ''"
        @click="categoryFilter"
      >
        <strong>Enhancement</strong>
      </button>
      <button class="btn" :class="bug ? 'active' : ''" @click="categoryFilter">
        <strong>Bug</strong>
      </button>
      <button
        class="btn"
        :class="feature ? 'active' : ''"
        @click="categoryFilter"
      >
        <strong>Feature</strong>
      </button>
    </div>
  </base-card>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      all: true,
      UI: false,
      UX: false,
      enhancement: false,
      bug: false,
      feature: false,
    };
  },
  methods: {
    ...mapMutations(["CHANGE_CATEGORY"]),
    categoryFilter(e) {
      this.CHANGE_CATEGORY(e.target.innerText.toLowerCase());
      if ("all" === e.target.innerText.toLowerCase()) {
        this.all = true;
        this.UI = false;
        this.UX = false;
        this.enhancement = false;
        this.bug = false;
        this.feature = false;
        return;
      } else if ("ui" === e.target.innerText.toLowerCase()) {
        this.all = false;
        this.UI = true;
        this.UX = false;
        this.enhancement = false;
        this.bug = false;
        this.feature = false;
        return;
      } else if ("ux" === e.target.innerText.toLowerCase()) {
        this.all = false;
        this.UI = false;
        this.UX = true;
        this.enhancement = false;
        this.bug = false;
        this.feature = false;
        return;
      } else if ("enhancement" === e.target.innerText.toLowerCase()) {
        this.all = false;
        this.UI = false;
        this.UX = false;
        this.enhancement = true;
        this.bug = false;
        this.feature = false;
        return;
      } else if ("bug" === e.target.innerText.toLowerCase()) {
        this.all = false;
        this.UI = false;
        this.UX = false;
        this.enhancement = false;
        this.bug = true;
        this.feature = false;
        return;
      } else if ("feature" === e.target.innerText.toLowerCase()) {
        this.all = false;
        this.UI = false;
        this.UX = false;
        this.enhancement = false;
        this.bug = false;
        this.feature = true;
        return;
      }
    },
  },
  computed: {},
};
</script>


<style scoped>
.btn-container {
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
  background-color: rgb(118, 148, 231);
  color: #f2f4ff;
}

.active {
  background-color: blue;
  color: #f2f4ff;
}
</style>