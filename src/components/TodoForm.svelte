<script>
	import { addTodo } from '../stores/todoStore';
	let todo;

	const handleSubmit = () => {
		addTodo(todo);
		todo = null;
	};
</script>

<form class="my-6" on:submit|preventDefault={handleSubmit}>
	<div class="flex flex-col text-sm mb-2">
		<label for="todo" class="font-bold mb-2 text-grey-500">Todo</label>
		<input
			type="text"
			name="todo"
			placeholder="What you need to do ?"
			bind:value={todo}
			class="appearance-none shadow-sm border border-grey-200 p-2 focus:outline-none focus:border-grey-500 rounded-lg"
		/>
	</div>
	<button
		type="submit"
		class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
		>Submit</button
	>
</form>
