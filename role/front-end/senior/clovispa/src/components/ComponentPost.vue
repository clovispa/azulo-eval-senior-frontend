<template>
  <q-expansion-item
    class="shadow-1 overflow-hidden"
    style="border-radius: 10px; margin-bottom: 8px;"
    icon="explore"
    label="Nota"
    header-class="bg-primary text-white"
    expand-icon-class="text-white"

  >
    <q-card>
      <q-card-section>
        {{item.text}}
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
defineProps({
  item: { type: Object, required: true },
})
</script>
<style scoped>

</style>
