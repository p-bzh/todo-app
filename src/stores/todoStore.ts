import { writable } from 'svelte/store';
import type { Task } from '../types';
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

export const tasks = writable(Array<Task>());

export const loadTasks = async (user_id: string) => {
	const q = query(collection(database, 'tasks'), where('user_id', '==', user_id));
	const result = await getDocs(q);
	result.forEach((task) => {
		tasks.update((cur) => {
			return [...cur, task.data()];
		});
	});
};

export const addTodo = async (text: string, user_id: string) => {
	const task: Task = {
		user_id,
		text,
		completed: false,
		created_at: new Date()
	};
	const response = await addDoc(collection(database, 'tasks'), task);
	task.id = response.id;
	tasks.update((cur) => {
		return [...cur, task];
	});
};

export const deleteTodo = async (id: string) => {
	await deleteDoc(doc(database, 'tasks', id));
	tasks.update((tasks) => {
		return tasks.filter((task) => task.id !== id);
	});
};

export const toggleTodoCompleted = async (id: string, currentState: boolean) => {
	const ref = doc(database, 'tasks', id);
	await updateDoc(ref, {
		completed: !currentState
	});
	let index: number | null;
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
