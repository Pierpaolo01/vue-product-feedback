<template>
  <nav class="flex flex-column">
    <header class="flex">
      <div class="left">
        <div class="title">
          <h4>Frontend Mentor</h4>
          <h6>Feedback Board</h6>
        </div>
      </div>
      <div class="right">
        <button @click="toggleNav">
          <img
            v-if="!navigationMenu"
            src="@/assets/mobile/icon-hamburger.svg"
            alt="hamburger menu"
            class="ham-bar"
          />
          <img
            v-else
            src="@/assets/mobile/icon-close.svg"
            alt="hamburger menu"
            class="ham-bar"
          />
        </button>
      </div>
    </header>

    <transition name="modal">
      <navbar-modal v-if="navigationMenu"/>
    </transition>

    <section class="header2 flex">
      <div class="filter flex" @click="toggleFilter">
        <div>
          <span>
            Sort by
            <span v-if="isFiltered">: <strong>{{ isFiltered }}</strong>
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
          <li @click="filteredInvoice">Most Upvotes</li>
          <li @click="filteredInvoice">Least Upvotes</li>
          <li @click="filteredInvoice">Most comments</li>
          <li @click="filteredInvoice">Least comments</li>
        </ul>
      </div>
      <button class="add-feebdback"><strong>+ Add Feeback</strong></button>
    </section>
  </nav>
</template>

<script>
import NavbarModal from "./NavbarModal.vue";

export default {
  components: {
    NavbarModal,
  },
  data() {
    return {
      isFiltered: null,
      filteredMenu: false,
      navigationMenu: false,
    };
  },
  methods: {
    toggleNav() {
      this.navigationMenu = !this.navigationMenu;
    },
    toggleFilter() {
      this.filteredMenu = !this.filteredMenu;
    },
    filteredInvoice(e) {
      if (!e.target) {
        this.isFiltered = e;
        return;
      }
      this.isFiltered = e.target.innerText;
    },
  },
  created() {
    this.filteredInvoice("Most Upvotes");
  },
};
</script>


<style scoped>

/* Transition Modal */

.modal-enter-active,
.modal-leave-active {
    transition: 0.6s ease all;
}

.modal-enter-from,
.modal-leave-to {
    transform: translateX(300px);
}

/* //// */
header {
  height: 75px;
  width: 100%;
  background-color: blue;
  color: white;
  align-items: center;
  justify-content: space-between;
  background: url("../assets/suggestions/mobile/background-header.png")
    no-repeat;
  background-size: 100% 100%;
  z-index: 3;
}
.title {
  padding: 0 1.5rem;
}
.title h6 {
  padding-top: 5px;
}

.right {
  padding: 0 1.5rem;
}

button {
  background: transparent;
  border: 0;
}

.ham-bar {
  height: 20px;
  width: 22px;
}

.arrow-down {
  margin-left: 12px;
  width: 10px;
  height: 10px;
}

.header2 {
  height: 55px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: #373f68;
  color: white;
  position: absolute;
  margin: 75px 0 0 0;
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
  color: white;
  font-size: 13px;
}

.filter-menu {
  list-style-type: none;
  color: black;
  background: #fefefe;
  align-content: flex-start;
  margin-top: 175px;
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
</style>