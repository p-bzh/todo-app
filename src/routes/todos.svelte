<script>
	import TodoForm from '../components/TodoForm.svelte';
	import Todo from '../components/Todo.svelte';
	import { tasks } from '../stores/todoStore';
</script>

<main>
	<h1 class="text-2xl font-bold text-center text-grey-800 md:text-3xl">My Todos</h1>
	<TodoForm />
	{#each $tasks as task}
		<Todo {task} index={task.id} />
	{/each}
</main>
