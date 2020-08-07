<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="blog.title"
          name="title"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="blog.description"
          name="description"
          required
        />
      </div>
      <button @click="saveBlog" class="btn btn-primary">Submit</button>
    </div>

    <div v-else>
      <h4>You have Submitted Succesfully</h4>
      <button class="btn btn-success" @click="newBlog">Add</button>
    </div>
  </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";
export default {
  name: "add-blog",
  data() {
    return {
      blog: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveBlog() {
      var data = {
        title: this.blog.title,
        description: this.blog.description
      };

      BlogDataService.create(data)
        .then(res => {
          this.blog.id = res.data.id;
          console.log(res.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newBlog() {
      this.submitted = false;
      this.blog = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
