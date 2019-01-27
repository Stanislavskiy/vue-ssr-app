import axios from "axios";

const PHOTOS_URL = "http://jsonplaceholder.typicode.com/photos";

export const getPhotos = () =>
  axios.get(PHOTOS_URL).then(response => {
    return response.data;
  });
