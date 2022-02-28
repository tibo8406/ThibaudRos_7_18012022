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
    <div class="wall">
      <div class="post" v-for="i in posts" :key="i.id">
        <div class="post_user">
          <div class="post_user_pic">
            <img :src="i.createur.urlImg" />
          </div>
          <div class="post_user_info">
            <div class="post_user_info_name">
              {{ i.createur.prenom }} {{ i.createur.nom }}
            </div>
            <div class="post_user_info_job">{{ i.createur.poste }}</div>
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
          <div class="actions_like" @click="likeOnePost(i.id)">
            <i class="far fa-thumbs-up"></i> J'aime !
          </div>
          <div class="actions_comment" @click="clickOnComment(i.id)">
            <i class="far fa-comment"> Commenter</i>
          </div>
        </div>
        <div
          class="content_comments"
          v-for="comment in i.comments"
          :key="comment.id"
        >
          <div class="post_user">
            <div class="post_user_pic">
              <img :src="comment.createur.urlImg" />
            </div>
            <div class="post_user_info">
              <div class="post_user_info_name">
                {{ comment.createur.prenom }} {{ comment.createur.nom }}
              </div>
              <div class="post_user_info_job">{{ comment.createur.poste }}</div>
            </div>
          </div>
          <div class="post_content">
            <div class="post_content_text">
              {{ comment.comment }}
            </div>
          </div>
        </div>
        <div class="comment">
          <div class="comment_user_pic"><img :src="i.createur.urlImg" /></div>
          <div class="comment_action">
            <textarea
              name="comment"
              cols="1"
              rows="1"
              :id="textarea[i.id]"
              placeholder=" ... votre commentaire"
              v-model="textarea[i.id]"
              @keyup.enter="postComment(i.id)"
            ></textarea>
          </div>
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
    /*clickOnComment(id) {
      const el ="textarea"+id;
      console.log(el);
      document.getElementById(el).focus();
    },*/
    postComment(id) {
      axios
        .post(
          "http://localhost:3000/api/posts/" + id + "/comment",
          { message: this.textarea[id] },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.userToken,
            },
          }
        )
        .then(() => {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    likeOnePost(id) {
      axios
        .post(
          "http://localhost:3000/api/posts/" + id + "/like",
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.userToken,
            },
          }
        )
        .then(() => {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
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
        console.log(this.posts);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
/*axios
          .get("http://localhost:"+process.env.BDD_PORT+"/api/posts/comment/", {
            headers: {
              Authorization: "Bearer " + this.$store.state.userToken,
            },
          })
          .then((res) => {
            const rep = res.data;
            this.comments = rep;
            console.log(rep);
          })
          .catch(function (error) {
            console.log(error);
          });*/
</script>

<style lang="scss">
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
}
.post {
  display: block;
  border-radius: 5px;
  background-color: white;
  margin-top: 20px;
  max-width: 500px;

  width: 90%;
  box-shadow: 0.5px 0.5px 5px 0px silver;
  &_content {
    margin-top: 15px;
    margin-bottom: 15px;
    &_media {
      border-top: 1px solid silver;
      img {
        min-width: 100%;
        min-height: 100%;
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
    display: flex;
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
      display: table-cell;
      vertical-align: middle;
      padding-top: 1.5px;
      img {
        border: 2px solid rgb(252, 46, 7, 0.5);
        border-radius: 25px;
        width: 45px;
        height: 45px;
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
    .post_user {
      height: 40px;
      &_pic {
        img {
          border: 2px solid lightgray;
          height: 25px;
          width: 25px;
        }
      }
      &_info_name {
        height: 15px;
        line-height: 15px;
        text-align: left;
        font-size: 14px;
      }
      &_info_job {
        font-size: 13px;
        height: 15px;
        line-height: 15px;
        text-align: left;
      }
    }
    .post_content {
      margin-top: 0px;
      margin-bottom: 0px;
      &_text {
        margin-left: 50px;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-bottom: 0px;
        border: none;
        background: rgba(192, 192, 192, 0.15);
        border-radius: 5px;
      }
    }
  }
}
.comment {
  height: 30px;
  display: flex;
  padding: 15px 15px 15px 15px;
  &_user_pic {
    margin-right: 15px;
    img {
      border: 2px solid lightgray;
      height: 25px;
      width: 25px;
      border-radius: 20px;
    }
  }
  &_action {
    width: 100%;
    textarea {
      width: auto;
      border-radius: 8px;
      -webkit-transition: 0.5s;
      outline: none;
      transition: 0.5s;
      height: 23px;
      background: rgba($color: silver, $alpha: 0.25);
      width: 100%;
      color: grey;
      border: none;
      &:focus {
        background: rgba($color: silver, $alpha: 0.25);
        border: 1px solid lightgray;
      }
    }
  }
}
</style>
