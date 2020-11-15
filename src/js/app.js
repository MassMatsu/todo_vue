import Vue from "vue";

new Vue({
  el: '#todoApp',
  data: {
    task: '',
    todos: [
      {id: 'xx', title: 'vue.js', isDone: false, isShow: true},
      {id: 'xxxx', title: 'js', isDone: true, isShow: true}
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
    deleteList: function(id){ // htmlでの引数はindexで良い。そうすればわざわざfindIndex()を使わなくてもよくなる
      
      const searchId = id;
      const index = this.todos.findIndex(function(todo){   // 配列の中のオブジェクトのインデックス番号をオブジェクトの一つの要素を経由して取得する
        return todo.id === searchId;
      });

      console.log(index);
      this.todos.splice(index, 1);
    },
    toggleDone: function(todo){

      todo.isDone = !todo.isDone;

      console.log(todo.isDone)
    },
    toggleisShow: function(todo){
  
      todo.isShow = !todo.isShow;
    },
    editTodo: function(todo, $event){
    
      if($event.target.value !== ''){
      todo.title = $event.target.value;
      }
      todo.isShow = !todo.isShow;
    }

  },
  
  computed: {
    classObjIcon: function(){
      return function(todo){    // computedオブジェクトに引数を取っているので、こういう書き方になる

        return {
          "fa-check-circle": todo.isDone,
          "fa-circle-thin": !todo.isDone
        }
      }  
    },
    classObj: function(){
      return function(todo){

        return {
        "list__item-done": todo.isDone
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
