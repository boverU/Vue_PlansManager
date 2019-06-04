<template>
  <div id="activityApp">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <!-- <h1>{{fullNameApp}}</h1> -->
          <h1>{{ watchedAppName }}</h1>
        </div>
      </div>
    </nav>

    <TheNavBar></TheNavBar>

    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate @activityCreated="addActivity" :categories="categories"></ActivityCreate>
        </div>

        <div class="column is-9">
          <div
            v-if="isDataLoaded"
            class="box content"
            :class="{ fetching: isFetching , 'has-error': error}"
          >
            <div v-if="error">{{error}}</div>
            <div v-else>
              <div v-if="isFetching && !isDataLoaded">Loading...</div>
              <ActivityItem
                v-for="activity in activities"
                :key="activity.id"
                :activity="activity"
                :categories="categories"
                @activityDeleted="handleActivityDelete"
              />
            </div>
            <div v-if="!isFetching">
              <div class="activity-length">Currently {{ activityLength }} Activities</div>
              <div class="activity-motivation">{{doesActivityExist}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import vue from "vue";
import {
  fetchActivities,
  fetchUser,
  fetchCategories,
  createActivity,
  deleteActivityAPI
} from "@/api";
import ActivityItem from "@/components/ActivityItem.vue";
import ActivityCreate from "@/components/ActivityCreate";
import TheNavBar from "@/components/TheNavBar";
export default {
  name: "App",
  components: { ActivityItem, ActivityCreate, TheNavBar },
  data: function() {
    return {
      creator: "Bover U",
      appName: "Activity Planner",
      watchedAppName: "Activity Planner By Bover",

      isFetching: false,
      error: null,
      user: {},
      activities: null,
      categories: null
    };
  },
  computed: {
    fullNameApp() {
      return `${this.appName} by ${this.creator}`;
    },
    activityLength() {
      return Object.keys(this.activities).length;
    },
    doesActivityExist() {
      if (this.activityLength) {
        return "Nice to see some goals";
      } else {
        return "I hope you will determine your activities soon";
      }
    },
    isDataLoaded() {
      return this.activities && this.categories;
    }
  },
  watch: {
    creator(val) {
      debugger;
      console.log(val);
      this.watchedAppName = this.appName + "by" + val;
    },
    appName(val) {
      debugger;
      console.log(val);
      this.watchedAppName = val + "by" + this.creator;
    }
  },
  created() {
    this.isFetching = true;
    fetchActivities()
      .then(activities => {
        this.isFetching = false;
        this.activities = activities;
      })
      .catch(err => {
        this.error = err;
        this.isFetching = false;
      });
    this.user = fetchUser();
    fetchCategories().then(categories => (this.categories = categories));
  },

  methods: {
    addActivity(newActivity) {
      vue.set(this.activities, newActivity.id, newActivity);
      console.log(this.activities);
    },
    handleActivityDelete(activity) {
      deleteActivityAPI(activity).then(deletedActivity => {
        vue.delete(this.activities, deletedActivity.id);
      });
    }
  }
};
</script>

<style>
#activityApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

html,
body {
  font-family: "Open Sans", serif;
  background: #f2f6fa;
}
footer {
  background-color: #f2f6fa !important;
}
.example-wrapper {
  margin-left: 20px;
}
.topNav {
  border-top: 5px solid #3498db;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}

.activity-motivation {
  float: right;
}

.activity-length {
  display: inline-block;
}

.fetching {
  border: 2px solid orange;
}

.has-error {
  border: 2px solid red;
}
</style>
