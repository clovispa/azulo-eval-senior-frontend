<template>

  <q-item
    @click="navigateTo(id , title)"
    clickable
    v-ripple
    :class="{'isActive' : $attrs.select === props.id, 'no-isActive' : $attrs.select !== props.id}"
  >
    <q-item-section>
      <q-item-label lines="1" class="tittle-notes">
        {{ title}}
      </q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-avatar>
        <q-icon color="red" name="delete" />
      </q-avatar>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

import {useRouter} from 'vue-router';
import { defineEmits } from 'vue'
export interface LinkProps {
  title: string;
  id?: any;
}
const emit = defineEmits(['selectUser'])
const props = defineProps<LinkProps>()
const router = useRouter()

function navigateTo(id: any, title: any) {
  emit('selectUser', id, title)
  router.push( {name: 'notebooks', params: { id: props.id, name: props.title }})
}

</script>
<style scoped>
.tittle-notes {
  text-align: left;
  font-size: 20px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-weight: bold;
}

.isActive {
  background: #00A0F7;
}
.no-isActive {

  background: #FFFFFF;
}
</style>
