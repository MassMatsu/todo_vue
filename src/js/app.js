import Vue from "vue";

new Vue({
  el: '#todoApp',
  data: {
    task: '',
    todos: [
      // {id: 'xx', title: 'vue.js', isDone: false, isShow: true},
      // {id: 'xxxx', title: 'js', isDone: true, isShow: true}
    ],
    keyword: ''
  },

  methods: {
    addTask: function(){
      if(this.task !== ''){
        let uuid = UUID.generate();
        this.todos.push({id: uuid, title: this.task, isDone: false, isShow: true});
      }
      this.task = ''; 
    },
    deleteList: function(id){
      
      const searchId = id;
      const index = this.todos.findIndex(function(todo){   // 配列の中のオブジェクトのインデックス番号をオブジェクトの一つの要素を経由して取得する
        return todo.id === searchId;
      });

      console.log(index);
      this.todos.splice(index, 1);
    },
    toggleDone: function(id){

      const searchId = id;
      const index = this.todos.findIndex(function(todo){
        return todo.id === searchId;
      });
      this.todos[index].isDone = !this.todos[index].isDone;

      console.log(this.todos[index].isDone)
    },
    toggleisShow: function(id){
      const searchId = id;
      const index = this.todos.findIndex(function(todo){
        return todo.id === searchId;
      });
      this.todos[index].isShow = !this.todos[index].isShow;
    },
    editTodo: function(id, $event){
      const searchId = id;
      const index = this.todos.findIndex(function(todo){
        return todo.id === searchId;
      });

      if($event.target.value !== ''){
       this.todos[index].title = $event.target.value;
      }
      this.todos[index].isShow = !this.todos[index].isShow;
    }

  },
  
  computed: {
    classObjIcon: function(){
      return function(id){    // computedオブジェクトに引数を取っているので、こういう書き方になる

        const searchId = id;
        const index = this.todos.findIndex(function(todo){
          return todo.id === searchId;
        });
        //console.log('index',index);
        return {
          "fa-check-circle": this.todos[index].isDone,
          "fa-circle-thin": !this.todos[index].isDone
        }
      }  
    },
    classObj: function(){
      return function(id){

        const searchId = id;
        const index = this.todos.findIndex(function(todo){
          return todo.id === searchId;
        });
        return {
        "list__item-done": this.todos[index].isDone
        }
      }
    },

    filteredTodos: function(){
      const regexp = new RegExp('^' + this.keyword,'i');
    
      if(this.keyword === ''){
        console.log('this.todos: ', this.todos);
        let filteredTodos = this.todos;
        return filteredTodos; 
      
      }else{
        let filteredTodos = this.todos.filter(function(todo){ // filterメソッド。配列の中から条件に合う要素を新たな配列の中に入れる
          // console.log('list: ', todo.title);
          // console.log('regexp: ', regexp);
          return todo.title.match(regexp);  // 正規表現にマッチするタイトル
        });
        console.log('filteredTodos: ',filteredTodos);
        return filteredTodos;
      } 
    } 
  }
});
