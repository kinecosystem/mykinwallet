export const addressGenerator = address => {
	const start = address.substr(0, 35);
	const end = address.substr(-3);
	return `${start}...${end}`;
};
