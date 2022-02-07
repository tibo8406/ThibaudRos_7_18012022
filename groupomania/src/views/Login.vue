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
      <div class="">
        <button
          class="submit"
          :class="{ 'submit--disabled': !validatedFields }"
          v-on:click="login()"
        >
          Se connecter
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import router from "../router/index";
import axios from "axios";

export default {
  beforeCreate() {
    console.log(sessionStorage);
    if (sessionStorage.loggedIn) {
      router.push("SocialGroup");
    }
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    validatedFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    login() {
      event.preventDefault();
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.$store.commit("createUserInfo", {
            id: res.data.id,
            token: res.data.token,
          });
          window.sessionStorage.setItem("loggedIn", true);
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
.submit--disabled {
  margin: auto auto 10px auto;
  width: 65%;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 15px;
  font-size: 20px;
  text-transform: uppercase;
  border: 0px;
  font-weight: bold;
  cursor: not-allowed;
  pointer-events: none;
  text-decoration: none;
  color: #c0c0c0;
}
</style>
