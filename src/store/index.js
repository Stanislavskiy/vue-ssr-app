import Vue from "vue";
import Vuex from "vuex";
import { getPhotos } from "../api";
import { timeoutOver } from "../utils";

Vue.use(Vuex);

/* Mutation constants */

const UPDATE_PHOTOS_LIST = "UPDATE_PHOTOS_LIST";
const UPDATE_PHOTOS_UPLOAD_TIME = "UPDATE_PHOTOS_UPLOAD_TIME";

export const createStore = () =>
  new Vuex.Store({
    state: {
      photos: {
        list: [],
        listUploadTime: null,
        listUploadTimeout: 5000
      }
    },

    getters: {
      photosList: state => state.photos.list,
      photosTitles: state => state.photos.list.map(item => item.title)
    },

    mutations: {
      [UPDATE_PHOTOS_LIST]: (state, list) =>
        Vue.set(state.photos, "list", list),

      [UPDATE_PHOTOS_UPLOAD_TIME]: state =>
        // Set current time in milliseconds
        Vue.set(state.photos, "listUploadTime", new Date().getTime())
    },

    actions: {
      uploadPhotos({ commit, state }) {
        /* 
          Upload photos and set upload time if timeout expired
        */
        return new Promise((resolve, reject) => {
          const uploadTime = state.photos.listUploadTime;
          const uploadTimeout = state.photos.listUploadTimeout;

          if (timeoutOver(uploadTime, uploadTimeout)) {
            getPhotos().then(data => {
              // Update photos list
              commit(UPDATE_PHOTOS_LIST, data);
              // Update upload time
              commit(UPDATE_PHOTOS_UPLOAD_TIME);

              resolve();
            });
          } else {
            reject(new Error("Timeout is not over!"));
          }
        });
      }
    }
  });
