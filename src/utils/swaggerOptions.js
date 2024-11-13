export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Imagegram API",
            version: "1.0.0",
            description: 'This is a simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],
    },
    apis: ["./src/routers/v1/*.js"],
};