<script setup lang="ts">
import { defineProps , ref , watch} from 'vue';
const props = defineProps<{
	label: string;
	type: string;
	modelValue: string;
	placeholder?: string;
	rules: ((value : string) => string | null)[]
}>();


const emits = defineEmits<{
	(e: 'update:modelValue', value: string): void;
	(e: 'invalid', value: boolean): void;
}>();




// état interne
const errors = ref<string[]>([]);

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
  emits("update:modelValue", target.value);
  const newValue = target.value;
  emits("update:modelValue", newValue);
  validate(newValue);
};

// valide au montage avec la valeur initiale
watch(() => props.modelValue, (newVal) => {
  validate(newVal);
}, { immediate: true });

</script>

<template>
	<label class="label" :for="type">
		<span>{{ label }}</span> 
		<input :id="type" :type="type" :placeholder="placeholder" :value="modelValue" @input="onInput"  :class="{ 'input-error': errors.length > 0 }"  />
	</label>
	  <span v-for="(err, i) in errors" :key="i" class="error">
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
