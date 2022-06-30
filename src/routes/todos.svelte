<script context="module" lang="ts">
	import { loadTasks } from '../stores/todoStore';

	export const load: import('@sveltejs/kit').Load = async ({ session }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		const { user } = session;
		await loadTasks(user.uid);
		return {
			props: {
				user
			}
		};
	};
</script>

<script lang="ts">
	import TodoForm from '../components/TodoForm.svelte';
	import Todo from '../components/Todo.svelte';
	import { tasks } from '../stores/todoStore';
	import { auth } from '../firebase';
	import { signOut } from 'firebase/auth';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { User } from 'src/types';
	export let user: User;

	const handleLogout = async () => {
		await signOut(auth);
		$session.user = undefined;
		goto('/login');
	};
</script>

<main>
	<p class="text-right">{user.email}</p>
	<button
		class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
		on:click={() => handleLogout()}>logout</button
	>
	<h1 class="text-2xl font-bold text-center text-grey-800 md:text-3xl">My Todos</h1>
	<TodoForm />
	{#each $tasks as task}
		<Todo {task} />
	{/each}
</main>
