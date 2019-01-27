<template>
  <div>
    <router-link
      class="link" 
      :to="{name: 'pageTwo'}" 
      @mouseenter.native="linkMouseEnter"
    >
      Page two (preload on mouseenter)
    </router-link>

    <router-link 
      class="link"
      :to="{name: 'pageTwo'}" 
    >
      Page two (no preload)
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PageOne",
  methods: {
    linkMouseEnter() {
      this.$store.dispatch("loadPhotos");
    }
  }
};
</script>

<style scoped>
  .link {
    display: block;
    margin-bottom: 40px;
  }
</style>
