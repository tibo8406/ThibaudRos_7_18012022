<template>
  <div class="wall">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post_user">
        <div class="post_user_pic">
          <img
            :src="post.createur.urlImg"
            :alt='"Photo de profil de "+post.createur.prenom+" "+post.createur.nom'
          />
        </div>
        <div class="post_user_info">
          <div class="post_user_info_name">
            {{ post.createur.prenom }} {{ post.createur.nom }}
          </div>
          <div class="post_user_info_job">{{ post.createur.poste }}</div>
        </div>
      </div>
      <div class="post_content">
        <div class="post_content_text">{{ post.messages }}</div>
        <div class="post_content_media" v-if="post.urlMedia!=null" >
          <img :src="post.urlMedia" title="" :alt='"Photo du post N° "+post.id'/>
        </div>
      </div>
      <commentPost :comment="post.comments" />
      <div class="comment">
        <div class="comment_user_pic">
          <img :src="$store.state.userImg" alt="Votre photo de profil" />
        </div>
        <div class="comment_action">
          <textarea
            v-model="textarea[post.id]"
            title="Ecrire ici votre commentaire"
            placeholder=" ... votre commentaire"
            @keyup.enter="postComment(post.id)"
          >
          </textarea>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
import commentPost from "./commentPost.vue";

import axios from "axios";

export default {
  props: ["posts"],
  name: "postView",
  components: {
    commentPost,
  },
  data() {
    return {
      textarea: [],
    };
  },
  methods: {
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
.post {
  display: block;
  border-radius: 5px;
  background-color: white;
  margin-top: 20px;
  max-width: 500px;
  height: fit-content;
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
    height: fit-content;
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
        height: fit-content;
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
}
</style>
