<template>
  <div>
    <!-- Display if photos not been loaded -->
    <router-link v-if="photosListEmpty" class="link" :to="{name: 'pageTwo'}">Page two (no preload)</router-link>

    <router-link
      class="link"
      :to="{name: 'pageTwo'}"
      @mouseenter.native="linkMouseEnter"
    >Page two (preload on mouseenter)</router-link>
  </div>
</template>

<script>
export default {
  name: "PageOne",
  methods: {
    linkMouseEnter() {
      this.$store
        .dispatch("uploadPhotos")
        .then(() => console.log("PHOTOS_UPLOADED", this.$store.state))
        .catch(error => console.warn(error.message));
    }
  },
  computed: {
    photosListEmpty() {
      /* 
        Check if photos are uploaded
      */
      return this.$store.getters.photosList.length === 0;
    }
  }
};
</script>

<style scoped>
.link {
  margin-right: 40px;
}
</style>
