export type User = {
	uid: string;
	email: string;
};
export type Task = {
	id: string;
	user_id: string;
	text: string;
	completed: boolean;
	created_at: Date;
};
