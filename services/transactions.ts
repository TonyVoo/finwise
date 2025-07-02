import {collection, addDoc, orderBy, query, getDocs, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import {auth, firestore} from './firebase'

const getUserTransactionsRef = () => {
    const uid = auth.currentUser?.uid;
    return collection(firestore, `users/${uid}/transactions`);
}

export const addTransaction = async (data: any) => {
    const ref = getUserTransactionsRef();
    return await addDoc(ref, data);
}

export const getTransactions = async () => {
    const ref = getUserTransactionsRef();
    const q = query(ref, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id,...doc.data()}));
};

export const updateTransaction = async (id: string, data: any) => {
    const docRef = doc(firestore, `users/${auth.currentUser?.uid}/transactions/${id}`);
    await updateDoc(docRef, data);
};

export const deleteTransaction = async (id: string) => {
    const docRef = doc(firestore, `users/${auth.currentUser?.uid}/transactions/${id}`);
    await deleteDoc(docRef);
}

export const getTransactionsByDate = async (dateString: string) => {
    const uid = auth.currentUser?.uid;
    if(!uid) return [];

    const start = new
}