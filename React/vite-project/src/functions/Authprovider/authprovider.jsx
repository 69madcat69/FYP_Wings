// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/user");
//         if (response.status === 200) {
//           setIsAuthenticated(true);
//         }
//       } catch (err) {
//         setIsAuthenticated(false);
//       }
//     };
//     checkAuthStatus();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
