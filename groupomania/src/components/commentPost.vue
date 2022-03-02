<template>
  <div class="content_comments">
    <div class="content_comments" v-for="c in comment" :key="c.id">
      <div class="post_user">
        <div class="post_user_pic"><img :src="c.createur.urlImg" alt="Photo de profil d'un utilisateur"/></div>
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
};
</script>
<style lang="scss">
.comment{
  height: 30px;
  display: flex;
  padding: 15px 15px 15px 15px;
  margin-top: 35px;
  border-top: 1px solid lightgray;
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
      color: #595959;
      border: none;
      &:focus {
        background: rgba($color: silver, $alpha: 0.25);
        border: 1px solid lightgray;
      }
    }
  }
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
        color: #595959;
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
        color: #595959;
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
        padding-left: 10px;
        margin-bottom: 0px;
        border: none;
        background: rgba(192, 192, 192, 0.15);
        border-radius: 5px;
        max-width: 60%;
      }
    }
  }
</style>
