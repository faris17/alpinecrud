document.addEventListener("alpine:init", async () => {
  Alpine.store("dataStore", {
    users: [],
    user: {
      id: () => Math.random().toString(36).substr(2, 9),
      name: "",
      email: "",
    },
    formEdit: false,

    async load() {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        });
    },

    //addUser
    async addUser() {
      await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(this.user),
      })
        .then((response) => response.json())
        .then(() => {
          this.users.push({
            id: this.id,
            name: this.user.name,
            email: this.user.email,
          });
          this.resetForm();
        });
    },

    //editUser
    async edit(user) {
      this.formEdit = true;
      this.user.id = user.id;
      this.user.name = user.name;
      this.user.email = user.email;
    },

    //updateUser
    async updateUser(user) {
      await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          this.users = this.users.map((user) => {
            if (user.id === updatedUser.id) {
              return updatedUser;
            }
            return user;
          });
        });
    },

    //delete User
    async delete(id) {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          this.users = this.users.filter((user) => user.id !== id);
        });
    },

    resetForm() {
      this.user.name = "";
      this.user.email = "";
    },
  });
});
