import { writable } from "svelte/store"

const Headers = {
	"X-Inertia-Frame": "true",
}

function createFrame(attributes) {
	return {
		...attributes,
		path: null,
		properties: {},
		id: Symbol(),
		fetch() {
			return fetch(this.url, { headers: Headers })
				.then((response) => response.json())
				.then(({ path, properties }) => {
					this.path = path
					this.properties = properties
				})
		},
	}
}

function createFramesStore() {
	const { set, update, subscribe } = writable([])

	const open = (frame) => {
		update((frames) => [...frames, createFrame(frame)])
	}

	const close = ({ id }) => {
		update((frames) => frames.filter((frame) => frame.id !== id))
	}

	return {
		set,
		update,
		subscribe,
		open,
		close,
	}
}

const theFramesStore = createFramesStore()

export const useFramesStore = () => theFramesStore
