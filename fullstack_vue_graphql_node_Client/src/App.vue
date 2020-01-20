<template>
  <div>
    <div id="Slogan" class="text-center">
      <h1>NameGator</h1>
      <br/>
      <h6 class="text-secondary"> Gerador de nomes utilizando vuejs, graphql e node </h6>
    </div>
    <div id="main">
      <Domainlist></Domainlist>
    </div>
  </div>
</template>

<script>

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import Domainlist from "./components/Domainlist.vue";

export default {
	name: "app",
	components: {
		Domainlist
	}
};
</script>

<style>
#Slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}

#main{
  background-color: rgb(241, 178, 178);
  padding-top: 30px;
  padding-bottom: 30px;
}

</style>
