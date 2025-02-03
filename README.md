# React & TypeScript Web Application

## Description

This school assignment is a web application built with React and TypeScript, created with Vite. To simulate a real database, JSON Server is used as a backend. No demands on the styling was made.

## Technologies and Frameworks

The project utilizes the following frameworks and libraries:

Axios – I chose Axios instead of Fetch because it is more intuitive to work with and does not require the same type of code. I also find that the code becomes more readable and, therefore, more maintainable.

Formik – Used for user input validation efficiently through a trusted framework instead of having to create everything myself.

ESLint – Ensures that the code is of high quality, consistent, and easy to read and maintain.

Vite – Simplifies the initialization and creation of the web application.

Bootstrap - I chose to use Bootstrap to get a clean looking navbar even though it wasn't requiered for the assignment.

React: For building a interactive and dynamic user experience via components. useState, useEffect and useNavigate are also used throughout the application to make everything work smoothly.

## Purpose

I chose to use TypeScript instead of JavaScript to challenge myself and gain experience with the "type-safe" version. This turned out to be a greater challenge than expected, as unexpected issues arose that required a lot of debugging. At times, I felt that it would have been easier to just use JavaScript. However, encountering errors provides valuable lessons and learning experiences.

Beyond the requirements of the assignment, I also added extra functionality, as it felt incomplete otherwise. I implemented a feature in the web app that allows users to view and delete their bookings, as I personally felt it was strange not to include it.

## Potential Improvements

Currently, the business logic is located in the same files as the frontend components, which is suboptimal and should be broken out and placed in separate services files. This was not a requirement for the assignment, but it is something that should ideally have been addressed.
