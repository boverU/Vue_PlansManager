<template>
  <article class="post">
    <div class="activity-title">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <i class="fas fa-cog activity-settings" @click="handleOpenControl"/>
    </div>

    <p>{{textUtility_capitalize(categories[activity.category].text)}}</p>
    <p>{{activity.notes}}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Filip Jerga</a>
            updated
            {{ activity.updatedAt | prettyTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span>
          Progress:
          <span v-bind:style="{'color': activityProgress}">{{activity.progress}} %</span>
        </span>
      </div>
    </div>
    <div class="activity-controll" v-if="isControlOpen">
      <a class="button is-warning" @click="$emit('toggleUpdate', true)">Edit</a>
      <a class="button is-danger" @click="deleteActivity">Delete</a>
    </div>
  </article>
</template>


<script>
import textUtility from "@/mixins/textUtility";
import store from "@/store";
export default {
  name: "ActivityItem",
  data() {
    return {
      isControlOpen: false
    };
  },
  mixins: [textUtility],
  props: {
    categories: {
      type: Object,
      required: true
    },
    activity: {
      type: Object,
      required: true
    }
  },
  computed: {
    activityProgress() {
      const progress = this.activity.progress;
      if (progress <= 0) {
        return "red";
      } else if (progress <= 50) {
        return "orange";
      } else {
        return "green";
      }
    }
  },
  methods: {
    handleOpenControl() {
      this.isControlOpen = !this.isControlOpen;
    },
    deleteActivity() {
      store.deleteActivity(this.activity);
    }
  }
};
</script>

<style lang="scss" scoped>
.post .title {
  margin-bottom: 5px;
}

.activity-title {
  margin-bottom: 5px;
  display: block;
}

.activity-settings {
  float: right;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
}

.activity-controll {
  margin: 20px 0 0 0;

  a {
    margin-right: 5px;
  }
}
</style>


