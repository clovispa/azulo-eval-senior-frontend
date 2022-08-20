<template>
  <q-page class="column justify-end">
    <div class="row justify-center">

      <div class="col col-10 " >
          <div class="column items-end  ">
            <component-post
              v-for="item in postNoteBook"
              :key="item.id"
              :item="item"
            ></component-post>
          </div>
      </div>
    </div>
    <br>
    <br>
    <div class="row q-mb-md justify-center  ">
      <div class="col col-10 bg-primary items-end q-field--auto-height">
        <div class="column ">
        </div>
      </div>
    </div>

    <div class="row q-mb-md justify-center">
      <div class="col col-10 bg-primary">
        <div class="column">
          <div class="q-gutter-sm row ">
          </div>
        </div>
      </div>
    </div>
    <div class="row q-mb-md justify-center">
      <div class="col col-10 ">
        <div class="column items-center">
          <q-fab color="amber" text-color="black" icon="keyboard_arrow_left" direction="left">
            <q-fab-action color="amber" text-color="black"  @click="alert = true" icon="note" />
            <q-fab-action color="amber" text-color="black" @click="onClick" icon="attachment" />
          </q-fab>
        </div>
      </div>
    </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-editor
            v-model="editor"
            flat
            content-class="bg-amber-3"
            toolbar-text-color="white"
            toolbar-toggle-color="white"
            toolbar-bg="primary"
            :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }]
      ]"
          />
        </q-card-section>
        <q-card-section>
          <MapComponent></MapComponent>
        </q-card-section>


        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="addTask" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="row q-mb-md justify-center">
      <div class="col col-10 ">
        <div class="column ">
          <div class="q-pa-md" >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import {useRoute} from 'vue-router';
import {LocalStorage, useQuasar} from 'quasar'
import ComponentPost from 'components/ComponentPost.vue';
import MapComponent from 'components/MapComponent.vue';
interface PostNoteBook {
  text: string;
  idNote: number
  id: number

}




const router = useRoute()
const alert = ref(false)
const  editor = ref<string>('')
const postNoteBook = ref<Array<PostNoteBook>>([])
const $q = useQuasar()
let itemPost = ref<Array<PostNoteBook>>([])

function addTask() {
  if(LocalStorage.getItem('post') ) {
    postNoteBook.value = JSON.parse(LocalStorage.getItem('post') as string )
    postNoteBook.value.push({text : editor.value, idNote : getIdNote(), id: Date.now() })
  } else {
    postNoteBook.value.push({text : editor.value, idNote : getIdNote(), id: Date.now() })
  }
  LocalStorage.set('post', JSON.stringify(postNoteBook.value))
  postNoteBook.value = postNoteBook.value.filter((value: any) => value.idNote === getIdNote())
  editor.value = ''
}

function getIdNote() {
  return  Number(router.params.id)
}

watchEffect(() =>  {
  getPost(getIdNote())
});

function getPost(idNote : number) : any{
  if(!LocalStorage.getItem('post') ) return
  itemPost.value =  JSON.parse(LocalStorage.getItem('post') as string ).filter((value: any) => value.idNote === idNote) || []
  return postNoteBook.value = itemPost?.value
}
function onClick() {
  $q.dialog({
    message: 'Ingrese libreta de viaje',
    prompt: {
      model: '',
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    console.log('>>>> OK, received', data)
  }).onCancel(() => {
    // console.log('>>>> Cance l ...items: EssentialLinkProps[]')
  }).onDismiss(() => {
    // console.log(' OK and Cancel')
  })
}
</script>
<style scoped>

</style>
