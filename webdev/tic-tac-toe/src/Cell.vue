<template>
    <div :class="`flex h-32 w-32 cursor-pointer items-center justify-center border border-black text-5xl hover:bg-gray-200 ${cell === 'X' ? playersColors.playerX : playersColors.playerO
    }`" @click="$emit('click')">
        {{ cell }}
    </div>
</template>

<script setup lang="ts">
enum playersColors {
    playerX = 'text-red-500',
    playerO = 'text-blue-700',
}

interface Props {
    cell?: string;
}

defineProps<Props>();

defineEmits(['click']);
</script>