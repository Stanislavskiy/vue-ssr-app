import Vue from "vue";
import Vuex from "vuex";
import { getPhotos } from "../api";
import { timeoutOver } from "../utils";

Vue.use(Vuex);

const UPDATE_PHOTOS = "UPDATE_PHOTOS";
const UPDATE_PHOTOS_LOADED_TIME = "UPDATE_PHOTOS_LOADED_TIME";

export const createStore = () =>
  new Vuex.Store({
    state: {
      photos: {
        list: [],
        listLoadedTime: null,
        listLoadedTimeout: 5000
      }
    },

    getters: {
      photosTitles: state => state.photos.list.map(item => item.title),
    },

    mutations: {
      [UPDATE_PHOTOS]: (state, photos) => Vue.set(state.photos, "list", photos),
      [UPDATE_PHOTOS_LOADED_TIME]: state =>
        Vue.set(state.photos, "loadedTime", new Date().getTime()) // Set current time
    },

    actions: {
      loadPhotos({ commit, state }) {
        return new Promise((resolve, reject) => {
          const loadedTime = state.photos.listLoadedTime;
          const loadedTimeout = state.photos.listLoadedTimeout;
  
          if (timeoutOver(loadedTime, loadedTimeout)) {
            console.log("LOAD_PHOTOS");
            
            getPhotos().then(data => {
              // Update photos list
              commit(UPDATE_PHOTOS, data);
              // Update loaded date
              commit(UPDATE_PHOTOS_LOADED_TIME);

              resolve();
            });
          } else {
            resolve();
          }
        })
      }
    }
  });
