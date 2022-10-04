import { ref } from 'vue';

export type UploaderHandler = (file: Record<string, any>) => void;

export default function useFileHandler() {
	const fileHandler = ref<UploaderHandler | null>(null);
	const currentPreview = ref<string | null>(null);

	return {
		fileHandler,
		unsetFileHandler,
		setFileHandler,
		handleFile,
		currentPreview,
		setCurrentPreview,
	};

	function setCurrentPreview(url: string | undefined | null) {
		currentPreview.value = url || null;
	}

	function unsetFileHandler() {
		fileHandler.value = null;
		currentPreview.value = null;
	}

	function setFileHandler(handler: UploaderHandler) {
		fileHandler.value = handler;
	}

	function handleFile(event: InputEvent) {
		if (fileHandler.value) {
			fileHandler.value(event);
		}

		unsetFileHandler();
	}
}
