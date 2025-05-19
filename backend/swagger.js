// swagger.js
module.exports = {
    openapi: "3.0.0",
    info: {
        title: "FYONKA API",
        version: "1.0.0",
        description: "E-Commerce API for Gift Shop",
    },
    servers: [
        {
        url: "http://localhost:5000",
        description: "Local development server",
        },
    ],
    paths: {
        "/api/auth/register": {
        post: {
            tags: ["Auth"],
            summary: "Register a new user",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["username", "email", "password"],
                    properties: {
                    username: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "User registered successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "Login user",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Login successful" },
            401: { description: "Unauthorized" },
            },
        },
        },

        "/api/cart": {
        post: {
            tags: ["Cart"],
            summary: "Add a product to the cart",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["productId", "quantity"],
                    properties: {
                    productId: { type: "string" },
                    quantity: { type: "integer" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Product added to cart" },
            400: { description: "Invalid input" },
            },
        },
        get: {
            tags: ["Cart"],
            summary: "Get all items in the cart",
            responses: {
            200: { description: "Cart retrieved successfully" },
            400: { description: "Invalid input" },
            },
        },
        put: {
            tags: ["Cart"],
            summary: "Update the quantity of a product in the cart",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["productId", "quantity"],
                    properties: {
                    productId: { type: "string" },
                    quantity: { type: "integer" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Cart updated successfully" },
            400: { description: "Invalid input" },
            },
        },
        delete: {
            tags: ["Cart"],
            summary: "Remove a product from the cart",
            parameters: [
            {
                name: "productId",
                in: "query",
                required: true,
                schema: { type: "string" },
            },
            ],
            responses: {
            200: { description: "Product removed from cart" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/categories": {
        post: {
            tags: ["Categories"],
            summary: "Create a new category",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["name"],
                    properties: {
                    name: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Category created successfully" },
            400: { description: "Invalid input" },
            },
        },
        get: {
            tags: ["Categories"],
            summary: "Get all categories",
            responses: {
            200: { description: "Categories retrieved successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/categories/{categoryId}": {
        put: {
            tags: ["Categories"],
            summary: "Update a category",
            parameters: [
            {
                name: "categoryId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["name"],
                    properties: {
                    name: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Category updated successfully" },
            400: { description: "Invalid input" },
            },
        },
        delete: {
            tags: ["Categories"],
            summary: "Delete a category",
            parameters: [
            {
                name: "categoryId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            responses: {
            200: { description: "Category deleted successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/contact": {
        post: {
            tags: ["Contact"],
            summary: "Send a contact message",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["name", "email", "message"],
                    properties: {
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    message: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Message sent successfully" },
            400: { description: "Invalid input" },
            },
        },
        get: {
            tags: ["Contact"],
            summary: "Get all contact messages (Admin only)",
            responses: {
            200: { description: "Messages retrieved successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/contact/{messageId}": {
        delete: {
            tags: ["Contact"],
            summary: "Delete a contact message (Admin only)",
            parameters: [
            {
                name: "messageId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            responses: {
            200: { description: "Message deleted successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/orders": {
        post: {
            tags: ["Orders"],
            summary: "Create a new order",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["products"],
                    properties: {
                    products: {
                        type: "array",
                        items: {
                        type: "object",
                        required: ["productId", "quantity"],
                        properties: {
                            productId: { type: "string" },
                            quantity: { type: "integer" },
                        },
                        },
                    },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Order created successfully" },
            400: { description: "Invalid input" },
            },
        },
        get: {
            tags: ["Orders"],
            summary: "Get user orders",
            responses: {
            200: { description: "Orders retrieved successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/orders/{orderId}": {
        put: {
            tags: ["Orders"],
            summary: "Update an order (Admin only)",
            parameters: [
            {
                name: "orderId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["status"],
                    properties: {
                    status: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Order updated successfully" },
            400: { description: "Invalid input" },
            },
        },
        delete: {
            tags: ["Orders"],
            summary: "Delete an order (Admin only)",
            parameters: [
            {
                name: "orderId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            responses: {
            200: { description: "Order deleted successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/products": {
        post: {
            tags: ["Products"],
            summary: "Add a new product",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["name", "price", "categoryId"],
                    properties: {
                    name: { type: "string" },
                    price: { type: "number" },
                    categoryId: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Product added successfully" },
            400: { description: "Invalid input" },
            },
        },
        get: {
            tags: ["Products"],
            summary: "Get all products",
            responses: {
            200: { description: "Products retrieved successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/products/{productId}": {
        put: {
            tags: ["Products"],
            summary: "Update a product",
            parameters: [
            {
                name: "productId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["name", "price", "categoryId"],
                    properties: {
                    name: { type: "string" },
                    price: { type: "number" },
                    categoryId: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Product updated successfully" },
            400: { description: "Invalid input" },
            },
        },
        delete: {
            tags: ["Products"],
            summary: "Delete a product",
            parameters: [
            {
                name: "productId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            responses: {
            200: { description: "Product deleted successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/reviews/{productId}": {
        post: {
            tags: ["Reviews"],
            summary: "Add a review for a product",
            parameters: [
            {
                name: "productId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["rating", "comment"],
                    properties: {
                    rating: { type: "integer" },
                    comment: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Review added successfully" },
            400: { description: "Invalid input" },
            },
        },
        get: {
            tags: ["Reviews"],
            summary: "Get reviews for a product",
            parameters: [
            {
                name: "productId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            responses: {
            200: { description: "Reviews retrieved successfully" },
            400: { description: "Invalid input" },
            },
        },
        },

        "/api/reviews/{reviewId}": {
        put: {
            tags: ["Reviews"],
            summary: "Update a review",
            parameters: [
            {
                name: "reviewId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    required: ["rating", "comment"],
                    properties: {
                    rating: { type: "integer" },
                    comment: { type: "string" },
                    },
                },
                },
            },
            },
            responses: {
            200: { description: "Review updated successfully" },
            400: { description: "Invalid input" },
            },
        },
        delete: {
            tags: ["Reviews"],
            summary: "Delete a review",
            parameters: [
            {
                name: "reviewId",
                in: "path",
                required: true,
                schema: { type: "string" },
            },
            ],
            responses: {
            200: { description: "Review deleted successfully" },
            400: { description: "Invalid input" },
            },
        },
        },
    },
};

/*
TODO : http://localhost:5000/api-docs
*/
