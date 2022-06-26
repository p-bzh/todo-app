<script>
	import { deleteTodo, toggleTodoCompleted } from '../stores/todoStore';
	export let task;
</script>

<li class="bg-white flex items-center shadow-sm border border-grey-200 rounded-lg my-2 py-2 px-4">
	<input
		name="completed"
		type="checkbox"
		checked={task.completed}
		on:change={() => toggleTodoCompleted(task.id, task.completed)}
		class="mr-2 form-checkbox h-5 w-5"
	/>
	<span class={`flex-1 text-grey-800 ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
	<button
		class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
		on:click={() => deleteTodo(task.id)}>Delete</button
	>
</li>
