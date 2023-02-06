export const load = async ({ page: { path, params } }) => ({
	props: {
		params,
		path
	}
});