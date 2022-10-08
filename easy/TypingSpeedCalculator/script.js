const setOfWords=["In most organized forms of writing, such as essays, paragraphs contain a topic sentence . This topic sentence of the paragraph tells the reader what the paragraph will be about. Essays usually have multiple paragraphs that",
"A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. This is because paragraphs",
"A well-organized paragraph supports or develops a single controlling idea, which is expressed in a sentence called the topic sentence. A topic sentence has several important functions: it substantiates or supports an essay’s thesis statement ",
"Along with the smooth flow of sentences, a paragraph’s coherence may also be related to its length. If you have written a very long paragraph, one that fills a double-spaced typed page, for example, you should check it carefully to see if it  ",
"GitHub is the best place to share code with friends, co-workers, classmates, and complete strangers. Over 31 million people use GitHub to build amazing things together across 97 million repositories. With all the collaborative features of GitHub, ",
"Delivered in a form factor designed to be easy to install, manage and start, IBM Cloud Pak System provides you with ",
"An automaton Automata in plural is an abstract self-propelled computing device which follows a predetermined sequence of operations automatically. An automaton with a finite number of states is called a Finite Automaton FA or Finite State Machine FSM.",
"An automaton runs when it is given some sequence of inputs in discrete individual time steps or steps. An automaton processes one input picked from a set of symbols or letters, which is called an input alphabet. The symbols received by the automaton "];
const msg=document.getElementById('msg');
const typeWords=document.getElementById('typeWords');
const foot=document.getElementById('foot');
const btn=document.getElementById('btn');
let startTime,endTime;
const playGame=()=>{
    let randomNumber=Math.floor(Math.random()*setOfWords.length);
    msg.innerText=setOfWords[randomNumber];
    let date= new Date ();
    startTime=date.getTime();
    btn.innerText="Done";
}
const wordCounter=(str)=>{
    let response=str.split(" ").length;
    return response;
}
let cnt=0;
const compareWords=(str1,str2)=>{
    let words1=str1.split(" ");
    let words2=str2.split(" ");
    

    words1.forEach(function(item,index){
        if(item==words2[index]){
            cnt++;
        }

        
    })
    let date =new Date();
    endTime=date.getTime();
    let totalTime=((endTime-startTime)/1000);
    let speed=Math.round((cnt/totalTime)*60);
    let accuracy=Math.floor((cnt/words1.length)*100);
    let errorWords=(words1.length-cnt);
    return ("You typed at speed of "+ speed +" words per minute and in last para you wrote " + cnt + " words correct out of "+words1.length+" words , total number of error/left words are "+errorWords+" and your Accuracy is "+ accuracy+"%.");
}
const endPlay=()=>{
    
   
    let totalString=typeWords.value;
    let wordCount=wordCounter(totalString);
   

    let finalMsg="";
    finalMsg+=compareWords(msg.innerText,totalString);

    foot.innerText=finalMsg;


}
btn.addEventListener('click',function(){
    if(this.innerText=='Start'){
        foot.innerText=" ";
        typeWords.innerText=" ";
        msg.style = "margin-top:15px;padding:10px;margin-bottom:15px";
        typeWords.focus();
        typeWords.disabled=false;
        playGame();
    }
    else if(this.innerText=="Done"){
        typeWords.disabled=true;
        btn.innerText="Start";
        endPlay();
        
    }
   
})
rst.addEventListener('click',function(){
    location.reload();
})