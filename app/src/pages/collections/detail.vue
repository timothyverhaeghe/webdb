<template>
  <div v-if="pageloaded" class="w-full flex flex-col bg-gray-50 mt-16" style="min-height: 95vh;">


    <!-- This example requires Tailwind CSS v2.0+ -->
    <div v-if="header && Object.keys(header)" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div @click="header = false" class="cursor-pointer fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 v-if="header._id" class="text-lg leading-6 font-medium text-gray-900">Update header</h3>
              <h3 v-else class="text-lg leading-6 font-medium text-gray-900">Add new header</h3>

              <p v-if="header._id" class="mt-2 text-sm text-gray-500">Update this header.</p>
              <p v-else class="mt-2 text-sm text-gray-500">Add a new header to your collection.</p>

            </div>

            <div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Header name</label>
                  <div class="mt-1">
                    <input placeholder="" type="text" v-model="header.name" name="field-name" class="border p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                  </div>
                  <p v-if="!header._id" class="mt-2 text-sm text-gray-500">How is this header presented. We save it as: {{idify(header.name)}}.</p>
                  <p v-else class="mt-2 text-sm text-gray-500">We won't update the id ({{header.id}}) of this header..</p>

                </div>


                <div class="mt-2">
                  <label for="email" class="block text-sm font-medium text-gray-700">Header type</label>
                  <div class="mt-1">
                    <select v-model="header.dataType" name="field-name" class="border p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                      <option value="string">Text/string</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="date">Date</option>
                      <option value="list" disabled>List</option>
                      <option value="mixed">Other/mixed</option>
                    </select>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">How do you represent this records.</p>
                </div>

                <!--
                Set options:
                Validations: Lower then, bigger then, contains, may not contain, ...
                Default value: if not set?
                possible options: xxx

                -->

            </div>
          </div>
          <div class="mt-5 flex flex-row">

            <button @click="header = false;" type="button" class="mr-2 w-full rounded-md px-4 py-2 bg-white  text-black border">Cancel</button>
            <button v-if="header._id" @click="saveHeader" type="button" class="mr-2 w-full rounded-md px-4 py-2 bg-indigo-600 text-white">Save</button>
            <button v-else @click="addHeader" type="button" class="w-full rounded-md px-4 py-2 bg-indigo-600 text-white">Add</button>

            <button v-if="header._id" @click="deleteHeader" type="button" class="w-full rounded-md px-4 py-2 bg-red-600 text-white">Delete</button>
          </div>
        </div>
      </div>
    </div>




    <div  class="w-full bg-white h-16 border-b flex flex-row px-10 fixed">
      <div @click="$router.back()" class="flex flex-row items-center justify-center w-14">
        <svg class="h-6 w-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </div>
      <div @click="$router.back()" class="flex flex-col my-auto select-none cursor-pointer">
        <div class="capitalize">{{collection.name}}</div>
        <p class="text-xs text-gray-500">
          {{collection.desc}} &middot; <span class="text-xs text-blue-600">{{totalRecords}} records</span>
           <span v-if="false">&middot; <span class="text-xs text-blue-600">xxx </span></span>
        </p>
      </div>

      <div class="ml-auto my-auto">
        <router-link :to="'/collections/'+collection._id+'/docs'" class="text-sm cursor-pointer">Documentation</router-link>
      </div>
    </div>



    <!-- Table itself -->
    <div class="mt-16">


    <div class="flex flex-row border-b">

      <div class="flex flex-col" style="min-width: 3%;">
        <div class="h-9 p-1 bg-gray-100 flex flex-row items-center justify-center border-r">

        </div>
        <div class="h-9 bg-gray-100 border-t flex flex-row items-center justify-center border-r" v-for="(record, index) in data" v-bind:key="'n_'+index">
          {{index+1}}
        </div>
        <div @click="addRecord" class="py-1.5 bg-gray-100 border-t flex flex-row items-center justify-center border-r cursor-pointer">
          +
        </div>
      </div>

      <div class="flex flex-col" style="min-width: 3%;">
        <div class="h-9 text-xs p-1 bg-gray-100 flex flex-row items-center justify-center border-r">
          _id
        </div>
        <div class="h-9 border-t text-xs p-2 flex flex-row items-center justify-center border-r" v-for="(record, index) in data" v-bind:key="'_id'+index">
          <div>{{record._id}}</div>
        </div>
        <div class=" border-t flex flex-row items-center justify-center border-r cursor-pointer"></div>

      </div>

      <div v-for="head in collection.headers" v-bind:key="head.name" class="flex flex-col" style="min-width: 3%;">
        <div @click="header = head" class="px-3 cursor-pointer h-9 p-1 bg-gray-100 flex flex-row items-center justify-center border-r text-xs">
          {{head.name}}
        </div>
        <div class="h-9 border-t flex flex-row items-center border-r" v-for="(record, index) in data" v-bind:key="head.id + '_'+index">

          <select v-if="head.dataType == 'boolean'" @change="saveRecord(record)" class="bg-gray-50 h-full p-2 text-xs w-full h-9 focus:outline-none" v-model="record[head.id]">
            <option :value="true">True</option>
            <option :value="false">False</option>
          </select>


          <input v-else-if="head.dataType == 'number'" type="number" @change="saveRecord(record)" class="bg-gray-50 h-full p-2 text-xs w-full h-9 focus:outline-none" v-model="record[head.id]">
          <input v-else type="text" @change="saveRecord(record)" class="bg-gray-50 h-full p-2 text-xs w-full h-9 focus:outline-none" v-model="record[head.id]">


        </div>
        <div class=" border-t flex flex-row items-center justify-center border-r cursor-pointer"></div>
      </div>


      <div class="flex flex-col h-9" style="min-width: 3%;">
        <div @click="header = { dataType: 'string'}" class="h-10 cursor-pointer border-b bg-gray-100 flex flex-row items-center justify-center border-r">
          +
        </div>
      </div>

    </div>


    </div>



    </div>
</template>


<script>
import auth from '@/helpers/auth';
import API from '@/helpers/api'
import RAPI from '@/helpers/rapi'
import env from '@/../env';

export default {
  name: 'Dashboard',
  data() {
    return {
      editField: false,
      data: [],
      user: {},
      pageloaded: false,
      collection: {},
      header: false,
      totalRecords: 0,
    }
  },
  methods: {
    addRecord: async function(){
      const data = await RAPI.post('/', {})
      this.totalRecords += 1
      this.data.push(data); // TODO: also create in mongodb
    },
    idify: function(name){
      return (name || '').toLowerCase().split(' ').join('').split('?').join('').split('!').join('')
    },
    saveHeader: async function(){
      if(this.header.name.length < 2){
        alert('You cannot add an header of less than 2 characters.')
        return false;
      }
      this.header = false;
      this.saveCollection();
    },
    deleteHeader: async function(){
      if(confirm('Are you sure you want to remove this header?')){
        this.collection.headers.splice(this.collection.headers.indexOf(this.header), 1)
        this.header = false;
        this.saveCollection();
      }
    },
    addHeader: async function(){
      if(this.header.name.length < 2){
        alert('You cannot add an header of less than 2 characters.')
        return false;
      }
      this.header.id = this.idify(this.header.name)
      this.collection.headers.push(this.header);
      this.header = false;
      this.saveCollection();
    },
    saveCollection: async function(){
      await API.put('/collections/'+this.$route.params.id, this.collection);
    },
    saveRecord: async function(record){
      await RAPI.put('/'+record._id, record);
    },

    /* API HANDLER */
  },
  async mounted() {
    //const _self = this;

    // Test to login a user
    this.user = await auth.me().catch(function(e){
      console.log('NOT LOGGEDIN', e)
    });


    var collection = await API.get('/collections/'+this.$route.params.id);
    this.collection = collection;
    RAPI.init(env.rapiURL+'/'+this.collection._id)

    const data = await RAPI.get('/')
    this.data = data.data
    this.totalRecords = data.metrics.total;

    this.pageloaded = true;

  }
}
</script>

<style>

</style>
