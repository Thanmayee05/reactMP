(this.webpackJsonptempoapp=this.webpackJsonptempoapp||[]).push([[0],{20:function(e,t,a){},31:function(e,t,a){e.exports=a(70)},36:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(14),o=a.n(l),i=(a(36),a(7)),s=a(8),c=a(10),u=a(9),m=a(15),d=a.n(m),g=(a(46),a(47),d.a.initializeApp({apiKey:"AIzaSyBMPMKYba0QsSRKH4cby1WKenFgTlI16yY",authDomain:"demoproject-a62a8.firebaseapp.com",databaseURL:"https://demoproject-a62a8.firebaseio.com",projectId:"demoproject-a62a8",storageBucket:"demoproject-a62a8.appspot.com",messagingSenderId:"86371532305",appId:"1:86371532305:web:0ccc3eaf8d663d62633bb0",measurementId:"G-P1CK7CS8XD"})),h=d.a.storage(),f=a(29),p=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).login=function(e){e.preventDefault(),g.auth().signInWithEmailAndPassword(n.state.email,n.state.password).catch((function(e){n.setState({fireErrors:e.message})}))},n.register=function(e){e.preventDefault(),g.auth().createUserWithEmailAndPassword(n.state.email,n.state.password).catch((function(e){n.setState({fireErrors:e.message})}))},n.getAction=function(e){"reg"===e?n.setState({formTitle:"Register",loginBtn:!1,fireErrors:""}):n.setState({formTitle:"Login",loginBtn:!0,fireErrors:""})},n.handleChange=function(e){n.setState(Object(f.a)({},e.target.name,e.target.value))},n.state={email:"",password:"",name:"",fireErrors:"",formTitle:"Login",loginBtn:!0},n}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.state.fireErrors?r.a.createElement("div",{className:"Error"}," ",this.state.fireErrors," "):null,a=this.state.loginBtn?r.a.createElement("input",{className:"loginBtn",type:"submit",onClick:this.login,value:"Submit"}):r.a.createElement("input",{className:"loginBtn",type:"submit",onClick:this.register,value:"Submit"}),n=this.state.loginBtn?r.a.createElement("button",{className:"registerBtn",onClick:function(){return e.getAction("reg")}},"New User? Register"):r.a.createElement("button",{className:"registerBtn",onClick:function(){return e.getAction("login")}},"Existing user? Login");return r.a.createElement("div",null,r.a.createElement("div",{className:"bgimg"},r.a.createElement("div",{class:"header"},r.a.createElement("a",{href:"#home",class:"logo"}),r.a.createElement("a",{href:"#default",class:"header-left",style:{fontSize:"32px"}},"She",r.a.createElement("span",{style:{color:"rgb(8, 49, 231)",fontFamily:"Titillium Web",fontWeight:"bold",fontSize:"36px"}},"Help")),r.a.createElement("div",{class:"header-right"},r.a.createElement("a",{class:"active",href:"#home"},"Home"),r.a.createElement("a",{href:"#contact"},"Contact"),r.a.createElement("a",{href:"#About"},"About"))),r.a.createElement("div",{className:"form_block"},r.a.createElement("div",{id:"title"},this.state.formTitle),r.a.createElement("div",{className:"body"},t,r.a.createElement("form",null,"Email ID",r.a.createElement("br",null),r.a.createElement("input",{type:"text",value:this.state.email,placeholder:"EmailID",onChange:this.handleChange,name:"email"}),"Password",r.a.createElement("br",null),r.a.createElement("input",{type:"password",value:this.state.password,onChange:this.handleChange,placeholder:"Password",name:"password"}),a),n))))}}]),a}(n.Component),E=a(12),b=(a(20),a(16)),v=a(30),y=a.n(v),w=function(e){var t=e.color,a=e.name;e.id;return r.a.createElement("div",{className:"markerBlock",style:{backgroundColor:t,cursor:"pointer"},title:a})},S=function(e){var t=Object(n.useState)({lat:17.38714,lng:78.491684}),a=Object(b.a)(t,2),l=a[0],o=(a[1],Object(n.useState)(11)),i=Object(b.a)(o,2);i[0],i[1];return r.a.createElement("div",{style:{height:"600px",width:"900px",marginTop:"20px"}},r.a.createElement(y.a,{bootstrapURLKeys:{key:"AIzaSyANrdYhelVz0--nvOP1Ov9556d7xCoI_gE"},defaultCenter:l,defaultZoom:15},r.a.createElement(w,{lat:17.385,lng:78.4867,name:"My Marker",color:"rgb(207, 40, 40)"})))},k=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).logout=function(){console.log("Sending a logout request to the API..."),n.setState({logginStatus:!1}),g.auth().signOut(),window.alert("Logging out!")},n.onCollectionUpdate=function(e){var t=[];e.forEach((function(e){var a=e.data(),n=a.long,r=a.lat;t.push({key:"",doc:e,long:n,lat:r})})),n.setState({markerslist:t})},n.onchange=function(e){var t=n.state;t[e.target.name]=e.target.value,n.setState({markerslist:t})},n.handleMarker=function(e){e.preventDefault();var t=n.state,a=t.long,r=t.lat;n.ref.add({long:a,lat:r}).then((function(e){n.setState({long:"",lat:""}),window.alert("Added marker")})).catch((function(e){console.error("Error adding document: ",e),window.alert("Error adding")}))},n.handleChange=function(e){if(e.target.files[0]){var t=e.target.files[0];n.setState((function(){return{image:t}}))}var a=n.refs.file.files[0],r=new FileReader,l=r.readAsDataURL(a);r.onloadend=function(e){this.setState({imgSrc:[r.result]})}.bind(Object(E.a)(n)),console.log(l)},n.handleUpload=function(){var e=n.state.image;e?h.ref("images/".concat(e.name)).put(e).on("state_changed",(function(e){var t=Math.round(e.bytesTransferred/e.totalBytes*100);n.setState({progress:t})}),(function(e){console.log(e),window.alert("Error in submission.")}),(function(){h.ref("images").child(e.name).getDownloadURL().then((function(e){n.setState({imgSrc:e}),window.alert("Uploaded successfully"),window.location.reload(!1)}))})):window.alert("Please select your File!")},n.ref=g.firestore().collection("coordinates"),n.state={image:null,imgSrc:"",progress:0,markerslist:[],long:"",lat:""},n}return Object(s.a)(a,[{key:"showMarkerinLoc",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){return e.setState({long:t.coords.longitude,lat:t.coords.latitude})}));this.state.long;return this.state.lat}},{key:"delete",value:function(e){var t=this;g.firestore().collection("coordinates").doc(e).delete().then((function(){console.log("Document successfully deleted!"),window.alert("deleting marker"),t.props.history.push("/")})).catch((function(e){console.error("Error removing document: ",e),window.alert("Error deleting")}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{class:"header"},r.a.createElement("a",{href:"#home",class:"logo"}," "),r.a.createElement("a",{href:"#default",class:"header-left",style:{fontSize:"32px"}},"She",r.a.createElement("span",{style:{color:"rgb(8, 49, 231)",fontFamily:"Titillium Web",fontWeight:"bold",fontSize:"36px"}},"Help")),r.a.createElement("div",{class:"header-right"},r.a.createElement("a",{class:"active",href:"#home"},"Home"),r.a.createElement("a",{href:"#contact"},"Contact"),r.a.createElement("a",{href:"#About"},"About"))),r.a.createElement("div",null,r.a.createElement("div",{className:"mapsbg"},r.a.createElement("div",{style:{textAlign:"center",fontSize:"40px"}},"Welcome User!",r.a.createElement("button",{onClick:this.logout,style:{float:"right",marginRight:"50px",marginTop:"30px"}},"Logout"),r.a.createElement("button",{onClick:this.position,style:{float:"left",marginLeft:"10px",marginTop:"30px"}}," Get Current Location ")),r.a.createElement("br",null),r.a.createElement("div",{className:"imgUpload",style:{marginLeft:"80px"}},r.a.createElement(S,{google:this.props.google,center:{lat:17.38714,lng:78.491684},width:"800px",height:"500px",zoom:15}),r.a.createElement("br",null),r.a.createElement("div",{style:{float:"right",position:"relative",margin:"50px"}},r.a.createElement("input",{className:"inputType",type:"file",onChange:this.handleChange,name:"user[image]",ref:"file",multiple:"false"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("img",{src:this.state.imgSrc||"https://via.placeholder.com/400x300?text=Your+Image+will+be+displayed+here",alt:"Uploaded Images",width:"400",height:"300"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("button",{onClick:this.handleUpload}," Upload "),r.a.createElement("br",null),r.a.createElement("button",{onClick:this.handleMarker},"Add Marker"),r.a.createElement("br",null),r.a.createElement("button",{onClick:this.delete.bind(this,this.state.key)},"Delete"))))))}}]),a}(n.Component),C=(a(69),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={user:null},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.authListener()}},{key:"authListener",value:function(){var e=this;g.auth().onAuthStateChanged((function(t){t?e.setState({user:t}):e.setState({user:null})}))}},{key:"render",value:function(){return r.a.createElement("div",null,"Welcome!",this.state.user?r.a.createElement(k,null):r.a.createElement(p,null))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.c226accb.chunk.js.map