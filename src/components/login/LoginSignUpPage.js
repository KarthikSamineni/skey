import { useEffect, useState } from "react";
import "./LoginSignUpPage.css";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../firebaseconfig/firebase";

function LoginSignUpPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);

  const [firstName, setFirstName] = useState();

  const [lastName, setLastName] = useState();

  const auth = getAuth();

  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://skey-d7be9.web.app',
  
    // This must be true.
    handleCodeInApp: true,
  
    // iOS: {
    //   bundleId: 'com.example.ios'
    // },
    // android: {
    //   packageName: 'com.example.android',
    //   installApp: true,
    //   minimumVersion: '12'
    // },
  
    // FDL custom domain.
    dynamicLinkDomain: 'skey-d7be9.web.app'
  };

  const handleSignUp = async () => {
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user, "user is ...");

          sendSignInLinkToEmail(auth, email,actionCodeSettings)
            .then(() => {
              // The link was successfully sent. Inform the user.
              // Save the email locally so you don't need to ask the user for it again
              // if they open the link on the same device.
              window.localStorage.setItem("emailForSignIn", email);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("errorCode", errorCode, "errorMessage", errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode", errorCode, "errorMessage", errorMessage);
        });
      const collectionRef = collection(db, "contact");
      const docRef = await addDoc(collectionRef, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });
      // console.log(docRef, "contact created");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log(user, "User is ..");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode", errorCode, "errorMessage", errorMessage);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "contact"));
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(documents, "documents documents");
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        height: "100vh",
        backgroundColor: "",
      }}
    >
      <div className="login-container">
        <h3 style={{ cursor: "pointer" }}>
          <div
            onClick={() => {
              setIsSignUp(true);
            }}
          >
            Signup
          </div>
          <hr />
          <div
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
          >
            Login
          </div>
        </h3>
        <div>
          {isSignUp && (
            <div>
              <input
                className="input-field"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}
          <input
            className="input-field"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="submit-button"
            type="submit"
            onClick={handleSignUp}
          >
            {isSignUp ? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUpPage;
