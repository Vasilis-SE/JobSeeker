import components from "./components";
import paths from "./paths";
import servers from "./servers";

export = {
    "openapi": "3.0.1",
    "info": {
        "version": "1.0.0",
        "title": "LoginBee",
        "summary": "Simple REST API template project.",
        "description": "This is a template project demonstrating the usage and the architectural design of a simple REST API for the purpose of handling user registration, login, logout.",
        "contact": {
          "name": "API Creator",
          "email": "vasilis.tris@gmail.com"
        },
        "license": {
          "name": "MIT License",
          "url": "https://www.mit.edu/~amini/LICENSE.md"
        }
    },
    "servers": servers,
    "tags": [
        {
          "name": "User Operations"
        }
    ],
    "paths": paths,
    "components": components
}