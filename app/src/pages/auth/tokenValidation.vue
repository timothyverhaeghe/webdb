<template>
  <div class="h-screen flex flex-row">
    <div class="sm:hidden md:block md:w-10/12  bg-white h-screen relative overflow-hidden bg-no-repeat bg-center bg-cover"  :style="'background-image: url('+bg+');'">
      <div class="mt-20 absolute top-0 w-full flex flex-row items-center justify-center">
        <!-- <img src="" alt="" class="w-56"> -->
      </div>
    </div>
    <div class="w-2/12 sm:w-full md:w-8/12 bg-white h-screen flex flex-col items-center justify-between py-20">
      <div class="w-8/12 flex flex-row items-center justify-start">
      </div>
      <div class="w-8/12">
        <h2 class="lg:text-5xl tracking-tighter font-semibold sm:text-4xl">WebDatabase.io</h2>
        <p class="text-gray-600 mt-1">The most easy-to-use online database.</p>

          <div class="mt-14">
            Loading...
          </div>

          <div class="relative py-3">
            <p v-if="error" class="absolute text-red-500 mt-5 font-medium text-sm outline-none">{{error}}</p>
          </div>
      </div>
      <div class="w-8/12">
        <a href="https://webfaster.com" class="text-gray-400 text-sm">&#169; 2021 - WebFaster.com </a>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/helpers/auth';
import axios from 'axios';
import env from '@/../env';


export default {
  name: 'login',
  data() {
    return {
      bg: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      error: false
    }
  },
  methods: {
  },
  async mounted() {
    //alert(this.$route.params.token);

    console.log('URL:', '/users/me/tokens/'+this.$route.params.token)

    const _self = this;
    axios.get(`${env.apiURL}/users/me/tokens/${this.$route.params.token}`).then((response) => {
      const session = response.data;
      console.log('session:', session)
      if(session && session.session){
        console.log('Session Id:', session.session)
        auth.cookies.set('session', session.session);
        document.location.href = '/';
      } else {
        alert('Incorrect or expired token. Please try again.')
        _self.$router.push({
          path: '/token'
        })
      }
    })
      .catch(() => {
        alert('Something unexpected happened. Please try again.');
      });
  },
  created() {
  },
}
</script>
