export = {
    "/user": {
        "post": {
            "tags": ["User Operations"],
            "description": "Create new user with the given properties on request body.",
            "operationId": "createUser",
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/create_user_payload"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "The user was created and stored successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/response_success"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Could not create new user due to invalid data given on request body",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/response_failed_400"
                            }
                        }
                    }
                },
                "404": {
                    "description": "Could not find one or more necessary resources to create the user",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/response_failed_404"
                            }
                        }
                    }
                },
                "500": {
                    "description": "Could not create new user, something went wrong with the process",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/response_failed_500"
                            }
                        }
                    }
                }
            }
        },
        "get": {
            "tags": ["User Operations"],
            "description": "Fetch user(-s) from database give specific search criteria.",
            "operationId": "getUsers",
            "parameters": [
                {
                    "name": "id",
                    "in": "URL Parameter",
                    "schema": {
                        "$ref": "#/components/schemas/user_id"
                    },
                    "required": false,
                },
                {
                    "name": "email",
                    "in": "URL Parameter",
                    "schema": {
                        "$ref": "#/components/schemas/user_email"
                    },
                    "required": false,
                },
                {
                    "name": "page",
                    "in": "Query Parameter",
                    "schema": {
                        "$ref": "#/components/schemas/page"
                    },
                    "required": false,
                },
                {
                    "name": "limit",
                    "in": "Query Parameter",
                    "schema": {
                        "$ref": "#/components/schemas/limit"
                    },
                    "required": false,
                },
                {
                    "name": "order",
                    "in": "Query Parameter",
                    "schema": {
                        "$ref": "#/components/schemas/order"
                    },
                    "required": false,
                },
                {
                    "name": "sort",
                    "in": "Query Parameter",
                    "schema": {
                        "$ref": "#/components/schemas/sort"
                    },
                    "required": false,
                }
            ],
            "responses": {
                "200": {
                    "description": "Successfully fetched users",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/response_success"
                            }
                        }
                    }
                },
                "404": {
                    "description": "Could not find any user(-s) to return.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/response_failed_404"
                            }
                        }
                    }
                }
            }
        }
    },
    "/user/login": {
        "post": {
            "tags": ["User Operations"],
            "description": "Login a user into the system with a given data on request body.",
            "operationId": "loginUser",
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/user_login"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "The user logged in successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/response_login_success"
                            }
                        }
                    }
                },
                "404": {
                    "description": "Could not find one or more necessary resources to login user",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/response_failed_404"
                            }
                        }
                    }
                },
                "500": {
                    "description": "Could not login user, something went wrong with the process",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/response_failed_500"
                            }
                        }
                    }
                }
            }
        }
    }
}
