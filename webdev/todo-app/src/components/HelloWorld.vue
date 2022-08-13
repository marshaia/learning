<template>

  <div class="font-mono">

    <div class="container mt-4 font-mono text-3xl font-bold text-center">
      <h1>{{ title }}</h1>
    </div>
    
    <form id="textTODO" @submit.prevent="addToDo">
          <div class="flex mx-4 mt-2 space-x-4">
              <input
                  class="flex items-center justify-center flex-1 px-3 mt-4 font-normal border-2 border-black rounded h-14"
                  v-model="newTodo"
                  type="text"
                  name="n1"
                  placeholder="Write your TO-DO here..."
              />
          </div>
      </form>

  </div>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

      <div class="flex mx-4 mt-10 space-x-4 font-mono text-2xl font-bold text-left border-b-2 border-black"> My List: </div>

      <div id="toDoList">
      
          <div v-for="todo in myTodos" :key="todo.id" class="flex mx-4 mt-4 space-x-4 font-mono text-gray-900 bg-white border border-black rounded-lg" >
            <div>
              <button @click="doneButton($event,todo.id)" class="inline-block w-1/12 px-3 py-3 ml-4 text-xs font-medium leading-tight transition duration-150 ease-in-out border-2 border-gray-800 rounded-full hover:bg-black focus:outline-none focus:ring-0" :class="{'bg-black': todo.isDone}"></button>
            </div>
	          <div class="w-10/12 text-justify" :class="{'line-through': todo.isDone}">{{todo.text}}</div>
            <button @click="removeButton(todo.id)" class="items-center inline-block w-1/12 px-1 py-1 rounded hover:bg-gray-200"><i class="fa fa-trash-o"></i></button>
          </div>
                    
      </div>

</template>

<script setup>
import { ref } from "vue";

const newTodo = ref('')
const myTodos = ref([])

let comList = localStorage.getItem('toDoList')
if (comList !== null) myTodos.value = JSON.parse(comList)


defineProps({
  title: {
    type: String,
    required: true,
  },
});


// Adds the To-Do to the List 
const addToDo = (e) => {    
  let input = {
    id: new Date().toISOString(),
    text: newTodo.value,
    isDone: false
  }

  document.getElementById("textTODO").reset()
  newTodo.value = ""
  myTodos.value.push(input)
  localStorage.setItem("toDoList",JSON.stringify(myTodos.value))
}



// Handles the DONE feature button
const doneButton = (e, id) => { 
  let todo = myTodos.value.find(todo => todo.id === id)
  todo.isDone = !todo.isDone
  
  localStorage.setItem("toDoList", JSON.stringify(myTodos.value));  
}


// Handles the REMOVE feature button
const removeButton = (id) => { 
  myTodos.value = myTodos.value.filter((e) => e.id !== id);
  localStorage.setItem("toDoList", JSON.stringify(myTodos.value));
}

</script>