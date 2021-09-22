<template>
  <div class="responsive flex flex-column">
    <header>
      <navbar-phone v-if="mobile" />

      <div class="responsive-head flex" v-else>
        <!-- Comp 1 LOGO -->
        <TheLogo />
        <!-- Comp 2 filter -->
        <FilterButtons />
        <!-- Comp 3 Roadmap -->
        <RoadMap />
      </div>
    </header>

    <div class="container">
      <TheToolbar :listLength="displayRequests.length" :isMobile="mobile" />

      <ul class="feedback-list">
        <feedback-item
          v-for="req in displayRequests" :key="req.id"
          :id="req.id"
          :title="req.title"
          :description="req.description"
          :category="req.category"
          :upvotes="req.upvotes"
          :comments="req.comments"
        />
      </ul>
      <div class="empty flex flex-column" v-if="displayRequests.length <= 0">
        <img src="@/assets/suggestions/illustration-empty.svg" alt="empty" />
        <h4>
          <b>There is no feedback for {{ category }} yet.</b>
        </h4>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <router-link to="/add">
          <button class="add-feebdback"><strong>+ Add Feeback</strong></button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarPhone from "@/components/navigation/NavbarPhone.vue";
import FeedbackItem from "@/components/FeedbackItem.vue";
import TheToolbar from "@/components/navigation/TheToolbar.vue";
import TheLogo from "@/components/drawers/TheLogo.vue";
import FilterButtons from "@/components/drawers/FilterButtons.vue";
import RoadMap from "../components/drawers/RoadMap.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    NavbarPhone,
    FeedbackItem,
    TheToolbar,
    TheLogo,
    FilterButtons,
    RoadMap,
  },
  data() {
    return {
      productRequests: null,
      categorizedRequests: null,
      mobile: false,
    };
  },
  methods: {
    ...mapMutations(["CHANGE_TOTAL"]),
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth > 700) {
        this.mobile = false;
        return;
      }
      this.mobile = true;
    },

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
      this.CHANGE_TOTAL(this.productRequests.length);
    },

    filterBy(sortType) {
      if (sortType === "Most Upvotes") {
        this.productRequests.sort(
          (a, b) => parseFloat(b.upvotes) - parseFloat(a.upvotes)
        );
        return;
      }

      if (sortType === "Least Upvotes") {
        this.productRequests.sort(
          (a, b) => parseFloat(a.upvotes) - parseFloat(b.upvotes)
        );
        return;
      }

      if (sortType === "Most Comments") {
        this.productRequests.sort((a, b) => {
          if (a.comments === undefined) {
            a.comments = "";
          }
          if (b.comments === undefined) {
            b.comments = "";
          }

          return b.comments.length - a.comments.length;
        });

        return;
      }

      if (sortType === "Least Comments") {
        this.productRequests.sort((a, b) => {
          if (a.comments === undefined) {
            a.comments = "";
          }
          if (b.comments === undefined) {
            b.comments = "";
          }

          return a.comments.length - b.comments.length;
        });
        return;
      }
    },
    filterRequests(){
      const category = this.GET_CATEGORY;
      if (this.productRequests != null) {
        if (category === "all") {
          return this.productRequests.filter(item => item != null);
        }
        if (category === "ui") {
          return this.productRequests.filter((cat) => cat.category  === "ui" && cat != null);
        }
        if (category === "ux") {
          return this.productRequests.filter((cat) => cat.category === "ux" && cat != null);
        }
        if (category === "enhancement") {
          return this.productRequests.filter(
            (cat) => cat.category === "enhancement"
            && cat != null
          );
        }
        if (category === "bug") {
          return this.productRequests.filter((cat) => cat.category === "bug" && cat != null);
        }
        if (category === "feature") {
          return this.productRequests.filter(
            (cat) => cat.category === "feature"
            && cat != null
          );
        }
      
      
      return this.productRequests;
      }
      
    },
  },
  computed: {
    ...mapGetters(["GET_FILTER", "GET_CATEGORY"]),

    displayRequests() {
      let filteredRequests = "";
      if (this.productRequests != null ) {
        filteredRequests = this.filterRequests();
      }
      
      return filteredRequests;
    },
    category() {
      return this.GET_CATEGORY.toUpperCase();
    },
  },
  watch: {
    GET_FILTER() {
      this.filterBy(this.GET_FILTER);
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
.feedback-list {
  width: 100%;
  margin: 10px auto;
}

.empty {
  height: 350px;
  background: white;
  text-align: center;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 15px;
}

.empty p {
  max-width: 400px;
}

.add-feebdback {
  width: 130px;
  height: 40px;
  background-color: #ad1fea;
  border-radius: 10px;
  border-style: none;
  color: white;
  font-size: 13px;
  cursor: pointer;

  margin: 0 auto;
}

@media screen and (min-width: 700px) and (max-width: 1099px) {
  header {
    width: 80%;
    margin: 0 auto;
  }

  .feedback-list {
    width: 100%;
    margin: 10px auto;
  }
  .container {
    width: 730px;
    max-width: 800px;
    margin: 0px auto;
  }

  .responsive-head {
    margin: 24px auto 0 auto;
    max-height: 230px;

    justify-content: space-around;
  }
}

@media screen and (min-width: 1100px) {
  .responsive-head {
    flex-direction: column;
    max-width: 250px;
  }
  .responsive {
    max-width: 1100px;
    flex-direction: row;
    margin: 75px auto;
  }
  header {
    width: 200px;
    flex: 1;
  }

  .container {
    flex: 3;
  }
}
</style>
