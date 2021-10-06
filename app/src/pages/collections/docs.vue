<template>
  <div v-if="pageloaded" class="w-full flex flex-col bg-gray-50 mt-16" style="min-height: 95vh;">



    <div  class="w-full bg-white h-16 border-b flex flex-row px-10 fixed">
      <div @click="$router.back()" class="flex flex-row items-center justify-center w-14">
        <icon class="h-6 w-6 cursor-pointer" type="feather-chevron-left" />
      </div>
      <div @click="$router.back()" class="flex flex-col my-auto select-none cursor-pointer">
        <div class="capitalize">{{collection.name}}</div>
        <p class="text-xs text-gray-500">
          {{collection.desc}} &middot; <span class="text-xs text-blue-600">300 records</span>
           <span v-if="false">&middot; <span class="text-xs text-blue-600">xxx </span></span>
        </p>
      </div>
    </div>


    <!--

    TODO: clone code for Python, Axios, NPM?
    Test online
    More information such as all the fieldset
    Switch between collections

    Automatically do a softdelete?
    OPen in postman, open in innsomnia

    -->

    <div class="mt-20 mb-20 flex flex-row">

      <div class="w-1/12">

      </div>

      <div>

      <!-- POST -->
      <div class="mt-2">
        <div class="text-xl">1. Insert/create new record</div>
        <div class="text-gray-400">Use this information if you want to create or add new records to your database.</div>
        <div class="mt-2 flex flex-row">
          <div class="mr-1 my-1 bg-green-600 px-4 py-2 rounded text-white">POST</div>
          <div class="m-1 bg-gray-800 text-white px-4 py-2 rounded text-white">{{env.rapiURL}}/{{collection._id}}</div>
        </div>
        <div class="text-gray mt-2 text-sm">
          Do a post call to this URL with the JSON payload representing your object or record.<br/>
          We will only safe the fields that we recognise & we will apply all validation as configured.
        </div>
      </div>


      <!-- Find records -->
      <div class="mt-8">
        <div class="text-xl">2. Find records</div>
        <div class="text-gray-400">Use this information if you want to find specific records from your database.</div>
        <div class="mt-2 flex flex-row">
          <div class="mr-1 my-1 bg-green-600 px-4 py-2 rounded text-white">GET</div>
          <div class="m-1 bg-gray-800 text-white px-4 py-2 rounded text-white">{{env.rapiURL}}/{{collection._id}}</div>
        </div>
        <div class="text-gray mt-2 text-sm">
          Do a get call to URL with either way a JSON body or url parameters representing the object you want to search.<br/>
          You can add URL parameter <code class="bg-gray-800 text-white px-1 py-0.5 rounded text-xs">limit</code> and <code class="bg-gray-800 text-white px-1 py-0.5 rounded text-xs">skip</code> in order to do pagination.<br/>
          You can use <code class="bg-gray-800 text-white px-1 py-0.5 rounded text-xs">sort</code> in order to sort on a specific field.<br/>
          An example URL can be: {{env.rapiURL}}/{{collection._id}}?sort=createdAt&limit=10&name=test
        </div>
      </div>

      <!-- Detail record -->
      <div class="mt-8">
        <div class="text-xl">3. Get specific record</div>
        <div class="text-gray-400">Use this information if you want to receive the data from a specific records from your database.</div>
        <div class="mt-2 flex flex-row">
          <div class="mr-1 my-1 bg-green-600 px-4 py-2 rounded text-white">GET</div>
          <div class="m-1 bg-gray-800 text-white px-4 py-2 rounded text-white">{{env.rapiURL}}/{{collection._id}}/:record-id</div>
        </div>
        <div class="text-gray mt-2 text-sm">
        </div>
      </div>


      <!-- update record -->
      <div class="mt-8">
        <div class="text-xl">4. Update a record</div>
        <div class="text-gray-400">Use this information if you want to update a specific record from your database.</div>
        <div class="mt-2 flex flex-row">
          <div class="mr-1 my-1 bg-yellow-600 px-4 py-2 rounded text-white">PUT</div>
          <div class="m-1 bg-gray-800 text-white px-4 py-2 rounded text-white">{{env.rapiURL}}/{{collection._id}}/:record-id</div>
        </div>
        <div class="text-gray mt-2 text-sm">
          Do a post call to this URL with the JSON payload representing the object or record as how you want it to be updated.<br/>
          We will only safe the fields that we recognise & we will apply all validation as configured.
        </div>
      </div>


      <!-- Delete record -->
      <div class="mt-8">
        <div class="text-xl">5. Delete a record</div>
        <div class="text-gray-400">Use this information if you want to delete a specific record from your database.</div>
        <div class="mt-2 flex flex-row">
          <div class="mr-1 my-1 bg-red-600 px-4 py-2 rounded text-white">DELETE</div>
          <div class="m-1 bg-gray-800 text-white px-4 py-2 rounded text-white">{{env.rapiURL}}/{{collection._id}}/:record-id</div>
        </div>
        <div class="text-gray mt-2 text-sm">
          Perform a delete call to URL with the right id representing your object or record.<br/>
          We will hard delete this record from your database and it will not appear in search results anymore.
        </div>
      </div>

    </div>

    </div>

    </div>
</template>


<script>
import auth from '@/helpers/auth';
import API from '@/helpers/api'
import env from '@/../env';

export default {
  name: 'Dashboard',
  data() {
    return {
      user: {},
      url: '',
      env,
      pageloaded: false,
      collection: {},
      header: false,
    }
  },
  methods: {
  },
  async mounted() {
    //const _self = this;

    // Test to login a user
    this.user = await auth.me().catch(function(e){
      console.log('NOT LOGGEDIN', e)
    });


    var collection = await API.get('/collections/'+this.$route.params.id);
    this.collection = collection;

    this.pageloaded = true;

  }
}
</script>

<style>

</style>
