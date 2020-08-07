<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model="keyword"
          placeholder="Search By Title"
        />
      </div>
    </div>
    <div class="col-md-6">
      <h4>Blogs List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(blog, index) in filterTitle"
          :key="index"
          @click="setActiveBlog(blog, index)"
        >
          {{ blog.title }}
        </li>
      </ul>

      <button class="mt-3 btn btn-sm btn-danger" @click="removeAllBlogs">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentBlog">
        <h4>Blog</h4>
        <div>
          <label><strong>Title :</strong></label
          >{{ currentBlog.title }}
        </div>
        <div>
          <label><strong>Description :</strong></label
          >{{ currentBlog.description }}
        </div>
        <div>
          <label><strong>Status :</strong></label
          >{{ currentBlog.published ? "Published" : "Pending" }}
        </div>

        <a :href="'/blogs/' + currentBlog.id" class="badge bade-warning"
          >Edit</a
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Blog.....</p>
      </div>
    </div>
  </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";
export default {
  name: "blogs-list",
  data() {
    return {
      blogs: [],
      currentBlog: null,
      currentIndex: -1,
      keyword: ""
    };
  },
  methods: {
    retrieveBlogs() {
      BlogDataService.getAll()
        .then(res => {
          this.blogs = res.data;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBlogs();
      this.currentBlog = null;
      this.currentIndex = -1;
    },

    setActiveBlog(blog, index) {
      this.currentBlog = blog;
      this.currentIndex = index;
    },

    removeAllBlogs() {
      BlogDataService.deleteAll()
        .then(res => {
          this.blogs = res.data;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    // searchTitle() {
    //   BlogDataService.findByTitle(this.title)
    //     .then(res => {
    //       this.blogs = res.data;
    //       console.log(res.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // }
  },
  computed: {
    filterTitle() {
      return this.blogs.filter(blog => {
        return blog.title.toLowerCase().includes(this.keyword.toLowerCase());
      });
    }
  },
  mounted() {
    this.retrieveBlogs();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
