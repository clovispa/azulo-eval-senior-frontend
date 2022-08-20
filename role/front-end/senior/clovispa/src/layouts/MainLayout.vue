<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="toggleLeftDrawer"
          />
          <span class="q-subtitle-1 q-pl-md message-style">
            {{ message }}
          </span>
          <q-space/>

          <q-btn round flat icon="search" />

        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <img :src="dataStore.objGeneral.imagen" />
          </q-avatar>

          <q-space />

          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>

        <q-toolbar class="bg-grey-2">
          <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="search" placeholder="Buscar libreta de viaje">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>
        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <p class="tittle-notes">{{ dataStore.objGeneral.tittle }}</p>
            <ComponentLink
              v-for="link in FilterNoteBook"
              :key="link?.title"
              v-bind="link"
              :select="select"
              @selectUser="selectUser"
            />
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
        <div>
          <a  class="btn-wsp" >
            <q-btn
              flat
              dense
              round
              icon="add"
              @click="addItem"
            />
          </a>
        </div>
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup lang="ts">


import {onMounted, ref, computed } from 'vue';
import {LocalStorage, useQuasar} from 'quasar'
import ComponentLink, { LinkProps } from 'components/ComponentLink.vue';
import {useDataGeneralStore} from 'stores/dataGeneral';

const essentialLinks = ref<Array<LinkProps>>([])
const leftDrawerOpen = ref(false)
const select = ref('')

const $q = useQuasar()
const search = ref('')
const message = ref('')
const dataStore = useDataGeneralStore()

onMounted(() => {
  dataStore.getDataGeneral()
  getLinks()
})


const FilterNoteBook = computed(() =>{
  return essentialLinks.value.filter((str) => {
    return str.title.toLowerCase().includes(search.value.toLowerCase());
  });
})
const style = computed(() => ({
  height: $q.screen.height + 'px'
}))

function getLinks() {
  if(!LocalStorage.getItem('note.note') ) return
  essentialLinks.value = JSON.parse(LocalStorage.getItem('note.note') as string )
}


function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function addItem () {
  $q.dialog({
    message: 'Ingrese libreta de viaje',
    prompt: {
      model: '',
      type: 'text' // optional
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    essentialLinks.value.push({title : data, id : Date.now()})
    LocalStorage.set('note.note', JSON.stringify(essentialLinks.value))
  }).onCancel(() => {
    // console.log('>>>> Cance l ...items: EssentialLinkProps[]')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function selectUser (id: any, tittle: any ) {
  select.value = id;
  message.value = tittle
}
</script>

<style lang="sass" scoped>
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #1f1d31
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem



</style>
<style>
.btn-wsp{
  position:fixed;
  width:60px;
  height:60px;
  line-height: 57px;
  bottom:65px;
  right:25px;
  background:#1976D2;
  color:#FFF;
  border-radius:50px;
  text-align:center;
  font-size:35px;
  box-shadow: 0px 1px 10px rgba(0,0,0,0.3);
  z-index:100;
  transition: all 300ms ease;
}
.btn-wsp:hover{
  background: #1976D2;
}
@media only screen and (min-width:320px) and (max-width:768px){
  .btn-wsp{
    width:63px;
    height:63px;
    line-height: 86px;
  }
}
.tittle-notes {
  text-align: center;
  font-size: 32px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: bold;
}

.message-style{
  font-weight: bold;
}
</style>
