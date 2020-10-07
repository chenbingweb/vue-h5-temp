import Tool from "./Tool";


let Obj={
  install:function(Vue,option){
    
    Vue.prototype.$tool=new Tool();
    Vue.prototype.$param=function(router){
      return router.history.current
    }
  }
}

class Node{
  constructor(ele){
    this.elememnt=ele;
    this.next=null
  }
}
class linkList{
  constructor(){
    this.length=0;
    this.head = null
  }
  addEle(ele){
    let node =new Node(ele)
    let cur 
    if(this.head==null)
    {
      this.head=node
    }
    else
    {
      cur = this.head;
      while(cur.next){
        cur=cur.next
      }
      cur.next = node;
    }
    this.length+=1
  }
  printLink(){
    let cur = this.head
    let str = []
    while(cur){
      str.push(cur.elememnt)
      cur=cur.next
     
    }
    console.log(str.join('=>'))
  }
}
let link = new linkList();
link.addEle('张三')
link.addEle('张三1')
link.printLink()



export default Obj