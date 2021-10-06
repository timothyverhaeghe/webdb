<template>
  <div :class="action.action.customstyling || ''">
    <div :id="action.id">
      <div @click="editAction(action)" class="top w-64 h-16 border rounded mx-auto flex flex-row select-none cursor-pointer mt-2">
        <div :class="calculateBGColor(action.action)" class="w-4/12 rounded-l flex flex-row items-center justify-center">
          <div class="h-6 w-6 text-white" v-if="action.action.svg" v-html="action.action.svg"></div>
          <svg v-else class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        </div>
        <div class="w-8/12 flex flex-col justify-center px-2 bg-white rounded-r">
          <div v-if="false" class="text-xs font-bold">{{action.id}}</div>
           <div class="text-xs font-bold">{{action.name}}</div>
          <div v-if="false" class="text-xs text-gray-600">{{action.action.desc}}</div>
        </div>
      </div>
      <div v-if="action.action.isEnd" class="w-64 mx-auto flex flex-row items-center justify-center mt-6"></div>
      <div v-else class="w-64 mx-auto flex flex-row items-center justify-center mt-2">
        <div @click="addItem(action)" class="mt-2 bottom cursor-pointer rounded-full bg-dark w-6 h-6 flex flex-row items-center justify-center">
          <svg class="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </div>
      </div>
    </div>


    <div v-if="findchildren(action.id).length > 0" class="flex flex-row items-center justify-center">
      <action :actions="actions" @editAction="editAction" @addItem="addItem" class="m-3" v-for="action in findchildren(action.id)" v-bind:key="action.id" :action="action" />
    </div>

  </div>
</template>
<script>
import Action from '@/components/action'

export default {
    name: 'action',
    props: ['action', 'actions'],
    data() {
      return {}
    },
    components: {
      Action,
    },
    methods: {
      calculateBGColor: function(action){
        if(action.actionType == 'success'){
          return 'bg-green-600'
        } else if(action.actionType == 'failed'){
          return 'bg-red-600'
        } else if(action.actionType == 'calculation'){
          return 'bg-yellow-500'
        } else {
          return 'bg-blue-600'
        }
      },
      addItem: function(branch){
        this.$emit('addItem', branch);
      },
      editAction: function(action){
        this.$emit('editAction', action);
      },
      findchildren: function(parentId){
        var data = [];
        for (var i = 0; i < this.actions.length; i++) {
          if(this.actions[i] && this.actions[i].parent == parentId){
            data.push(this.actions[i]);
          }
        }
        return data;
      },
    },
    mounted() {
    }
}
</script>
<style>

</style>
