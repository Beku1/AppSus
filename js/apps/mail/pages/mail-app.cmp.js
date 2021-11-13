import { mailService } from '../services/mail-service.cmp.js'
// import mailCompose from '../cmps/mail-compose.cmp.js'

import mailList from '../cmps/mail-list.cmp.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'
import userMsg from '../../../cmps/user-msg.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'

export default {
  components: {
    // mailCompose,
    mailFilter,
    mailFolderList,
    mailList,
    userMsg,
  },
  template: `
    <section class="mail-app-main">
        <user-msg/>
         <router-view></router-view>
        <mail-filter @sorted="setSort" @filtered="setFilter" />
         <mail-folder-list @foldered="setFolder"/>
        <mail-list :mails="mails"/>
    </section>
`,
  data() {
    return {
      mails: null,
      filterBy: {
        read: '',
        txt: '',
        folder: 'inbox',
        isStared: false,
      },
      sortBy: {
        type: 'date',
        isBackwards: true,
      },
    }
  },
  created() {
    this.loadMails().then(() => this.setFilter(this.filterBy))
    eventBus.$on('getMails', this.loadMails)
  },
  destroyed() {
    eventBus.$off('getMails')
  },
  methods: {
    loadMails(isGoMail = false) {
        // if(isGoMail)
      return mailService.query().then((mails) => {
        this.mails = mails
        let unreadCount = 0
        this.mails.forEach((mail) => {
          if (!mail.isRead) unreadCount++
        })
        eventBus.$emit('unreadCount', unreadCount)
        return mails
      })
    },
    setFolder(folderType) {
      if (folderType === 'star') {
        this.filterBy.isStared = true
      } else if (folderType !== 'star') {
        this.filterBy.folder = folderType
        this.filterBy.isStared = false
      }

      this.setFilter(this.filterBy)
    },

    setFilter(filterBy) {
      filterBy.folder = this.filterBy.folder
      mailService.mailFilterBy(filterBy, this.mails).then((mails) => {
        if (this.filterBy.isStared) {
          return (mails = mailService
            .mailFilterByStar(this.mails)
            .then((mails) => {
              return (this.mails = mails)
            }))
        }

        this.mails = mails
      })
    },
    setSort(sortBy) {
      if (sortBy.type === 'title')
        this.mails.sort((a, b) => a.title.localeCompare(b.title))
      else {
        this.mails.sort((a, b) => {
          a.sentAt - b.sentAt
        })
      }
      if (sortBy.isBackwards) this.mails.reverse()
    },
  },
  computed: {},
}

// filterBy:{
//     txt:null,
//     read:null,
// }
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
