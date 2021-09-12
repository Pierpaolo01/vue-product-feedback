<template>
  <div class="container flex flex-column">
    <FeedbackToolbar />

    <FeebackItem
      v-if="!isLoading"
      :id="currentFeedback.id"
      :title="currentFeedback.title"
      :description="currentFeedback.description"
      :category="currentFeedback.category"
      :upvotes="currentFeedback.upvotes"
      :comments="currentFeedback.comments"
    />
    <h1 v-else>LOADING...</h1>

    <section class="comments" v-if="commentsLength > 0">
      <header class="flex">
        <h3>{{ commentsLength }} comments</h3>
      </header>

      <CommentsComp
        v-for="comment in currentFeedback.comments"
        :key="comment.id"
        :id="comment.id"
        :content="comment.content"
        :user="comment.user"
      />
    </section>
    <section v-else>
        <h1>NO COMMENTS YET</h1>
    </section>
  </div>
</template>

<script>
import FeebackItem from "../components/FeedbackItem.vue";
import FeedbackToolbar from "../components/navigation/FeedbackToolbar.vue";
import CommentsComp from "../components/CommentsComp.vue";
export default {
  components: { FeedbackToolbar, FeebackItem, CommentsComp },
  data() {
    return {
      isLoading: null,
      currentFeedback: null,
    };
  },
  methods: {
    async getCurrentFeedback() {
      this.isLoading = true;
      const response = await fetch(
        "https://vue-feedback-board-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json"
      );
      const resData = await response.json();

      const item = resData.find(
        (feedItem) => feedItem.id == this.$route.params.id
      );

      this.isLoading = false;
      this.currentFeedback = item;

      console.log(item);
    },
  },
  computed: {
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