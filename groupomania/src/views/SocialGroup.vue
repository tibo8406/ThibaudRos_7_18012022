<template>
  <div id="entete">
    <img alt="Logo Groupomania" src="../assets/icon-left-font.png" />
<i class="fas fa-user" alt="Icone compte utilisateur"></i>

      <router-view></router-view>
  </div>

</template>

<script>
// @ is an alias to /src
</script>

<style lang="scss">

#entete {
    padding: 10px 40px 10px 40px;
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(252,228,228,0.7);
box-shadow: 0 10px 20px -1px #fcf2f1;
    width: auto;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  justify-items: center;
}
.fas{
    font-size: 50px;
    color: rgb(252,46,7,0.5);
}

</style>
