<template>
  <div class="content_comments">
    <div class="content_comments" v-for="c in comment" :key="c.id">
      <div class="post_user">
        <div class="post_user_pic"><img :src="c.createur.urlImg" /></div>
        <div class="post_user_info">
          <div class="post_user_info_name">
            {{ c.createur.nom }} {{ c.createur.prenom }}
          </div>
          <div class="post_user_info_job">{{ c.createur.poste }}</div>
        </div>
      </div>
      <div class="post_content">
        <div class="post_content_text">{{ c.comment }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["comment"],
  name: "commentPost",
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
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created: function () {
    console.log(this.comment);
  },
};
</script>
<style></style>
