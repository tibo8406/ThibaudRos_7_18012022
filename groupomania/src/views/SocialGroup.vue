<template>
  <div class="Socialgroup">
    <div class="headerSocial">
      <span
        ><i @click="showUserAccount()" class="fa fa-solid fa-user"></i
      ></span>
      <span><i @click="logOut()" class="fa fa-solid fa-door-open"></i></span>
    </div>
    Bienvenue <b>{{ $store.getters.completeUserName }}</b>
    <Post />
    <postView :posts="posts" />
  </div>
</template>

<script>
import Post from '../components/Post.vue';
import postView from '../components/postView.vue';

import router from "../router/index";
import axios from "axios";

export default {
  name: "SocialGroup",
  components: {
    Post,
    postView,
  },
  beforeCreate() {
    if (sessionStorage.loggedIn != "OnLine") {
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
  data() {
    return {
      posts: [],
      comments: [],
      textarea: [],
    };
  },
  methods: {
    showUserAccount() {
      router.push("useraccount");
    },
    logOut() {
      this.$store.commit("logOutUser", {
        id: null,
        token: null,
        poste: null,
        nom: null,
        prenom: null,
        email: null,
        password: null,
        urlImg: null,
      });
      sessionStorage.loggedIn = "OffLine";
      router.push("Login");
    },
  },
  created: function () {
    axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          Authorization: "Bearer " + this.$store.state.userToken,
        },
      })
      .then((res) => {
        this.posts = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
body{
margin: 0;
}
.fa {
  font-size: 50px;
  color: rgb(252, 46, 7, 0.5);
  &:hover {
    cursor: pointer;
    color: rgb(252, 46, 7, 1);
  }
}
.headerSocial {
  padding-bottom: 20px;
  max-width: 500px;
  display: flex;
  justify-content: space-evenly;
  margin: auto;
}
.wall {
  padding-top: 60px;
  display: grid;
  justify-items: center;
  background-color: rgb(252, 228, 228, 0.3);
  min-height: 92vh;
    padding-bottom: 45px;

}


</style>
