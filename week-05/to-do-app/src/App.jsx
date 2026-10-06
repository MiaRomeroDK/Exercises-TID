import "./App.css";
import TodoList from "./components/TodoList";
import Parse from "parse";
import AuthPage from "./pages/AuthPage";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";

Parse.initialize(
  "o6lnR7Hw6u0AiEq1DIlwGW8iFpju10opzeGwVGzm",
  "SAsm2sQZOwp9iWfqsQVKDfVc3bQJwfboBGoWe41P",
);
Parse.serverURL = "https://parseapi.back4app.com/";

function App() {
  const [user, setUser] = useState(Parse.User.current());

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }
  function handleLogout() {
    Parse.User.logOut().then(() => setUser(null));
  }

  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route 
      path="/" 
      element={<TodoList firstName={user.get("username")} userID={user.id} />}
      />
      <Route 
      path="/lists/:listID" 
      element= {<ListPage />} 
      />
    </Routes>
    <button onClick={handleLogout}>Log out</button>
    </BrowserRouter>
  );
}

export default App;


   