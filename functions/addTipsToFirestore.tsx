import { FIREBASE_DB } from '@/firebase.config';
import { collection, getDocs, addDoc } from "firebase/firestore"

const addTipsToFirestore = async (tipsCollection) => {
    if(tipsCollection != null){
        try {
            const tipsCollection = collection(FIREBASE_DB, 'tips'); // Wskazanie kolekcji 'tips'
            
            for (const tip of tipsData) {
                const docRef = await addDoc(tipsCollection, {
                    title: tip.title,
                    popularity: tip.popularity,
                });
                console.log(`Dodano dokument o ID: ${docRef.id}`);
            }
            
            console.log('Wszystkie porady zostały dodane do Firestore!');
        } catch (error) {
            console.error('Błąd podczas dodawania porad do Firestore:', error);
        }
    }
};