class UserDto {
    constructor(model) {
        this.id = model._id
        this.email = model.email;
        this.books = model.books;
        this.listTypes = model.listTypes;
        this.role = model.role
    }
}

module.exports = UserDto;