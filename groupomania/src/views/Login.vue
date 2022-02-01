<template>
  <div class="form_">
    <div class="form_option">
      <li class="option"><router-link to="signup">S'inscrire</router-link></li>
      <li class="option active">
        <router-link to="login">Se connecter</router-link>
      </li>
    </div>
    <div class="form_title">
      <h1>Connexion</h1>
    </div>
    <form>
      <div class="ligne1champs">
        <input
          type="text"
          id="email"
          name="Email"
          placeholder="Email"
          v-model="email"
          required
        />
      </div>
      <div class="ligne1champs">
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          v-model="password"
          required
        />
      </div>
      <div class="forgot">
        <a href="/forgot">Mot de passe oublié ?</a>
      </div>
      <div class="button">
        <a href="#"
          ><button class="submit" v-on:click="login()">Se connecter</button></a
        >
      </div>
    </form>
  </div>
</template>

<script>
import router from '../router/index'
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.email + this.password);
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          router.push('/SocialGroup');
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
