const registerUser = {
    // operation's method
    post: {
      tags: ["User"], // operation's tag
      description: "Register User", // short desc
      operationId: "registerUser", // unique operation id
      parameters: [], // expected params
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegistrationInput", // todo input data model
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        201: {
          description: "User created successfully", // response desc
        },
        // response code
        500: {
          description: "Server error", // response desc
        },
      },
    },
  };

//   export default registerUser;
module.exports = registerUser