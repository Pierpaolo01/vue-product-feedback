<template>
  <div class="container">
    <header class="flex">
      <div class="left">
        <router-link to="/">
          <button class="backBtn">
            <img src="@/assets/icon-arrow-left.svg" alt="back-arrow" />
            <strong>Go Back</strong>
          </button>
        </router-link>
        <h3>Roadmap</h3>
      </div>
      <router-link to="/add">
        <button class="add-feebdback">
          <strong>+ Add Feeback</strong>
        </button>
      </router-link>
    </header>

    <main v-if="mobile">
      <nav class="flex">
        <div
          :class="{ activeP: filter === 'planned' }"
          @click="filter = 'planned'"
        >
          <span
            ><strong>Planned ({{ plannedList.length }}) </strong></span
          >
        </div>
        <div
          :class="{ activeI: filter === 'in-progress' }"
          @click="filter = 'in-progress'"
        >
          <span
            ><strong>In-Progress ({{ progressList.length }}) </strong>
          </span>
        </div>
        <div @click="filter = 'live'" :class="{ activeL: filter === 'live' }">
          <span
            ><strong>Live ({{ liveList.length }}) </strong></span
          >
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
          :class="filter"
        />
      </section>
    </main>
    <main v-else class="flex desktop-container">
      <section>
        <div class="title">
          <span>
            <strong>Planned ({{ plannedList.length }}) </strong>
          </span>
          <p>Ideas prioritized for research</p>
        </div>
        <FeedbackItem
          v-for="req in plannedList"
          :key="req.id"
          :id="req.id"
          :title="req.title"
          :description="req.description"
          :category="req.category"
          :upvotes="req.upvotes"
          :comments="req.comments"
          :class="req.status"
        />
      </section>
      <section>
        <div class="title">
          <span>
            <strong>In-Progress ({{ progressList.length }}) </strong>
          </span>
          <p>Features currently being developed</p>
        </div>
        <FeedbackItem
          v-for="req in progressList"
          :key="req.id"
          :id="req.id"
          :title="req.title"
          :description="req.description"
          :category="req.category"
          :upvotes="req.upvotes"
          :comments="req.comments"
          :class="req.status"
        />
      </section>
      <section>
        <div class="title">
          <span>
            <strong>Live ({{ liveList.length }}) </strong>
          </span>
          <p>Released features</p>
        </div>
        <FeedbackItem
          v-for="req in liveList"
          :key="req.id"
          :id="req.id"
          :title="req.title"
          :description="req.description"
          :category="req.category"
          :upvotes="req.upvotes"
          :comments="req.comments"
          :class="req.status"
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
    plannedList() {
      return this.productRequests.filter((item) => item.status === "planned");
    },
    progressList() {
      return this.productRequests.filter(
        (item) => item.status === "in-progress"
      );
    },
    liveList() {
      return this.productRequests.filter((item) => item.status === "live");
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
  margin-bottom: 15px;
}

nav div {
  padding: 25px;
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

.title {
  margin: 15px 0 10px;
}
.title strong {
  margin: 5px 0;
}
.title p {
  margin: 10px 0;
}

.activeP {
  color: black !important;
  border-bottom: 3px solid rgb(244, 159, 134);
}

.activeI {
  color: black !important;
  border-bottom: 3px solid #ad1fea;
}

.activeL {
  color: black !important;
  border-bottom: 3px solid #61bdfa;
}

.planned {
  background-color: rgb(244, 159, 134);
}

.in-progress {
  background-color: #ad1fea;
}

.live {
  background-color: #61bdfa;
}

@media screen and (min-width: 700px) {
  .container {
    margin: 50px auto;
    max-width: 1200px;
  }

  header {
    border-radius: 15px;
  }

  .desktop-container {
    justify-content: space-around;
  }

  .planned {
    max-width: 380px;
  }
  .in-progress {
    max-width: 380px;
  }
  .live {
    max-width: 380px;
  }
}
</style>