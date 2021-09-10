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
      <TheToolbar />

      <ul class="feedback-list">
        <feedback-item
          v-for="req in productRequests" :key="req.id"
          :id="req.id"
          :title="req.title"
          :description="req.description"
          :category="req.category"
          :upvotes="req.upvotes"
          :comments="req.comments"
        />
      </ul>
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
      mobile: false,
    };
  },
  methods: {
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth > 700) {
        this.mobile = false;
        return;
      }

      this.mobile = true;
    },
    async getData(){
      const response = await fetch('https://vue-feedback-board-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json');
      const resData = await response.json();
      if(!response.ok){
        console.log("error")
        return;
      }
      this.productRequests = resData;

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

@media screen and (min-width: 700px) and ( max-width: 1099px) {
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
  .responsive{
    max-width: 1100px;
    flex-direction: row;
    margin: 75px auto;
  }
  header {
    width: 200px;
    flex: 1;
  }

  .container{
    flex: 3;
  }
}
</style>
