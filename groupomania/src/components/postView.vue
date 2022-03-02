<template>
  <div class="wall">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post_user">
        <div class="post_user_pic"><img :src="post.createur.urlImg" /></div>
        <div class="post_user_info">
          <div class="post_user_info_name">
            {{ post.createur.prenom }} {{ post.createur.nom }}
          </div>
          <div class="post_user_info_job">{{ post.createur.poste }}</div>
        </div>
      </div>
      <div class="post_content">
        <div class="post_content_text">{{ post.messages }}</div>
        <div class="post_content_media"><img :src="post.urlMedia" /></div>
      </div>
      <commentPost :comment="post.comments" />
      <div class="comment">
        <div class="comment_user_pic">
          <img :src="$store.state.userImg" />
        </div>
        <div class="comment_action">
          <textarea
            v-model="textarea[post.id]"
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
        textarea:[],
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
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created: function () {
      console.log(this.$store.state);
  },

};
</script>
