import fakeApi from "../lib/fakeApi";
import Vue from "vue";

const store = {
  state: {
    activities: {},
    categories: {}
  },
  generateId() {
    return Math.floor(new Date() * Math.random() * 1546969049);
  },

  fetchActivities() {
    debugger;
    return fakeApi.get("activities", { force: 1 }).then(activities => {
      Object.keys(activities).forEach(key => {
        this.setItem("activities", key, activities[key]);
      });

      return activities;
    });
  },
  fetchCategories() {
    return fakeApi.get("categories", { force: 1 }).then(categories => {
      Object.keys(categories).forEach(key => {
        this.setItem("categories", key, categories[key]);
      });
      return categories;
    });
  },
  setItem(resourse, id, item) {
    return Vue.set(this.state[resourse], id, item);
  },

  fetchUser() {
    return {
      name: "Filip Jerga",
      id: "-Aj34jknvncx98812"
    };
  },

  createActivity(activity) {
    activity.id = this.generateId();
    activity.progress = 0;
    activity.createdAt = new Date();
    activity.updatedAt = new Date();
    return fakeApi.post("activities", activity).then(createdActivity => {
      this.setItem("activities", createdActivity.id, createdActivity);
      return createdActivity;
    });
  },

  updateActivity(activity) {
    activity.updatedAt = new Date();
    return fakeApi.post("activities", activity).then(updatedActivity => {
      this.setItem("activities", updatedActivity.id, updatedActivity);
      return updatedActivity;
    });
  },
  deleteActivity(activity) {
    return fakeApi.delete("activities", activity).then(deletedActivity => {
      Vue.delete(this.state.activities, activity.id);
      return deletedActivity;
    });
  }
};

export default store;
