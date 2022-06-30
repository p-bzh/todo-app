<script lang="ts">
	import { session } from '$app/stores';
	import { addTodo } from '../stores/todoStore';
	let text: string;

	const handleSubmit = () => {
		addTodo(text, $session.user.uid);
		text = '';
	};
</script>

<form class="my-6" on:submit|preventDefault={handleSubmit}>
	<div class="flex flex-col text-sm mb-2">
		<label for="todo" class="font-bold mb-2 text-grey-500">Todo</label>
		<input
			type="text"
			name="todo"
			placeholder="What you need to do ?"
			bind:value={text}
			class="appearance-none shadow-sm border border-grey-200 p-2 focus:outline-none focus:border-grey-500 rounded-lg"
		/>
	</div>
	<button
		type="submit"
		class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Add</button
	>
</form>
