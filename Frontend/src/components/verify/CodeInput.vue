<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

const props = defineProps<{
  length?: number; // par défaut 4
}>();

const emit = defineEmits<{
  (e: "complete", code: string): void;
}>();

const length = props.length ?? 4;
const values = ref<string[]>(Array(length).fill(""));
const inputs = ref<HTMLInputElement[]>([]);

function onInput(e: Event, index: number) {
  const target = e.target as HTMLInputElement;
  const value = target.value.replace(/[^0-9]/g, "");
  values.value[index] = value;

  if (value && index < length - 1) {
    inputs.value[index + 1]?.focus();
  }
  checkComplete();
}

function onKeyDown(e: KeyboardEvent, index: number) {
  if (e.key === "Backspace" && !values.value[index] && index > 0) {
    inputs.value[index - 1]?.focus();
  }
}

function onPaste(e: ClipboardEvent) {
  e.preventDefault();
  const pasted = e.clipboardData?.getData("text") ?? "";
  const digits = pasted.replace(/[^0-9]/g, "").split("").slice(0, length);

  digits.forEach((d, i) => (values.value[i] = d));

  nextTick(() => {
    if (digits.length === length) {
      checkComplete();
    } else {
      inputs.value[digits.length]?.focus();
    }
  });
}

function checkComplete() {
  const code = values.value.join("");
  if (code.length === length) {
    emit("complete", code);
  }
}

onMounted(() => {
  if (inputs.value[0]) {
    inputs.value[0].addEventListener("paste", onPaste);
  }
});
</script>

<template>
  <div class="code-input">
    <input
      v-for="(_, i) in length"
      :key="i"
      ref="inputs"
      type="text"
      maxlength="1"
      v-model="values[i]"
      @input="onInput($event, i)"
      @keydown="onKeyDown($event, i)"
    />
  </div>
</template>

<style scoped>
.code-input {
  display: flex;
  gap: 14px;
  justify-content: center;
}

.code-input input {
  width: 55px;
  height: 75px;
  text-align: center;
  font-size: 22px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  color: #8f98a7;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.code-input input:focus {
  border-color: var(--primary, #007bff);
}
</style>
