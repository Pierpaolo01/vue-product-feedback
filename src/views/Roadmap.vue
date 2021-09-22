<template>
  <div class="container">
    <header class="flex">
      <div class="left">
        <button class="backBtn">
          <img src="@/assets/icon-arrow-left.svg" alt="back-arrow" />
          <strong>Go Back</strong>
        </button>
        <h3>Roadmap</h3>
      </div>
      <button class="add-feebdback"><strong>+ Add Feeback</strong></button>
    </header>

    <main v-if="mobile">
      <nav class="flex">
        <div class="planned" :class="{'active': (filter === 'planned')}" @click="filter = 'planned'">
          <span><strong>Planned (total)</strong></span>
        </div>
        <div class="in-progress" :class="{'active': (filter === 'in-progress')}" @click="filter = 'in-progress'">
          <span><strong>In-Progress (total)</strong> </span>
        </div>
        <div class="live" @click="filter = 'live'" :class="{'active': (filter === 'live')}">
          <span><strong>Live (total)</strong></span>
        </div>
      </nav>
      <section class="content" v-if="productRequests">
        <FeedbackItem
          v-for="req in list"
          :key="req.id"
          :id="req.id"
          :title="req.title"
          :description="req.description"
          :category="req.category"
          :upvotes="req.upvotes"
          :comments="req.comments"
        />
      </section>
    </main>
  </div>
</template>

<script>
import FeedbackItem from "@/components/FeedbackItem.vue";
export default {
  components: {
    FeedbackItem,
  },
  data() {
    return {
      filter: "planned",
      productRequests: null,
      mobile: true,
    };
  },
  methods: {
    async getData() {
      const response = await fetch(
        "https://vue-feedback-board-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json"
      );
      const resData = await response.json();
      if (!response.ok) {
        console.log("error");
        return;
      }
      console.log(resData);
      this.productRequests = resData;
    },
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth > 700) {
        this.mobile = false;
        return;
      }
      this.mobile = true;
    },
  },
  computed: {
    list() {
      return this.productRequests.filter((item) => item.status === this.filter);
    },
  },
  created() {
    this.getData();
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
};
</script>

<style scoped>
nav {
  justify-content: space-around;
  border-bottom: 1px solid darkgray;
  cursor: pointer;
}

nav div {
  padding: 25px;
}
.active {
  color: black !important;
  border-bottom: 3px solid yellow;
}

nav div {
  color: grey;
}



header {
  justify-content: space-between;
  background-color: #373f68;
  height: 50px;
  padding: 25px;
  color: white;
}

h3 {
  padding: 5px;
}
.backBtn {
  border-style: none;
  background: transparent;
  align-content: center;
  color: white;
  padding: 5px;
}
.backBtn img {
  height: 8px;
  width: 8px;
  padding-right: 5px;
}
.backBtn:hover {
  font-size: 14px;
}
.backBtn:hover img {
  height: 11px;
  width: 11px;
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
  margin-top: 180px;
  margin-left: 50px;
  border-radius: 10px;
  border: 1px darkslategray solid;
  position: absolute;
}

@media screen and (min-width: 700px) {
  .container {
    margin: 50px auto;
    max-width: 700px;
  }

  header {
    border-radius: 15px;
  }
}
</style>