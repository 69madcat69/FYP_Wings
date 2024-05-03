// /*eslint-disable */
// import Cookies from "universal-cookie";

// const cookies = new CookiesLog();

// class CookiesLog extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       error: "",
//       isAuthenticated: false,
//     };
//   }
//   componentDidMount = () => {
//     this.getSession();
//   };
//   getSession = () => {
//     fetch("/api/session", {
//       credentials: "same-origin",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.isAuthenticated) {
//           this.setState({ isAuthenticated: true });
//         } else {
//           this.setState({ isAuthenticated: false });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   whoami = () => {
//     fetch("/api/whoami/", {
//       header: {
//         "Content-Type": "application/json",
//       },
//       credentials: "same-origin",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Your Name is: " + data.username);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   handleUsernameChange = (event) => {
//     this.setState({ username: event.target.value });
//   };
//   handlePasswordChange = (event) => {
//     this.setState({ password: event.target.value });
//   };
//   ifResponseOk(response) {
//     if (response.status >= 200 && response.state <= 299) {
//       return response.json();
//     } else {
//       throw Error(response.statusText);
//     }
//   }
//   //Login Mthod
//   login = (event) => {
//     event.preventDefault();
//     fetch("/api/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": cookies.get("csrftoken"),
//       },
//       credentials: "same-origin",
//       body: JSON.stringify({
//         username: this.state.username,
//         password: this.state.password,
//       }),
//     })
//       .then(this.isResponseOk)
//       .then((data) => {
//         console.log(data);
//         this.setState({
//           isAuthenticated: true,
//           username: "",
//           password: "",
//           error: "",
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         this.setState({ error: "Wrong username or password." });
//       });
//   };

//   //Logout Method
//   logout = () => {
//     fetch("/api/logout", {
//       credentials: "same-origin",
//     })
//       .then(this.isResponseOk)
//       .then((data) => {
//         console.log(data);
//         this.setState({ isAuthenticated: false });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// }

// export default Cookies;
