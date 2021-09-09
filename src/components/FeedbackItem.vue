<template>
  <li class="feedback-container">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <h5>{{ type }}</h5>
    <div class="flex btn-container">
      <button id="upVoteCounter">
        <img src="@/assets/icon-arrow-up.svg" alt="upvote" />
        <strong>{{ upvotes }}</strong>
      </button>
      <button id="commentsCounter">
        <img src="@/assets/icon-comments.svg" alt="comments" /> 
        <span>{{ comments }}</span>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    upvotes: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.feedback-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "heading heading"
    "description description"
    "category ."
    "icons icons";

  background-color: white;
  border-radius: 10px;
  padding: 25px;
  margin: 0px auto 15px auto;

  
}

.feedback-container h3 {
  margin: 0 0 15px 0;
  color: #4661e6;
  grid-area: heading;
}

.feedback-container p {
  grid-area: description;
}

.feedback-container h5 {
  max-width: 100px;
  margin: 20px 0 20px 20px;
  color: #4661e6;
  background-color: rgba(173, 216, 230, 0.356);
  border-radius: 10px;
  padding: 5px;
  text-align: center;
  grid-area: category;
}
.btn-container {
  justify-content: space-between;
  grid-area: icons;
}

#upVoteCounter {
  width: 70px;
  color: #3a4374;
  padding: 5px;
  background-color: rgba(173, 216, 230, 0.562);
  border-radius: 10px;
  text-align: center;
  border-style: none;
  align-items: center;
  grid-area: upvotes;
}
#upVoteCounter img {
  height: 10px;
  width: 12px;
  margin: 0 5px 0 0;
}

#commentsCounter {
  width: 70px;
  color: #3a4374;
  background: transparent;
  border-radius: 10px;
  padding: 5px;
  right: 0;
  text-align: center;
  border-style: none;
  grid-area: comments;
}

#commentsCounter span{
margin-left: 10px;
font-size: 15px;
}

#commentsCounter img {
  height: 15px;
  width: 18px;
}
</style>