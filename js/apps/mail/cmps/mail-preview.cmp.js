import { mailService } from "../services/mail-service.cmp.js"
import mailPreviewToolbar from "../cmps/mail-preview-toolbar.cmp.js"

export default {
props:['mail'],
components:{
mailPreviewToolbar
},
template:`
    <section  class="mail-preview-main" @mouseover="hovered = true" @mouseleave="hovered = false" :class="[isHovered,isUnreadMail]" >
        <p class="mail-preview-title">
            <button @click.prevent="starMail"><i class="fas fa-star" v-bind:class="fullStar"></i></button>
            <span class="preview-title"> {{mail.title}}</span></p>
        <p class="mail-preview-txt">
       {{showTxt}}  <span v-if="!hovered" class="mail-preview-date">  {{mailDate}} </span></p>
        <mail-preview-toolbar :mail="mail" v-if="hovered"></mail-preview-toolbar>
    </section>
    
`,
data(){
   return {
       hovered:false
   }
},
methods:{
    starMail() {
        this.mail.isStared = !this.mail.isStared
       
        mailService.put(this.mail)
      },
},
computed:{
    showTxt(){
    if(this.mail.info.txt.length > 50) return this.mail.info.txt.substring(0,47)+'...'
    return this.mail.info.txt
    },
    isUnreadMail(){
     return {unread: !this.mail.isRead}
    },
    isHovered(){
      return {hovering: this.hovered}
    },
    isDraft(){
        return this.mail.status === 'draft'
    },  fullStar(){
        
        return {full : this.mail.isStared}
    },
    mailDate(){
        let date = new Date(this.mail.sentAt)
        let month = date.toLocaleString('default',{month:'short'})
        let day = date.getDate()
        return month + ' ' + day
    }

}
}



// {
//     id: "e101",
//     title: "YOU ARE AMAZING!",
//     info: {
//       txt: "Fullstack Me Baby!",
//       imgUrl: IMG_URL,
//       vidUrl: VIDEO_URL,
//       lables: ["important", "romantic"],
//     },
//     isRead: false,
//     isStared: false,
//     sentAt: 1551133930594,
//     to: "you@are.amazaing.com",
//     status: "inbox || sent || trash || draft",
//    },