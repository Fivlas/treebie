import { FIREBASE_DB } from '@/functions/firebaseConfig';
import { collection, addDoc } from "firebase/firestore"

const addObjectsToFirestore = async (objectData, name) => {
    if(objectData != null){
        try {
            const objectCollection = collection(FIREBASE_DB, name); // Wskazanie kolekcji 'tips'
            
            for (const obj of objectData) {
                const docRef = await addDoc(objectCollection, obj);
                console.log(`Dodano dokument o ID: ${docRef.id}`);
            }
            
            console.log('Wszystkie obiekty zostały dodane do Firestore!');
        } catch (error) {
            console.error('Błąd podczas dodawania obiektów do Firestore:', error);
        }
    }
};

export default addObjectsToFirestore;