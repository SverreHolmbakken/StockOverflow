export function readURL() {
	const allURL = window.location.href;

	if (allURL.includes('blog')) {
		const slug = window.location.search;
		return slug.slice(1);
	}
	return undefined;
}