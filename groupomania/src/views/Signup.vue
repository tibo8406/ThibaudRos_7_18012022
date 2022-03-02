<template>
  <div class="form_">
    <div class="form_option">
      <li class="option active">
        <router-link to="signup">S'inscrire</router-link>
      </li>
      <li class="option"><router-link to="login">Se connecter</router-link></li>
    </div>
    <div class="form_title">
      <h1>S'inscrire</h1>
    </div>
    <form>
      <div class="ligne2champs">
        <input
          type="text"
          id="nom"
          name="Nom"
          placeholder="Nom"
          title="Nom"
          v-model="nom"
          required
        />
        <input
          type="text"
          id="prenom"
          name="prenom"
          placeholder="Prenom"
          title="Prenom"
          v-model="prenom"
          required
        />
      </div>
      <div class="ligne1champs">
        <input
          type="text"
          id="poste"
          name="poste"
          placeholder="Poste"
          title="Poste"
          v-model="poste"
          required
        />
      </div>
      <div class="ligne1champs">
        <input
          type="text"
          id="email"
          name="Email"
          v-model="email"
          placeholder="Email"
          title="Email"
          required
        />
      </div>
      <div class="ligne1champs">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          title="mot de passe"
          v-model="password"
          required
        />
      </div>

      <div class="button">
        <button
          @click.prevent="signup()"
          class="submit"
          :class="{ 'submit--disabled': !validatedFields }"
        >
          S'inscrire
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import router from "../router/index";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      nom: "",
      prenom: "",
      poste: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (
        this.email != "" &&
        this.password != "" &&
        this.nom != "" &&
        this.prenom != "" &&
        this.poste != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    signup() {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          email: this.email,
          password: this.password,
          nom: this.nom,
          prenom: this.prenom,
          poste: this.poste,
        })
        .then(function () {
          router.push("SocialGroup");
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
img {
  width: 100%;
  max-width: 400px;
  justify-items: center;
}
#router-link {
  background: #fc2e07;
  color: white;
}
.form_ {
  background-color: rgba(252, 242, 241, 0.3);
  display: block;
  max-width: 500px;
  border-radius: 15px;
  margin: auto;
  margin-top: 40px;
  padding: 25px;
  box-shadow: #fcb7a6;
}

.option {
  active {
    font-size: 20px;
    color: rgb(252, 46, 7);
  }
}
.ligne1champs {
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr;
}
.ligne2champs {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  input {
    max-width: 45%;
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
