/*------------------------------------------*/
// Constants
const contact_choose_container = document.getElementById("contact-choose-container");
const contact_prompt_container = document.getElementById("contact-prompt-container");
const contact_prompt_paragraph = document.getElementById("contact-prompt-p");
const display_value_on_hover = document.getElementsByClassName("display-value-on-hover");
const chapter_contact = document.getElementById("chapter-contact-me");
const contact_me_button = document.getElementById("contact-me-btn");
const link_to_contact = document.getElementById("link-to-contact");
const diplome_timeline_elements = document.getElementsByClassName("diplome-timeline-element");
const diplome_timeline_display_paragraph = document.getElementById("diplome-viewer-paragraph");
const experiences_number = 7;
var current_display_id = 0;
var text_to_display_value = "";
var user_welcomed = false;
var experiences_paragraphs = [];
var experiences_show_buttons = [];
var last_circle_changed = diplome_timeline_elements[0].firstElementChild;

/*------------------------------------------*/

class Todo extends HTMLElement {
  contructor(){
    this.super();
  }
}
window.customElements.define('to-do',Todo);

/*------------------------------------------*/

// Functions
function change_visual_state(button, paragraph) {
  if(paragraph.style.display === "none") {
      show(paragraph);
      button.innerHTML = "<span class='material-icons'>chevron_left</span>";
    } else {
      hide(paragraph);
      button.innerHTML = "<span class='material-icons'>chevron_right</span>"
    }
}

function hide(element) {
  element.style.display = "none";
}

function show(element, display="block") {
  element.style.display = display;
}

function add_hide_show_event_listener(activator, element, event="click"){
  activator.addEventListener(event, function(){
    change_visual_state(activator, element);
  });
}

function write(paragraph, text) {
   paragraph.innerText = text;
 }
 
function append_char_to_paragraph(paragraph, char) {
   paragraph.innerText = paragraph.innerText + char;
 }
 
function display_text_wrapper(paragraph, text_to_write, wait_time, id=0) {
   var length = text_to_write.length;
   var i = 0;
   var text = "";
   
   function display_text() {
     if(i<length&&id===current_display_id) {
       text += text_to_write[i]
       write(paragraph, text+"_");
       i++
       setTimeout(display_text,wait_time);
     }
   }
   write(paragraph, "");
   display_text();
 }
 
function greet_user(id) {
   display_text_wrapper(
     contact_prompt_paragraph,
     "N'hésitez pas à me contacter !",
     75,
     id
    );
 }
 
 function go_to_contact() {
    window.scrollTo(0, chapter_contact.offsetTop);
    current_display_id++;
    greet_user(current_display_id);
 }

/*------------------------------------------*/

// Setup

// Gather every paragraph
for(let i=1; i<=experiences_number; i++) {
  experiences_paragraphs.push(document.getElementById(`experiences-paragraph-${i}`));
}
// Hide the paragraphs
for(const p of experiences_paragraphs){
  hide(p);
}
// Gather every button
for(let i=1; i<=experiences_number; i++) {
  experiences_show_buttons.push(document.getElementById(`experience-show-button-${i}`));
}
// Bind buttons with paragraphs
for(let i=0; i<7; i++){
  add_hide_show_event_listener(experiences_show_buttons[i], experiences_paragraphs[i]);
}

for(const button of display_value_on_hover) {
  button.addEventListener("mouseenter",()=>{
    current_display_id++;
    display_text_wrapper(
      contact_prompt_paragraph,
      button.getAttribute("contact"),
      75,
      current_display_id
      );
  });
}

chapter_contact.addEventListener("mouseenter",()=>{
  if(!user_welcomed){
    user_welcomed = true;
    current_display_id++
    greet_user(current_display_id);
  }
});

contact_me_button.addEventListener("click",()=>{
  go_to_contact();
});

for(const element of diplome_timeline_elements) {
  element.addEventListener("mouseenter",()=>{ // Can also be "click", i don't know yet
    diplome_timeline_display_paragraph.innerText = element.getAttribute("data-content");
    last_circle_changed.style.backgroundColor = "grey";
    last_circle_changed = element.firstElementChild;
    last_circle_changed.style.backgroundColor = "var(--color-em)";
  });
}

// s'attaquer au design de la page d'accueil