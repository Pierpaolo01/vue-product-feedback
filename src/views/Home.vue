<template>
  <navbar-phone v-if="mobile"/>
  <h1 v-else>Not designed yet</h1>

</template>

<script>
import NavbarPhone from "@/components/NavbarPhone.vue";
export default {
  name: "Home",
  components: {
    NavbarPhone,
  },
  data() {
    return {
      mobile: false,
    };
  },
  methods: {
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth > 600) {
        this.mobile = false;
        return;
      }

      this.mobile = true;
    },
  },
  created() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
};
</script>
