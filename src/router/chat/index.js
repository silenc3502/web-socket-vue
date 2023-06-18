import Vue from 'vue'
import VueRouter from 'vue-router'

import ChatView from '@/views/chat/ChatView.vue'

Vue.use(VueRouter)

const chatRoutes = [
    {
        path: '/chat-page',
        name: 'ChatView',
        component: ChatView
    }
]

export default chatRoutes
