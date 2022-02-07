<template>
  <div class="UserAccount">
    <h1>Mon compte utilisateur</h1>
    <div class="userinfo">
      <form>
        <label>Nom :</label>
        <input
          type="text"
          id="nom"
          name="Nom"
          v-model="nom"
          required
          label="Nom"
        />
        <label>Prénom :</label>
        <input
          type="text"
          id="prenom"
          name="Prenom"
          v-model="prenom"
          required
        />
        <label>Poste occupé :</label>
        <input type="text" id="poste" name="Poste" v-model="poste" required />
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
          console.log(res.data);
          this.$store.state.userLastName = res.data.nom;
          this.$store.state.userFirstName = res.data.prenom;
          this.$store.state.userJob = res.data.poste;
        });
    }
  },
  name: "SocialGroup",
  components: {},
  
  data() {
    console.log(this.$store.state.userJob);
    return {
      email: this.$store.state.userMail,
      password: "",
      poste: this.$store.state.userJob,
      nom: this.$store.state.userLastName,
      prenom: this.$store.state.userFirstName,
    };
  },
};
</script>

<style lang="scss">
.userinfo {
  padding-top: 40px;
  display: flex;
  justify-content: center;
}
input {
  margin-bottom: 40px;
}
</style>
