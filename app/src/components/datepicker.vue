<template>
<div class="flex items-center justify-center">
  <div class="antialiased sans-serif">
  <div>
      <div class="container mx-auto px-4 py-2 md:py-10">
          <div class="mb-5 w-64" v-click-outside="hide">
              <!-- <label for="datepicker" class="mb-1 text-gray-700 block">Select Date</label> -->
              <div class="relative">
                  <input
                      type="text"
                      readonly
                      v-model="datepickerValue"
                      @click="showDatepicker = !showDatepicker"
                      @keydown.escape="showDatepicker = false"
                      class="w-full border border-gray-400 pl-4 pr-10 py-2 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                      placeholder="Select date">

                      <div class="absolute top-0 right-0 px-3 py-2">
                          <svg class="h-6 w-6 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                      </div>

                      <div v-if="showDatepicker" class="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0" style="width: 17rem">

                          <div class="flex justify-between items-center mb-2">
                              <div>
                                  <span class="text-lg font-bold text-gray-800">{{MONTH_NAMES[month]}}</span>
                                  <span class="ml-1 text-lg text-gray-600 font-normal">{{year}}</span>
                              </div>
                              <div>
                                  <button
                                      type="button"
                                      class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                      :class="{'cursor-not-allowed opacity-25': month == 0 }"
                                      :disabled="month == 0 ? true : false"
                                      @click="month--; getNoOfDays()">
                                      <svg class="h-6 w-6 text-gray-500 inline-flex"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                      </svg>
                                  </button>
                                  <button
                                      type="button"
                                      class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                      :class="{'cursor-not-allowed opacity-25': month == 11 }"
                                      :disabled="month == 11 ? true : false"
                                      @click="month++; getNoOfDays()">
                                      <svg class="h-6 w-6 text-gray-500 inline-flex"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                      </svg>
                                  </button>
                              </div>
                          </div>

                          <div class="flex flex-wrap mb-3 -mx-1">
                              <div v-for="(day, index) in days" v-bind:key="index">
                                  <div style="width: 14.26%" class="px-1">
                                      <div class="text-gray-800 font-medium text-center text-xs">{{day}}</div>
                                  </div>
                              </div>
                          </div>

                          <div class="flex flex-wrap -mx-1">
                              <div v-for="blankday in blankdays" v-bind:key="blankday">
                                  <div style="width: 14.28%" class="text-center border p-1 border-transparent text-sm"></div>
                              </div>
                              <div v-for="(date, dateIndex) in no_of_days" v-bind:key="dateIndex" style="width: 14.28% !important;" class="flex flex-row items-center justify-center text-center px-1 mb-1">
                                      <div @click="getDateValue(date)" class="cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100"
                                          :class="isToday(date) == true ? 'bg-gray-200 text-black w-full': 'text-gray-700 hover:bg-blue-200 w-full'"
                                      >{{date}}</div>
                              </div>
                          </div>
                      </div>

              </div>
          </div>

      </div>
  </div>
  </div>
</div>
</template>
<script>
export default {
    name: 'Dashboard',
    props: ['date'],
    data() {
      return {
      showDatepicker: false,
      datepickerValue: '',
      month: '',
      year: '',
      no_of_days: [],
      blankdays: [],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      MONTH_NAMES: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
    },
    methods: {
      hide: function(){
        this.showDatepicker = false
      },
      isToday(date) {
          const today = new Date();
          const d = new Date(this.year, this.month, date);
          return today.toDateString() === d.toDateString() ? true : false;
      },
      getDateValue(date) {
          let selectedDate = new Date(this.year, this.month, date);
          this.datepickerValue = selectedDate.toDateString();
          this.date = selectedDate.getFullYear() +"-"+ ('0'+ selectedDate.getMonth()).slice(-2) +"-"+ ('0' + selectedDate.getDate()).slice(-2);
          this.showDatepicker = false;
          this.$parent.date = selectedDate;
      },
      getNoOfDays() {
          let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

          // find where to start calendar day of week
          let dayOfWeek = new Date(this.year, this.month).getDay();
          let blankdaysArray = [];
          for ( var i=1; i <= dayOfWeek; i++) {
              blankdaysArray.push(i);
          }

          let daysArray = [];
          for ( var x=1; x <= daysInMonth; x++) {
              daysArray.push(x);
          }

          this.blankdays = blankdaysArray;
          this.no_of_days = daysArray;
      }
    },
    mounted() {
      let today = new Date();
      this.month = today.getMonth();
      this.year = today.getFullYear();
      this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
      this.getNoOfDays()
    }
}
</script>
<style>

</style>
