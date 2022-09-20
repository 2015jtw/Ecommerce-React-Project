import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut, onAuthStateChanged, } from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCViStz2uuHnytBATalo0yrxkHjHwKOzlo",
    authDomain: "e-commerce-project-e4a16.firebaseapp.com",
    projectId: "e-commerce-project-e4a16",
    storageBucket: "e-commerce-project-e4a16.appspot.com",
    messagingSenderId: "716700273458",
    appId: "1:716700273458:web:aec84b89c891efb61ee52b"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

//   to use google auth - need to initialize a provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
 
export const db = getFirestore();

// adding new shop data js file to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    })

    await batch.commit();
    console.log("done");

}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {})

    return categoryMap;
}

export const createUserDocFromAuth = async (userAuth, additionalInfo = {displayName: 'mike'}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    // if user data not exists, set document with data from userAuth
    // return userDocRef
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, { 
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }
        catch(err){
            console.log(`there was an error: ${err.message}`);
        }
    }

    // if user data exists 
    return userDocRef;
  
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback );