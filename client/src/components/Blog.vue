<template>
  <div v-if="currentBlog" class="edit-form">
    <h4>Blog</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentBlog.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentBlog.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status :</strong></label>
        {{ currentBlog.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentBlog.published"
      @click="updatePublished(false)"
    >
      Unpublish
    </button>
    <button
      class="badge badge-primary mr-2"
      v-else
      @click="updatePublished(true)"
    >
      Unpublish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteBlog">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateBlog">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Blog.....</p>
  </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";
export default {
  name: "blog",
  data() {
    return {
      currentBlog: null,
      message: ""
    };
  },
  methods: {
    getBlog(id) {
      BlogDataService.get(id)
        .then(res => {
          this.currentBlog = res.data;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentBlog.id,
        title: this.currentBlog.title,
        description: this.currentBlog.description,
        published: status
      };

      BlogDataService.update(this.currentBlog.id, data)
        .then(res => {
          this.currentBlog.published = status;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateBlog() {
      BlogDataService.update(this.currentBlog.id, this.currentBlog)
        .then(res => {
          console.log(res.data);
          this.message = "The Blog was updated successfully";
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteBlog() {
      BlogDataService.update(this.currentBlog.id, this.currentBlog)
        .then(res => {
          console.log(res.data);
          this.$router.push({ name: "blogs" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = "";
    this.getBlog(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
