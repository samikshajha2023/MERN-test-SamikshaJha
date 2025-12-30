# Todo List App

A full-stack Todo List application built with **React (frontend)**, **Express.js (backend)**, and **MongoDB**.  
This project allows users to add todos, mark them as done, and delete them with **immediate UI updates**.

---

## **Features**

- Add a new todo (title + description)  
- Mark a todo as done (disappears from UI)  
- Delete a todo (disappears from UI)  
- Optimistic UI updates: todos appear/disappear instantly without waiting for backend response  

---

## **Folder Structure**

---

## **Technologies Used**

- **Frontend:** React, Axios  
- **Backend:** Node.js, Express.js, Mongoose  
- **Database:** MongoDB (Atlas)  
- **Development Tools:** Nodemon, VSCode  

---

## **Design Choices**

1. **Optimistic UI Updates**:  
   - When adding, deleting, or marking a todo as done, the UI updates immediately for better user experience.  
   - Temporary IDs are used for new todos before backend confirmation.  

2. **Simple and Minimal Design**:  
   - Focused on functionality, not styling.  
   - Uses simple HTML + inline CSS for clarity and easy customization.  

3. **REST API Structure**:  
   - **GET /api/todos** → fetch all todos  
   - **POST /api/todos** → add a todo  
   - **PUT /api/todos/:id** → mark a todo as done  
   - **DELETE /api/todos/:id** → delete a todo  

---

Challenges Faced
Immediate UI updates:
Initially, the UI updated only after fetching from backend.
Solved using optimistic UI updates with temporary IDs.
Backend ID mismatch:
Temporarily generated IDs caused issues with React keys.
Solved by replacing temp IDs with backend MongoDB _id after POST response.
MongoDB connection issues:
Had to remove deprecated options and properly URL-encode the password in the connection string.
