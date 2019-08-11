export const addressGenerator = (address, mobile) => {
	let start, end;
	if (mobile) {
		start = address.substr(0, 15);
		end = address.substr(-3);
	} else {
		start = address.substr(0, 35);
		end = address.substr(-3);
	}
	return `${start}...${end}`;
};
