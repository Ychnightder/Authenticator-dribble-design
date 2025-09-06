<script setup lang="ts">
import { defineProps, ref } from 'vue';
const props = defineProps<{
	label: string;
	type: string;
	modelValue: string;
	placeholder?: string;
	rules: ((value: string) => string | null)[];
	ServerError: boolean;
	serverMessage?: string | null;
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', value: string): void;
	(e: 'invalid', value: boolean): void;
	(e: 'serverMessage', value: string| null): void;
}>();

// état interne
const errors = ref<string[]>([]);
const touched = ref(false);

const validate = (value: string) => {
	errors.value = [];
	if (props.rules) {
		for (const rule of props.rules) {
			const error = rule(value);
			if (error) errors.value.push(error);
		}
	}
	emits('invalid', errors.value.length > 0);
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  // met à jour la valeur
  emits("update:modelValue", value);

  // si vide, reset les erreurs serveur pour ce champ
  if (!value) {
    emits("serverMessage", null); // ou une prop/serverErrors que tu passes depuis parent
  }

  // validation côté client
  validate(value);
};


const onBlur = () => {
  touched.value = true;
  validate(props.modelValue);
};


</script>
<template>
	<label class="label" :for="type">
		<span>{{ label }}</span>
		<input
			:id="type"
			:type="type"
			:placeholder="placeholder"
			:value="modelValue"
			@input="onInput"
			@blur="onBlur"
			:class="{ 'input-error': errors.length > 0 && touched || ServerError }" />
		<span v-if="ServerError && serverMessage" class="error">
			{{ serverMessage }}
		</span>
	</label>
	<span v-if="touched " v-for="(err, i) in errors" :key="i" class="error">
		{{ err }}
	</span>
</template>

<style scoped>
.label {
	font-size: 14px;
	display: flex;
	flex-direction: column;
	width: 375px;
	gap: 9px;
	color: var(--primary);
}
.label span {
	margin-left: 2px;
}

.label input {
	border: none;
	border-radius: 5px;
	border: 1px solid #ddd;
	outline: unset;
	padding: 13px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.label input.input-error {
	border-color: rgba(255, 0, 0, 0.531);
}

.error {
	margin-top: 6px;
	color: rgba(255, 0, 0, 0.531);
	font-size: 14px;
}
</style>
