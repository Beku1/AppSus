
export default {
props:['mail'],
template:`
    <section  class="mail-preview-main" :class="isUnreadMail">
        <p class="mail-preview-title"><span v-if="isDraft">Draft Title: </span>{{mail.title}}</p>
        <p class="mail-preview-txt"><span v-if="isDraft">Draft Text:</span>{{showTxt}}</p>
    </section>
    
`,
computed:{
    showTxt(){
    if(this.mail.info.txt.length > 50) return this.mail.info.txt.substring(0,47)+'...'
    return this.mail.info.txt
    },
    isUnreadMail(){
     return {unread: !this.mail.isRead}
    },
    isDraft(){
        return this.mail.status === 'draft'
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