<template>
  <div class="form_">
    <div class="form_title">
      <h1>Poster</h1>
    </div>
    <form>
      <div class="postMessage">
        <textarea
          name="messages"
          cols="1"
          rows="4"
          id="messages"
          placeholder=" ... votre message"
          v-model="messages"
          required
        ></textarea>
      </div>
      <div class="addImg" v-if="!image">
        <label for="file" class="label-file"
          ><i class="fa fa-solid fa-image"></i></label>
        <input
          type="file"
          id="file"
          class="input-file"
          @change="onFileChange"
        />
      </div>
      <div class="postImg" v-else>
        <img :src="image" />
        <button class="button-file" @click="removeurlMedia">
          Supprimer l'image
        </button>
      </div>
      <button
        :class="{ 'submit--disabled': !validatedPostFields }"
        @click.prevent="postSomething()"
        class="submit"
      >
        Poster
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return { fileImg: {}, messages: "", image: "" };
  },
  computed: {
    validatedPostFields: function () {
      if (this.image || this.messages) {
        return true;
      } else {
        return false;
      }
    },
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
      };
      reader.readAsDataURL(file);
    },
    removeurlMedia: function () {
      this.image = "";
      this.fileImg = null;
    },
    postSomething() {
      const formData = new FormData();
      formData.append(
        "post",
        JSON.stringify({
          nom_auteur: this.$store.state.userLastName,
          prenom_auteur: this.$store.state.userFirstName,
          poste_auteur: this.$store.state.userJob,
          user_id: this.$store.state.userId,
          messages: this.messages,
        })
      );
      formData.append("image", this.fileImg);

      axios
        .post("http://localhost:3000/api/posts", formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.userToken,
          },
        })
        .then(function () {
          location.reload();
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
.addImg {
  display: grid;
  #file {
    width: 50%;
  }
}
.postImg {
  padding-top: 15px;
}
.postMessage {
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr;
  textarea {
    width: -webkit-fill-available;
    margin: auto;
    color: #fc2e07;
    font-size: 20px;
    border-radius: 8px;
    border: 1px solid #fc846c;
    -webkit-transition: 0.5s;
    outline: none;
    transition: 0.5s;
    &:focus {
      border-radius: 8px;
      border-color: #fc846c;
      background-color: #fcb7a63d;
    }
    &::placeholder {
      color: #fcb7a6;
    }
  }
}
.label-file {
  padding-top: 10px;
  padding-bottom: 30px;
  cursor: pointer;
  color: #fc846c;
  font-weight: bold;
}
.label-file:hover {
  color: #fc2e07;
}
.button-file {
  margin-top: 10px;
  margin-bottom: 30px;
  color: #fc846c;
  background: none;
  border: none;
  cursor: pointer;
  color: #fc846c;
  font-weight: bold;
  font-size: 15px;
  &:hover {
    color: #fc2e07;
  }
}
// et on masque le input
.input-file {
  display: none;
}
/*input[type="text"] {
  margin: auto;
  display: grid;
  box-sizing: border-box;
  outline: none;
  color: #fc2e07;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid #fc846c;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  max-width: max-content;
  &::placeholder {
    color: #fcb7a6;
  }

}*/

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
i {
  font-size: 50px;
}
</style>
