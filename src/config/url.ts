const isProd = import.meta.env.VITE_NODE_ENV !== "dev";

const dev = {
	backend: {
		url: "http://localhost:4000",
		version: "v1",
	},
};

const prd = {
	backend: {
		url: "",
		version: "",
	},
};

export const urls = isProd ? prd : dev;
