<template>
  <div class="container flex flex-column">
    <nav>
      <router-link to="/" v-if="$route.path === '/add'">
        <button class="backBtn">
          <img src="@/assets/icon-arrow-left.svg" alt="back-arrow" />
          <strong>Go Back</strong>
        </button>
      </router-link>

      <router-link :to="backPath" v-if="$route.path === '/edit'">
        <button class="backBtn">
          <img src="@/assets/icon-arrow-left.svg" alt="back-arrow" />
          <strong>Go Back</strong>
        </button>
      </router-link>
    </nav>

    <img
      src="@/assets/icon-new-feedback.svg"
      alt="add"
      class="img"
      v-if="$route.path === '/add'"
    />
    <img
      src="@/assets/icon-edit-feedback.svg"
      alt="add"
      class="img"
      v-if="$route.path === '/edit'"
    />
    <form class="wrapper" @submit.prevent="submitForm">
      <div>
        <h1 v-if="$route.path === '/add'">Create New Feedback</h1>
        <h2 v-if="$route.path === '/edit'">Edit {{ title.val }}</h2>
      </div>

      <div class="title" :class="{ invalid: !title.isValid }">
        <label for="title">
          <h3>Feedback Title</h3>
          <p>Add a short, descriptive headline</p>
        </label>
        <input
          type="text"
          id="title"
          class="inputs"
          autocomplete="off"
          v-model="title.val"
          @blur="clearValidty('title')"
        />
      </div>

      <div class="category" :class="{ invalid: !category.isValid }">
        <label for="category">
          <h3>Category</h3>
          <p>Choose a category for your feedback</p>
        </label>
        <div
          class="inputs drop flex"
          @click="(dropMenu = !dropMenu), clearValidty('category')"
        >
          <span>{{ category.val }}</span>
          <img
            src="@/assets/icon-arrow-down.svg"
            alt="menu-down"
            class="drop-arrow"
            v-if="!dropMenu"
          />
          <img
            src="@/assets/icon-arrow-up.svg"
            alt="menu-down"
            class="drop-arrow"
            v-if="dropMenu"
          />
        </div>
      </div>
      <div class="drop-down" v-if="dropMenu" @click="clearValidty('category')">
        <ul>
          <li @click="selectCategory">UI</li>
          <li @click="selectCategory">UX</li>
          <li @click="selectCategory">Enhancement</li>
          <li @click="selectCategory">Bug</li>
          <li @click="selectCategory">Feature</li>
        </ul>
      </div>

      <div class="status" v-if="$route.path === '/edit'">
        <label for="status">
          <h3>Update Status</h3>
          <p>Change feature state</p>
        </label>
        <div class="inputs drop flex" @click="statusMenu = !statusMenu">
          <span>{{ status }}</span>
          <img
            src="@/assets/icon-arrow-down.svg"
            alt="menu-down"
            class="drop-arrow"
            v-if="!statusMenu"
          />
          <img
            src="@/assets/icon-arrow-up.svg"
            alt="menu-down"
            class="drop-arrow"
            v-if="statusMenu"
          />
        </div>
      </div>
      <div
        class="drop-down"
        v-if="statusMenu"
        @click="clearValidty('category')"
      >
        <ul>
          <li @click="selectStatus">Suggestion</li>
          <li @click="selectStatus">Planned</li>
          <li @click="selectStatus">In-Progress</li>
          <li @click="selectStatus">Live</li>
        </ul>
      </div>

      <div class="desc" :class="{ invalid: !description.isValid }">
        <label for="desc">
          <h3>Feedback Details</h3>
          <p>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
        </label>
        <textarea
          name="desc"
          id="desc"
          cols="30"
          rows="4"
          class="inputs"
          v-model="description.val"
          @blur="clearValidty('description')"
        ></textarea>
      </div>

      <p v-if="!formIsValid" style="margin-bottom: 20px">
        Please fix above issue to submit form
      </p>

      <div class="controls flex">
        <button
          @click="deleteFeedback"
          class="delete"
          type="button"
          v-if="$route.path === '/edit'"
        >
          Delete
        </button>
        <div>
          <router-link :to="backPath">
            <button type="button" class="cancel">Cancel</button>
          </router-link>

          <button
            type="submit"
            class="add-feebdback"
            v-if="$route.path === '/add'"
          >
            Add Feedback
          </button>
          <button type="submit" class="add-feebdback" v-else>
            Edit Feedback
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dropMenu: false,
      statusMenu: false,
      title: {
        val: "",
        isValid: true,
      },
      category: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      status: "suggestion",
      upvotes: 0,
      formIsValid: true,
      backPath: null,
    };
  },
  methods: {
    ...mapGetters(["GET_TOTAL", "GET_REQUEST"]),
    selectCategory(e) {
      this.category.val = e.target.innerText;
      this.dropMenu = !this.dropMenu;
    },
    selectStatus(e) {
      this.status = e.target.innerText.toLowerCase();
      this.statusMenu = !this.statusMenu;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.title.val === "") {
        this.title.isValid = false;
        this.formIsValid = false;
      }
      if (this.category.val === "") {
        this.category.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
    },
    clearValidty(input) {
      if (this[input].val != "") {
        this[input].isValid = true;
      }
    },
    addRequest() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      this.addFeedback();
    },
    async submitForm() {
      let requestNumber = this.GET_TOTAL();

      if (this.$route.path === "/edit") {
        requestNumber = this.GET_REQUEST().id -1;
      }

      const data = {
        id: requestNumber,
        title: this.title.val,
        category: this.category.val,
        description: this.description.val,
        status: this.status,
        upvotes: this.upvotes,
      };
      console.log(this.GET_TOTAL);
      try {
        const response = await fetch(
          `https://vue-feedback-board-default-rtdb.europe-west1.firebasedatabase.app/productRequests/${
            requestNumber
          }.json`,
          {
            method: "PUT",
            body: JSON.stringify(data),
          }
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || "failed to send feedback.");
        } else {
          this.$router.push({ path: "/" });
        }
      } catch (error) {
        alert(error);
      }
    },
    async deleteFeedback() {
      const requestNumber = this.GET_REQUEST().id;
      const data = {
        id: requestNumber,
        title: this.title.val,
        category: this.category.val,
        description: this.description.val,
        status: this.status,
        upvotes: this.upvotes,
      };
      try {
        const response = await fetch(
          `https://vue-feedback-board-default-rtdb.europe-west1.firebasedatabase.app/productRequests/${this.GET_REQUEST().id -1}.json`, {
            method: "DELETE",
            body: JSON.stringify(data),
          }
        );
        console.log(response)
        const resData = await response.json();
        console.log(resData)
        if (!response.ok) {
          throw new Error(resData.message || "Failed to delete feedback.");
        } else {
          this.$router.push({ path: "/" });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    if (this.$route.path === "/edit") {
      console.log(this.GET_REQUEST().title);
      this.title.val = this.GET_REQUEST().title;
      this.category.val = this.GET_REQUEST().category;
      this.description.val = this.GET_REQUEST().description;
      this.status = this.GET_REQUEST().status;
      this.backPath = "/feedback/" + this.GET_REQUEST().id;
      this.upvotes = this.GET_REQUEST().upvotes;
    } else {
      this.backPath = "/";
    }
  },
};
</script>

<style scoped>
.invalid label {
  color: red;
}
.container {
  width: 90%;
  margin: 60px auto;
  max-width: 600px;
}

.controls {
  justify-content: space-between;
}

.delete {
  background-color: red;
}
.delete:hover {
  background-color: rgb(255, 110, 110);
}

.status {
  margin-top: 20px;
}

textarea {
  resize: none;
  padding: 10px;
  height: 100px !important;
  font-size: 15px;
}

.cancel {
  width: 90px;
  background-color: purple;
}

button {
  height: 40px;
  border-radius: 10px;
  color: white;
  font-size: 13px;
  cursor: pointer;
  border-style: none;
}

.img {
  position: absolute;
  margin-left: 100px;
  height: 50px;
  width: 50px;
}

.add-feebdback {
  background-color: #ad1fea;
  margin-right: 1.5rem;
  width: 130px;
  margin: 0 20px;
}

.add-feebdback:hover {
  background-color: #ba48eb;
}

form {
  width: 80%;
  border-radius: 7px;
  margin: 0 auto;
  padding: 32px;
}

.desc {
  margin: 20px 0;
}

.category {
  margin: 20px 0 0 0;
  cursor: pointer;
}

.drop {
  justify-content: space-between;
}
.drop span {
  padding: 8px;
}
.drop-arrow {
  height: 16px;
  width: 20px;
  padding: 8px;
}

.drop-down {
  border-radius: 10px;
  box-shadow: 0px 5px 20px 0px grey;
}

.drop-down ul {
  list-style: none;
}

.drop-down li {
  padding: 8px 16px;
  border-top: black 1px solid;
}

.drop-down li:last-child {
  border-radius: 0 0 10px 10px;
}
.drop-down li:first-child {
  border-top: none;
  border-radius: 10px 10px 0 0;
}

.inputs {
  width: 100%;
  margin-top: 20px;
  height: 35px;
  border-style: none;
  background-color: lightblue;
  border-radius: 5px;
}

.title {
  margin: 20px auto;
}

#title {
  padding-left: 10px;
}

.icon {
  width: 20px;
  height: 20px;
}

.wrapper {
  background-color: white;
}

button {
  padding: 10px;
}

.backBtn {
  border-style: none;
  background: transparent;
  align-content: center;
  color: black;
}
.backBtn img {
  height: 8px;
  width: 8px;
}
.backBtn:hover {
  font-size: 14px;
}
.backBtn:hover img {
  height: 11px;
  width: 11px;
}
</style>