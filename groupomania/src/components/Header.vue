<template>
    <div id="header">
      <img alt="Logo Groupomania" src="../assets/icon-above-font.png" />
      <p>Bienvenue sur le réseau social de la société Groupamania</p>
    </div>
</template>

<script>

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
  display: block;
  max-width: 500px;
  border-radius: 15px;
  margin: auto;
  margin-top: 40px;
  padding: 25px;
  border: 2px solid #fcb7a6;
}
.form_option {
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  li a {
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
    background: #fc2e07;
    color: white;
  }
}
.option {
  active {
    font-size: 20px;
    color: red;
    background-color: chocolate;
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

.forgot {
  padding: 25px 5px 25px 5px;
  a {
    color: #fc2e07;
  }
}
.submit {
  margin: auto auto 10px auto;
  width: 65%;
  background-color: #fc2e07;
  border-radius: 5px;
  padding: 15px;
  font-size: 20px;
  text-transform: uppercase;
  border: 0px;
  font-weight: bold;
  a {
    text-decoration: none;
    color: #fcf2f1;
  }
}
</style>
