<template>
  <div class="UserAccount">
    <h1 v-if="mode == 'saved'">Mon compte utilisateur</h1>
    <h1 v-else>Je modifie mon compte utilisateur</h1>
    <img
      v-if="!image && mode == 'saved'"
      src="http://localhost:3000/images/user_default.jpg"
    />

    <div class="userImg" v-if="!image && mode == 'modify'">
      <h2>Photo de profil</h2>
      <img v-if="mode == 'saved' && image" :src="image" />
      <input
        v-if="mode == 'modify'"
        type="file"
        id="file"
        @change="onFileChange"
      />
    </div>
    <div v-else>
      <img :src="image" />
      <button v-if="mode == 'modify'" @click="removeurlMedia">
        Supprimer la photo de profil
      </button>
    </div>
    <br />
    <h2>Informations générales</h2>
    <div class="userinfo">
      <form class="form_userinfo">
        <label>Nom :</label>
        <input
          v-if="mode == 'saved'"
          class="input--disabled"
          type="text"
          id="nom"
          name="Nom"
          v-model="nom"
          disabled
        />
        <input
          v-else
          class="input--enabled"
          type="text"
          id="nom"
          name="Nom"
          v-model="nom"
          required
        />
        <label>Prénom :</label>
        <input
          v-if="mode == 'saved'"
          class="input--disabled"
          type="text"
          id="prenom"
          name="Prenom"
          v-model="prenom"
          disabled
        />
        <input
          v-else
          class="input--enabled"
          type="text"
          id="prenom"
          name="Prenom"
          v-model="prenom"
          required
        />
        <label>Poste occupé :</label>
        <input
          v-if="mode == 'saved'"
          class="input--disabled"
          type="text"
          id="poste"
          name="Poste"
          v-model="poste"
          disabled
        />
        <input
          v-else
          class="input--enabled"
          type="text"
          id="poste"
          name="Poste"
          v-model="poste"
          required
        />
        <label>Email :</label>
        <input
          v-if="mode == 'saved'"
          class="input--disabled"
          type="text"
          id="email"
          name="Email"
          v-model="email"
          disabled
        />
        <input
          v-else
          class="input--enabled"
          type="text"
          id="email"
          name="Email"
          v-model="email"
          required
        />
        <!--<label>Mot de passe :</label>
        <input
          v-if="mode == 'saved'"
          class="input--disabled"
          type="passsword"
          id="password"
          name="password"
          disabled
        />
        <input
          v-else
          class="input--enabled"
          type="passsword"
          id="password"
          name="password"
          required
        />-->
        <button
          v-if="mode == 'saved'"
          class="submit"
          @click.prevent="switchToModifyAccount()"
        >
          Modifier mon compte
        </button>
        <button v-else class="submit" @click.prevent="saveAccount()">
          Enregistrer
        </button>
      </form>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import router from "../router/index";
import axios from "axios";

export default {
  beforeCreate() {
    if (!sessionStorage.loggedIn) {
      router.push("Login");
    } else {
      axios
        .get(
          "http://localhost:3000/api/employees/" + this.$store.state.userId,
          {}
        )
        .then((res) => {
          this.$store.commit("updateUserInfo", res.data);
        });
    }
  },
  name: "SocialGroup",
  components: {},

  data() {
    return {
      id: this.$store.state.userId,
      email: this.$store.state.userMail,
      password: this.$store.state.userPassword,
      poste: this.$store.state.userJob,
      nom: this.$store.state.userLastName,
      prenom: this.$store.state.userFirstName,
      fileImg: {},
      image: this.$store.state.userImg,
      mode: "saved",
    };
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
      this.image = null;
      this.fileImg = null;
    },
    switchToModifyAccount() {
      this.mode = "modify";
    },
    saveAccount() {
      const formData = new FormData();
      formData.append(
        "employee",
        JSON.stringify({
          nom: this.nom,
          prenom: this.prenom,
          poste: this.poste,
          email: this.email,
          id: this.$store.state.userId,
          urlImg: this.$store.state.userImg,
        })
      );
      formData.append("image", this.fileImg);

      axios
        .put(
          "http://localhost:3000/api/employees/" + this.$store.state.userId,
          formData
        )
        .then(res => {
          console.log(res.data);
          this.$store.commit("updateUserInfo", res.data);
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
.userImg {
  display: grid;
  justify-content: center;
}
.userinfo {
  padding-top: 40px;
  display: flex;
  justify-content: center;
}
.input--disabled {
  margin-bottom: 40px;
  background: lightgrey;
}
.input--enabled {
  margin-bottom: 40px;
}
.form_userinfo {
  display: grid;
  justify-content: center;
}
</style>
