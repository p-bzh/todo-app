import { writable } from 'svelte/store';
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
	where,
	query
} from 'firebase/firestore';
import { database } from '../firebase';

export const tasks = writable([]);

export const loadTasks = async (user_id) => {
	const q = query(collection(database, 'tasks'), where('user_id', '==', user_id));
	const result = await getDocs(q);
	result.forEach((task) => {
		tasks.update((cur) => {
			return [...cur, task.data()];
		});
	});
	console.log(typeof tasks[0]);
};

export const addTodo = async (text, user_id) => {
	const task = {
		user_id,
		text,
		completed: false,
		created_at: new Date()
	};
	const response = await addDoc(collection(database, 'tasks'), task);
	task.id = response.id;
	console.log(task);
	tasks.update((cur) => {
		return [...cur, task];
	});
};

export const deleteTodo = async (id) => {
	await deleteDoc(doc(database, 'tasks', id));
	tasks.update((tasks) => {
		return tasks.filter((task) => task.id !== id);
	});
};

export const toggleTodoCompleted = async (id, currentState) => {
	const ref = doc(database, 'tasks', id);
	await updateDoc(ref, {
		completed: !currentState
	});
	let index = null;
	tasks.update((tasks) => {
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].id === id) {
				index = i;
			}
		}
		if (index != null) {
			tasks[index].completed = !tasks[index].completed;
		}
		return tasks;
	});
};
