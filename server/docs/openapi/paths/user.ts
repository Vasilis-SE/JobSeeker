export = {
    "/api/v1/user": {
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
        }
    },
    "/api/v1/user/login": {
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
    },
    "/api/v1/user/logout": {
        "delete": {
            "tags": ["User Operations"],
            "description": "Logout a user from the system given a valid JWT.",
            "operationId": "logoutUser",
            "responses": {
                "200": {
                    "description": "The user logged out successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/user_logout"
                            }
                        }
                    }
                },
                "500": {
                    "description": "Could not logout user, something went wrong with the process",
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
