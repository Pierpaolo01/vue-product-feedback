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
      <navbar-modal v-if="navigationMenu" />
    </transition>
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
      navigationMenu: false,
    };
  },
  methods: {
    toggleNav() {
      this.navigationMenu = !this.navigationMenu;
    },
  }
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
  background: url("../../assets/suggestions/mobile/background-header.png")
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

.right img{
  
  padding: 1rem 1rem;
  cursor: pointer;
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

</style>