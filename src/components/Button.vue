<script setup>
defineProps({
  buttonText: String,
});
</script>

<template>
  <button class="button bg-white dark:bg-gray-500" type="button">
    {{ buttonText }}
  </button>
</template>

<style scoped>
.button {
  align-self: center;
  margin-bottom: 30px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid;
  transition: color 0.3s ease-in-out, transform 0.3s;
}

.button:hover {
  color: var(--secondary-text-color);
}

.button:active {
  transform: translateY(-5px);
}
</style>
