
export default {
props:['mail'],
template:`
    <section class="mail-preview-main" :class="isUnreadMail">
        <p class="mail-preview-title">{{mail.title}}</p>
        <p class="mail-preview-txt">{{showTxt}}</p>
    </section>
`,
computed:{
    showTxt(){
    if(this.mail.info.txt.length > 50) return this.mail.info.txt.substring(0,47)+'...'
    return this.mail.info.txt
    },
    isUnreadMail(){
     return {unread: !this.mail.isRead}
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