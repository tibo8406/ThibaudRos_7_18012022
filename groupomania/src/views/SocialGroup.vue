<template>
  <div class="Socialgroup">
    <div class="headerSocial">
      <span><i  v-on:click="showUserAccount()" class="fa fa-solid fa-user"></i></span>
      <span><i class="fa fa-solid fa-door-open"></i></span>
      <!--<button v-on:click="showUserAccount()" class="submit">
        Mon compte utilisateur
      </button>-->
    </div>
     Bienvenue <b>{{ $store.getters.completeUserName }}</b>
    <Post />
    <div class="wall">
      <div class="post" v-for="i in posts" :key="i.id">
        <div class="post_user">
          <div class="post_user_pic">
            <img :src="i.userImg" />
          </div>
          <div class="post_user_info">
            <div class="post_user_info_name">
              {{ i.nom_auteur }} {{ i.prenom_auteur }}
            </div>
            <div class="post_user_info_job">{{ i.poste_auteur }}</div>
          </div>
        </div>
        <div class="post_content">
          <div class="post_content_text">
            {{ i.messages }}
          </div>
          <div class="post_content_media">
            <img :src="i.urlMedia" />
          </div>
        </div>
        <div class="reactions">
          <div class="reactions_nblikes">
            <i class="far fa-thumbs-up"></i> 11
          </div>
          <div class="reactions_nbcomments">5 Commentaires</div>
        </div>
        <div class="actions">
          <div class="actions_like">
            <i class="far fa-thumbs-up"></i> J'aime !
          </div>
          <div class="actions_comment">
            <i class="far fa-comment"> Commenter</i>
          </div>
        </div>
        <div class="content_comments">
          <div class="post_user">
            <div class="post_user_pic">
              <img src="userImg" />
            </div>
            <div class="post_user_info">
              <div class="post_user_info_name">Thibaud Ros</div>
              <div class="post_user_info_job">Developpeur Web</div>
            </div>
          </div>
          <div class="post_content">
            <div class="post_content_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              non ultrices ligula. Nullam augue magna, bibendum sed nisl eget,
              suscipit blandit tortor. Cras ut dolor vitae felis auctor
              tristique. Praesent. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Curabitur non ultrices ligula. Nullam augue
              magna, bibendum sed nisl eget, suscipit blandit tortor. Cras ut
              dolor vitae felis auctor tristique. Praesent.
            </div>
          </div>
        </div>
        <div class="comment">
          <div class="comment_user_pic"><img src="userImg" /></div>
          <div class="comment_action"><input type="text" /></div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import router from "../router/index";
import axios from "axios";

export default {
  name: "SocialGroup",
  components: {
    Post,
  },
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
  data() {
    return {
      posts: { type: Array },
    };
  },
  methods: {
    showUserAccount() {
      router.push("useraccount");
    },
  },
  created: function () {
    console.log(this.$store.state.userToken);

    axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          Authorization: "Bearer " + this.$store.state.userToken,
        },
      })
      .then((res) => {
        const rep = res.data;
        this.posts = rep;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">

.fa {
  font-size: 50px;
  color: rgb(252, 46, 7, 0.5);
  &:hover{
    cursor: pointer;
    color:rgb(252, 46, 7, 1) ;
  }
}
.headerSocial{
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
}
.post {
  display: block;
  border-radius: 5px;
  background-color: white;
  margin-top: 20px;
  max-width: 500px;
  box-shadow: 0.5px 0.5px 5px 0px silver;
  &_content {
    margin-top: 15px;
    margin-bottom: 15px;
    &_media {
      border-top: 1px solid silver;
      img {
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
      }
    }
    &_text {
      text-align: left;
      width: fit-content;
      border-left: rgb(252, 46, 7, 0.5);
      border-left: 2px solid gray;
      margin-left: 30px;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
      max-height: fit-content;
      margin-bottom: 25px;
    }
  }
  &_user {
    display: inline-flex;
    min-width: fit-content;
    padding-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
    height: 50px;
    &_info {
      display: block;
      padding-left: 15px;
      text-transform: capitalize;
      &_name {
        height: 25px;
        line-height: 25px;
        text-align: left;
        font-weight: bold;
        color: black;
        font-size: 18px;
      }
      &_job {
        height: 25px;
        line-height: 25px;
        text-align: left;
        font-size: 15px;
      }
    }
    &_pic {
      max-width: 50px;
      max-height: 50px;
      img {
        border-radius: 25px;
      }
    }
  }

  .reactions {
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .actions {
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
    height: 45px;
    display: flex;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 10px;
    &_like {
      border-radius: 10px;
      width: 50%;
      margin: 4px;
      height: 37px;
      line-height: 37px;
      text-align: center;
      &:hover {
        cursor: pointer;
        background: rgba($color: silver, $alpha: 0.25);
        color: grey;
      }
    }
    &_comment {
      height: 37px;
      line-height: 37px;
      text-align: center;
      border-radius: 10px;
      width: 50%;
      margin: 4px;
      &:hover {
        cursor: pointer;
        background: rgba($color: silver, $alpha: 0.25);
        color: grey;
      }
    }
  }
  .fa-comment,
  .fa-thumbs-up {
    font-size: 20px;
  }
  .content_comments {
    display: grid;
    font-size: 12px;
    .post_user_pic {
      max-height: 30px;
      max-width: 30px;
    }
    .post_user_info_name {
      height: 15px;
      line-height: 15px;
      text-align: left;
      font-size: 14px;
    }
    .post_user_info_job {
      font-size: 13px;
      height: 15px;
      line-height: 15px;
      text-align: left;
    }
    .post_content {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    .post_content_text {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
}
.comment {
  height: 30px;
  display: inline-flex;
  padding: 0px 15px 15px 15px;
  min-width: fit-content;
  &_user_pic {
    margin-right: 15px;
    max-width: 6%;
    img {
      border-radius: 20px;
    }
  }
  &_action {
    width: auto;
    input {
      background: rgba($color: silver, $alpha: 0.25);
      min-width: 100%;
      border: none;
      height: 30px;
      color: grey;
      &:focus {
        background: rgba($color: silver, $alpha: 0.25);
        border: 1px solid grey;
      }
    }
  }
}
</style>
