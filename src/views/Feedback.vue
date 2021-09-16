<template>
  <div class="container flex flex-column">
    <h1 v-if="isLoading">LOADING...</h1>
    <div v-else>
      <FeedbackToolbar :id="currentFeedback.id" />
      <FeebackItem
        :id="currentFeedback.id"
        :title="currentFeedback.title"
        :description="currentFeedback.description"
        :category="currentFeedback.category"
        :upvotes="currentFeedback.upvotes"
        :comments="currentFeedback.comments"
      />

      <section class="comments">
        <header class="flex">
          <h3 v-if="currentFeedback.comments">{{ commentsLength }} comments</h3>
          <h3 v-else>No comments yet!</h3>
        </header>

        <div v-if="currentFeedback.comments">
          <CommentsComp
            v-for="comment in currentFeedback.comments"
            :key="comment.id"
            :id="comment.id"
            :content="comment.content"
            :user="comment.user"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FeebackItem from "../components/FeedbackItem.vue";
import FeedbackToolbar from "../components/navigation/FeedbackToolbar.vue";
import CommentsComp from "../components/CommentsComp.vue";
import { mapMutations } from "vuex";

export default {
  components: { FeedbackToolbar, FeebackItem, CommentsComp },
  data() {
    return {
      isLoading: true,
      currentFeedback: null,
    };
  },
  methods: {
    ...mapMutations(["CHANGE_REQUEST"]),
    
    async getCurrentFeedback() {
      this.isLoading = true;
      const response = await fetch(
        "https://vue-feedback-board-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json"
      );
      const resData = await response.json();

      const item = resData.find(
        (feedItem) => feedItem != null && feedItem.id == this.$route.params.id 
      );

      this.isLoading = false;
      this.currentFeedback = item;
      this.CHANGE_REQUEST(this.currentFeedback)
    },
  },
  computed: {
    comments() {
      if (this.currentFeedback != null) {
        return this.currentFeedback.comments;
      }
      return "sefsfsd";
    },
    commentsLength() {
      return this.currentFeedback.comments.length;
    },
  },
  created() {
    
    this.getCurrentFeedback();
  },
};
</script>

<style scoped>
.container {
  width: 50%;
  max-width: 750px;
  margin: 40px auto;
  justify-content: space-between;
}

.comments {
  width: 100%;
  background-color: white;
  border-radius: 10px;
}

h3 {
  margin: 25px;
}

@media screen and (max-width: 700px) {
  .container {
    width: 90%;
  }
}
</style>