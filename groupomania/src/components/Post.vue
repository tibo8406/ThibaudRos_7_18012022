<template>
  <div class="form_">
    <div class="form_title">
      <h1>Poster</h1>
    </div>
    <form>
      <div class="ligne1champs">
        <input
          type="text"
          id="messages"
          name="messages"
          placeholder="Votre message"
          v-model="messages"
          required
        />
        <div v-if="!image">
          <h2>Ajouter une image</h2>
          <input type="file" id="file" @change="onFileChange" />
        </div>
        <div v-else>
          <img :src="image" />
          <button @click="removeurlMedia">Supprimer l'image</button>
        </div>
      </div>
      <div class="button">
        <a href="#"
          ><button v-on:click="postSomething()" class="submit">
            Poster
          </button></a
        >
      </div>
    </form>
  </div>
</template>

<script>
import router from "../router/index";
import axios from "axios";
export default {
  data() {
    return { fileImg: {}, messages: "", image: "" };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createurlMedia(files[0]);
      this.fileImg = e.target.files[0];
    },
    createurlMedia(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        console.log(this.fileImg);
      };
      reader.readAsDataURL(file);
    },
    removeurlMedia: function () {
      this.image = "";
      this.fileImg = null;
    },
    postSomething() {
      event.preventDefault;
      console.log(this.messages);
      axios
        .post("http://localhost:3000/api/posts", /*this.fileImg,*/ {
          /*headers: {
            "Content-Type": "multipart/form-data",
          },*/
          nom_auteur: this.$store.state.userLastName,
    prenom_auteur: this.$store.state.userFirstName,
    poste_auteur: this.$store.state.userJob,
    user_id: this.$store.state.userId,
    messages: this.messages,

        })
        .then(function (response) {
          router.push("SocialGroup");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
#header {
  justify-items: center;
  padding: 0px 15px 0px 15px;
}

.ligne1champs {
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr;
}

input[type="text"] {
  display: grid;
  box-sizing: border-box;
  outline: none;
  color: #fc2e07;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid #fc846c;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  &::placeholder {
    color: #fcb7a6;
  }
  &:focus {
    border-radius: 8px;
    border: 1px solid #fc2e07;
    background-color: #fcb7a63d;
  }
}

.forgot {
  padding: 25px 5px 25px 5px;
  a {
    color: #fc2e07;
  }
}
.submit {
  margin: auto auto 10px auto;
  width: 65%;
  background-color: rgb(252, 46, 7, 0.5);
  border-radius: 5px;
  padding: 15px;
  font-size: 20px;
  text-transform: uppercase;
  border: 0px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: rgb(252, 46, 7, 1);
  }
  text-decoration: none;
  color: #fcf2f1;
}
</style>
