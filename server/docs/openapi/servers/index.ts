export = [
    {
        "url": "http://localhost:3100",
        "description": "Development server",
        "variables": {
            "port": {
                "enum": [
                  "3100"
                ],
                "default": "3100"
            }
        }
    },
    {
        "url": "http://localhost:3000",
        "description": "Production server",
        "variables": {
            "port": {
                "enum": [
                  "3000"
                ],
                "default": "3000"
            }
        }
    }
];