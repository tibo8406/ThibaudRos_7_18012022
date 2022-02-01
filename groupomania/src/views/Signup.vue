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
          v-model="nom"
          required
        />
        <input
          type="text"
          id="prenom"
          name="prenom"
          placeholder="Prenom"
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
          ><button v-on:click="signup()" class="submit">S'inscrire</button></a
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
    return {
      email: "",
      password: "",
      nom: "",
      prenom: "",
      poste: "",
    };
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
        .then(function (response) {
          router.push("/SocialGroup");
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
  //border: 2px solid #fcb7a6;
  box-shadow: #fcb7a6;
}
.form_option {
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  li a {
    border: 1px solid #fc2e07;
    font-weight: bold;
    display: grid;
    text-decoration: none;
    color: #fc846c;
    font-size: 1.1rem;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: 0.5s ease;
    &:hover {
      background: #fc846c;
      color: white;
    }
  }
  .active a {
    background: rgb(252, 46, 7);
    color: white;
  }
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
    background-color: #fcb7a6;
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
