const components = {
    components: {
      schemas: {
        // id model
        // id: {
        //   type: "string", // data type
        //   description: "An id of a todo", // desc
        //   example: "tyVgf", // example of an id
        // },
        // user model
        RegistrationInput: {
          type: "object", // data type
          properties: {
            email: {
              type: "string", // data-type
              description: "Student Email", // desc
              example: "jamesworker@student.edu", // example of an id
            },
            password: {
              type: "string", // data-type
              description: "Password", // desc
              example: "myPassword", // example of an id
            },
            confirmPasssword: {
              type: "string", // data-type
              description: "Confirm Password", // desc
              example: "myPassword", // example of an id
            },
            name: {
              type: "string", // data-type
              description: "Student Full name", // desc
              example: "James Worker", // example of a title
            },
            year: {
              type: "string", // data-type
              description: "Current study year", // desc
              example: "Junior", // example of a title
            },
            phoneNumber: {
              type: "string", // data-type
              description: "Student Phone number", // desc
              example: "+1 2344 5656", // example of a title
            },
            university: {
              type: "string", // data-type
              description: "Student University", // desc
              example: "University Of Minnesota", // example of a title
            },
          },
        },
        // Todo input model
        LoginInput: {
          type: "object", // data type
          properties: {
            email: {
              type: "string", // data type
              description: "User Email", // desc
              example: "amigo@westuni.edu", // example of a title
            },
            password: {
              type: "string", // data type
              description: "User Password", // desc
              example: "TestPassword", // example of a title
            },
          },
        },
      },
    },
  };
  
  export default components;
  