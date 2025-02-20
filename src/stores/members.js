import { defineStore } from 'pinia'

export const useMemberStore = defineStore('members', {
  state: () => ({
    members: [
      {
        id: 1,
        name: '南城佳佳',
        role: '美工，前端，服务器维护',
        avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2643437355&spec=640&img_type=jpg',
        skills: ['C#', 'C++', 'PR,AE,PS']
      },
      {
        id: 2,
        name: '枫',
        role: '全栈，服务器维护',
        avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2147606879&spec=640&img_type=jpg',
        skills: ['VUE', 'JS', 'Python']
      },
      {
        id: 3,
        name: 'ais',
        role: '混子（doge',
        avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2784810272&spec=640&img_type=jpg',
        skills: ['C']
      }
    ]
  })
}) 