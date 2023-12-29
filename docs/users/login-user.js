const login = {
    // operation's method
    get: {
      tags: ["User"], // operation's tag.
      description: "User Login", // operation's desc.
      operationId: "login", // unique operation id
      parameters: [],
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginInput", // todo input data model
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: "User Login Successfully", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegistrationSuccess", // todo data model
              },
            },
          },
        },
        // response code
        // 404: {
        //   description: "Todo is not found", // response desc.
        //   content: {
        //     // content-type
        //     "application/json": {
        //       schema: {
        //         $ref: "#/components/schemas/Error", // error data model
        //       },
        //     },
        //   },
        // },
      },
    },
  };

//   export default login;
module.exports = login