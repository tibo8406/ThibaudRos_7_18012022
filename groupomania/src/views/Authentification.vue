<template>
    <router-view></router-view>
</template>

<style lang="scss">
.form_ {
  display: block;
  max-width: 500px;
  border-radius: 15px;
  margin: auto;
  margin-top: 40px;
  padding: 25px;
  border: 2px solid #fcb7a6;
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
input {
  display: grid;
  box-sizing: border-box;
  outline: none;
  color: #595959;
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
    border: 1px solid #ff2a00;
    background-color: #fcb7a6;
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
