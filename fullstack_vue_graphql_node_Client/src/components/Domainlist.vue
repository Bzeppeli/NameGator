<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <item-list
              title="Prefixos"
              v-bind:items="prefixos"
              v-on:addItem="addPrefixo"
              v-on:deleteItem="deletePrefixo"
            ></item-list>
          </div>
          <div class="col-md">
            <item-list
              title="Sufixos"
              v-bind:items="sufixos"
              v-on:addItem="addSufixo"
              v-on:deleteItem="deleteSufixo"
            ></item-list>
          </div>
        </div>
        <br />
        <h5>
          Domínios
          <span class="badge badge-info">{{ dominios.length }}</span>
        </h5>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item" v-for="dominio in dominios" v-bind:key="dominio.name">
                <div class="row">
                  <div class="col-md">{{ dominio.name }}</div>
                  <div class="col-md text-right">
                    <a class="btn btn-info" v-bind:href="dominio.checkout" target="_blank">
                      <span class="fa fa-shopping-cart"></span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import axios from "axios/dist/axios";

import itemList from "./item-list.vue";

export default {
	name: "app",
	components: {
		itemList
	},
	data: function() {
		return {
			prefixo: "",
			sufixo: "",
			prefixos: [],
			sufixos: []
		};
	},
	methods: {
		addSufixo(sufixo) {
			this.sufixos.push(sufixo);
		},

		addPrefixo(prefixo) {
			this.prefixos.push(prefixo);
		},

		deletePrefixo(prefixo) {
			this.prefixos.splice(this.prefixos.indexOf(prefixo), 1);
		},

		deleteSufixo(sufixo) {
			this.sufixos.splice(this.sufixos.indexOf(sufixo), 1);
		}
	},

	computed: {
		dominios() {
			const dominios = [];
			for (const prefixo of this.prefixos) {
				for (const sufixo of this.sufixos) {
					const name = prefixo + sufixo;
					const url = name.toLowerCase();
					const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com`;
					dominios.push({
						name,
						checkout
					});
				}
			}
			return dominios;
		}
	},
	created(){
		console.log("created");
		axios({
			url: "http://localhost:4000",
			method: "post",
			data: {
				query: `
            {
              prefixos {
                id
                type
                description
              }
              sufixos {
                id
                description
              }
            }
        `
			}
		}).then(response => {
			const query = response.data;
			this.prefixos = query.data.prefixos.map(prefixo => prefixo.description);
			this.sufixos = query.data.sufixos.map(sufixo => sufixo.description);
		});
	}
};
</script>

<style>
</style>
