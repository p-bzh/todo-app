<script>
	import { auth } from '../firebase';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { createUserWithEmailAndPassword } from 'firebase/auth';

	let email, password;

	const handleSignUp = async () => {
		try {
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			$session.user = userCredentials.user;
			goto('/todos');
		} catch (err) {
			console.error(err.message);
		}
	};
</script>

<div class="flex flex-col items-center justify-center">
	<h2>Sign Up</h2>
	<p>Already have an account ? <a href="/login">Sign In</a></p>
	<form class="w-full" on:submit|preventDefault={handleSignUp}>
		<div class="flex flex-col my-2">
			<label for="">Email</label>
			<input class="leading-5" type="email" bind:value={email} />
		</div>
		<div flex class="flex flex-col my-2">
			<label for="">Password</label>
			<input class="leading-5" type="password" bind:value={password} />
		</div>
		<button class="w-full p-2 my-2 text-sm bg-purple-700 text-white hover:bg-purple-800"
			>Sign Up</button
		>
	</form>
</div>
