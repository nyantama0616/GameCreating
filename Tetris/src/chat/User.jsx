// import io from "socket.io-client";

// class User extends React.Component{
//     static usedID = {};
//     constructor() {
//         super();
//         this.socket = io("localhost:5000");
        
//         // サーバー側でIDを生成してもらう
//         this.socket.emit("generateIDRequest", { usedID: User.usedID });
//         this.socket.on("generateIDresponse", data => {
//             this.id = data.id;
//         });
//     }

//     render() {
//         return null;
//     }
// }
