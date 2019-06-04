<template>
  <div>
    <ActivityItemUpdate
      v-if="isUpdateActive"
      :activity="activity"
      :categories="categories"
      @toggleUpdate="toggleUpdateState"
    />
    <ActivityItemDetail
      v-else
      :activity="activity"
      :categories="categories"
      @toggleUpdate="toggleUpdateState"
    />
  </div>
</template>

<script>
import ActivityItemDetail from "@/components/ActivityItemDetail";
import ActivityItemUpdate from "@/components/ActivityItemUpdate";
export default {
  components: { ActivityItemDetail, ActivityItemUpdate },

  props: {
    activity: {
      type: Object,
      required: true
    },
    categories: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isUpdateActive: false
    };
  },
  methods: {
    toggleUpdateState(state) {
      this.isUpdateActive = state;
    }
  }
};
</script>

<style>
</style>


