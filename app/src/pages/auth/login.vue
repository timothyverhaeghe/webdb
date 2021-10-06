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

          <div v-if="!mail_sent">
            <input type="text" class="px-4 text-sm py-3 border border-gray-300 w-full rounded-lg mt-10" placeholder="Your mail" v-model="input.email">
            <button @click="login()" class="w-full px-3 mt-8 bg-black text-white py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200">Continue</button>
            <div class="text-xs mt-3 text-gray-400">
              We'll send you an email with a link which you can use to enter your account.
            </div>
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

  export default {
    name: 'login',
    data() {
      return {
        bg: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        error: false,
        error_animation: false,
        mail_sent: false,
        input: {
          email: ""
        }
      }
    },
    methods: {
      async login() {
        const user = await auth.login(this.input.email);

        // Check if the user is set (which should, otherwise we should have an error)
        if(user && user.success){
          //alert('Mail is on its way');
          this.$router.push({'path': '/token'})

        } else {
          this.error = user.error;
          this.error_animation = true;
          setTimeout(() =>{
            this.error_animation = false;
          }, 2000);
        }

      },
    },
    async mounted() {
      this.user = await auth.me().catch(() => {});
      console.log(this.user);
      if (this.user && this.user._id) {
        console.log("Already loggedin... you can't do this twice");
        //this.$store.commit('setUser', this.user);
        this.$router.replace({ path: "/" });
      }
    },
    created() {
      window.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
          this.login();
        }
      });
    },
  }
</script>
