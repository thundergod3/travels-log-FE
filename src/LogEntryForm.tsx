import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { createTravelItem } from "./API";

const LogEntryForm = ({ location, onClose }: any): JSX.Element => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data: any) => {
		try {
			setLoading(true);
			data.latitude = location.latitude;
			data.longitude = location.longitude;

			const created = await createTravelItem(data);
			setLoading(false);
			onClose();
		} catch (error) {
			console.log(error);
			setError(error.message);
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="entry-form">
			{error && <h3 className="error">{error}</h3>}
			<label htmlFor="title">Title</label>
			<input name="title" required ref={register} />
			<label htmlFor="comments">Comments</label>
			<textarea name="comments" rows={3} ref={register}></textarea>
			<label htmlFor="description">Description</label>
			<textarea name="description" rows={3} ref={register}></textarea>
			<label htmlFor="image">Image</label>
			<input name="image" ref={register} />
			<label htmlFor="visitDate">Visit Date</label>
			<input name="visitDate" type="date" required ref={register} />
			<button disabled={loading}>
				{loading ? "Loading..." : "Create Entry"}
			</button>
		</form>
	);
};

export default LogEntryForm;
