<template>
  <div>
    <router-link :to="{name: 'pageOne'}">Page one</router-link>
    <div class="titles">
      <h3 
        class="titles__item" 
        v-for="title in titles"
        :key="title"
        >
          {{title}}
        </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTwo",

  asyncData({ store, route }) {
    return store.dispatch("loadPhotos");
  },

  computed: {
    titles() {
      return this.$store.getters.photosTitles;
    }
  }
};
</script>