<template>
  <div class="activityCreateForm">
    <a
      v-if="!isFormDisplayed"
      class="button is-primary is-block is-alt is-large"
      href="#"
      @click="toggleFormDisplay"
    >New Activity</a>
    <div v-if="isFormDisplayed" class="create-form">
      <h2>Create Activity</h2>
      <form>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="newActivity.title" type="text" class="input" placeholder="Read a Book">
          </div>
        </div>
        <div class="field">
          <label class="label">Notes</label>
          <div class="control">
            <textarea v-model="newActivity.notes" class="textarea" placeholder="Textarea"/>
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="control">
            <select v-model="newActivity.category" class="select">
              <option value disabled>Please Select 1</option>
              <option
                :key="category.id"
                v-for="category in categories"
                :value="category.id"
              >{{category.text}}</option>
            </select>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              v-bind:disabled="!isFormValid"
              @click.prevent="createActivity"
            >Create Activity</button>
          </div>
          <div class="control">
            <button class="button is-text" @click.prevent="toggleFormDisplay">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createActivityAPI } from "@/api";
import store from "@/store";
export default {
  data() {
    return {
      isFormDisplayed: true,
      newActivity: { title: "", notes: "", category: "" }
    };
  },
  methods: {
    toggleFormDisplay() {
      this.isFormDisplayed = !this.isFormDisplayed;
    },
    createActivity() {
      store.createActivity({ ...this.newActivity }).then(activity => {
        this.resetActivity();
        this.isFormDisplayed = false;
      });
    },
    resetActivity() {
      this.newActivity.title = "";
      this.newActivity.notes = "";
      this.newActivity.category = "";
    }
  },
  computed: {
    isFormValid() {
      return (
        this.newActivity.title &&
        this.newActivity.notes &&
        this.newActivity.category
      );
    }
  },
  props: {
    categories: {
      type: Object,
      required: false
    }
  }
};
</script>


