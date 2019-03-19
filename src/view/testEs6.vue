<template>
  <div>{{value1}}</div>
</template>
<script>
export default {
  data() {
    return {
      value1: "value1"
    };
  },
  mounted: function() {
    this.getMap();
  },
  methods: {
    getMap() {
      var myMap = new Map();
      myMap.set(0, "zero");
      myMap.set(1, "one");

      for (var [key, value] of myMap) {
        console.log(key + " = " + value);
      }
      console.log(myMap)
    }
  }
};
</script>