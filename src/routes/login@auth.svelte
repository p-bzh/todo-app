<script lang="ts">
	import { auth } from '../firebase';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	let email: string, password: string;
	const handleLogin = async () => {
		try {
			const userCredentials = await signInWithEmailAndPassword(auth, email, password);
			$session.user = userCredentials.user;
			goto('/todos');
		} catch (err) {
			console.error(err);
		}
	};
</script>

<div class="flex flex-col items-center justify-center">
	<h2>Sign In</h2>
	<p>No account ? <a href="/signup">Create an account</a></p>
	<form class="w-full" on:submit|preventDefault={handleLogin}>
		<div class="flex flex-col my-2">
			<label for="">Email</label>
			<input class="leading-5" type="email" bind:value={email} />
		</div>
		<div class="flex flex-col my-2">
			<label for="">Password</label>
			<input class="leading-5" type="password" bind:value={password} />
		</div>
		<button class="w-full p-2 my-2 text-sm bg-purple-700 text-white hover:bg-purple-800"
			>Sign In</button
		>
	</form>
</div>
