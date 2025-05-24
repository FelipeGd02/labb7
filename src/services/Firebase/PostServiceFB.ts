import { db } from './FirebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

export const addTask = async (uid: string, task: any) => {
  await addDoc(collection(db, "tasks"), { ...task, uid, completed: false });
};

export const getTasks = async (uid: string) => {
  const q = query(collection(db, "tasks"), where("uid", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTask = async (id: string, data: any) => {
  const ref = doc(db, "tasks", id);
  await updateDoc(ref, data);
};

export const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, "tasks", id));
};
