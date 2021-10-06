<template>
  <div v-html="html"/>
</template>
<script>
import axios from 'axios'

export default {
    name: 'icon',
    props: ['type'],
    data() {
      return {
        html: '',
      }
    },
    methods: {
    },
    mounted() {
      const _self = this;
      axios.get('https://icns.webfaster.com/icons/'+this.type+'.svg').then(function (response) {
        // handle success
        //console.log(response);
        _self.html = (response.data || '').split('#323232').join('currentColor');
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
}
</script>
<style>

</style>
