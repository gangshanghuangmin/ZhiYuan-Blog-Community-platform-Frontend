import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义评论的数据结构
export interface Comment {
    id: number
    content: string
    liked: boolean
    avatar?: string
    username?: string
    image?: string
    time?: string
    replies?: Comment[]
}

export const useCommentStore = defineStore('commentStore', () => {
    const comments = ref<Comment[]>([])

    // --- 工具函数 ---
    const saveToStorage = () => {
        localStorage.setItem('comments', JSON.stringify(comments.value))
    }

    const loadFromStorage = () => {
        const saved = localStorage.getItem('comments')
        if (saved) comments.value = JSON.parse(saved)
    }

    // 递归查找评论或回复
    const findCommentById = (list: Comment[], id: number): Comment | null => {
        for (const comment of list) {
            if (comment.id === id) return comment
            if (comment.replies) {
                const found = findCommentById(comment.replies, id)
                if (found) return found
            }
        }
        return null
    }

    // --- 添加评论 ---
    const addComment = (comment: Comment) => {
        comments.value.unshift(comment)  // 最新的评论放在最前面
        saveToStorage()
    }

    // --- 添加回复（支持多层嵌套）---
    const addReply = (parentId: number, reply: Comment) => {
        const parent = findCommentById(comments.value, parentId);
        if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.unshift(reply); // 保证最新的回复排在最前面
            saveToStorage();
        }
    }


    // --- 删除评论或回复 ---
    const deleteComment = (id: number) => {
        const deleteRecursive = (list: Comment[]): Comment[] => {
          return list.filter(comment => {
            if (comment.id === id) return false;
            if (comment.replies) {
              comment.replies = deleteRecursive(comment.replies)
            }
            return true
          })
        }
    
        comments.value = deleteRecursive(comments.value)
        saveToStorage()
      }


    // --- 删除回复 ---
    const deleteReply = (commentId: number, replyId: number) => {
        const parent = findCommentById(comments.value, commentId);
        if (parent && parent.replies) {
            parent.replies = parent.replies.filter(reply => reply.id !== replyId);
            saveToStorage();
        }
    }


    // --- 点赞评论或回复 ---
    const toggleLike = (id: number) => {
        const target = findCommentById(comments.value, id)
        if (target) {
            target.liked = !target.liked
            saveToStorage()
        }
    }



    // 初始化
    loadFromStorage()

    return {
        comments,
        addComment,
        deleteComment,
        deleteReply,
        toggleLike,
        addReply
    }
})
