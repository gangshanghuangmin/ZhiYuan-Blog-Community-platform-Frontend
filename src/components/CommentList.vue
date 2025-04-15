<template>
  <div class="comment-list">
    <div v-for="comment in comments" :key="comment.id" class="comment-item">
      <div class="comment-header">
        <img :src="comment.avatar" alt="avatar" class="comment-avatar" />
        <div class="comment-author">{{ comment.username }}</div>
        <div class="comment-time">{{ comment.time }}</div>
        <div class="comment-actions">
          <span @click="toggleReplyBox(comment.id)">💬 回复</span>
          <span @click="likeComment(comment)">👍 {{ comment.liked ? '已赞' : '点赞' }}</span>
          <span @click="deleteComment(comment.id)">🗑 删除</span>
        </div>
      </div>

      <div class="comment-content">
        <p>{{ comment.content }}</p>
        <div v-if="comment.image" class="image-container">
          <img :src="comment.image" class="comment-image" />
        </div>
      </div>

      <!-- 回复输入框 -->
      <div class="reply-editor" v-if="activeReplyBox === comment.id">
        <el-input v-model="replyContent[comment.id]" placeholder="请输入回复内容" type="textarea" size="small" rows="2"
          @keydown.enter.native="submitReply(comment.id)" />

        <el-button type="primary" size="small" @click="submitReply(comment.id)">回复</el-button>
      </div>

      <!-- 嵌套回复列表 -->

      <div class="replies" v-if="comment.replies && comment.replies.length">
        <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
          <div class="reply-header">
            <img :src="reply.avatar" class="comment-avatar" />
            <span class="comment-author">{{ reply.username }}</span>
            <span class="comment-time">{{ reply.time }}</span>
            <span class="comment-actions">
              <span @click="likeReply(reply)">👍 {{ reply.liked ? '已赞' : '点赞' }}</span>
              <span @click="deleteReply(comment.id, reply.id)">🗑 删除</span>
            </span>
          </div>
          <div class="reply-content">{{ reply.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCommentStore } from '@/stores/commentstore'

defineProps({
  comments: Array
})

const commentStore = useCommentStore()
const replyContent = reactive({})
const activeReplyBox = ref(null)

// 切换回复框显示
const toggleReplyBox = (id) => {
  activeReplyBox.value = activeReplyBox.value === id ? null : id
}

// 删除评论
const deleteComment = (id) => {
  commentStore.deleteComment(id)
}

// 点赞评论
const likeComment = (comment) => {
  commentStore.toggleLike(comment.id)
}

// 提交回复
const submitReply = (commentId) => {
  const content = replyContent[commentId]?.trim()
  if (!content) return

  const reply = {
    id: Date.now(),
    username: '匿名用户',
    avatar: 'https://img2.baidu.com/it/u=3464597771,2753621965&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    content,
    time: new Date().toLocaleString(),
    liked: false
  }

  commentStore.addReply(commentId, reply)
  replyContent[commentId] = ''
  activeReplyBox.value = null
}

// 点赞回复
const likeReply = (reply) => {
  reply.liked = !reply.liked
}

// 删除回复
const deleteReply = (commentId, replyId) => {
  commentStore.deleteReply(commentId, replyId)
}
</script>

<style scoped>
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  background-color: #fafafa;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-author {
  font-weight: bold;
}

.comment-time {
  font-size: 12px;
  color: #888;
  margin-left: auto;
}

.comment-actions span {
  margin-left: 10px;
  font-size: 12px;
  color: #409EFF;
  cursor: pointer;
}

.comment-content {
  margin-top: 10px;
}

.image-container {
  margin-top: 10px;
}

.comment-image {
  width: 200px;
  height: 120px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.reply-editor {
  margin-top: 10px;
}

.replies {
  margin-top: 10px;
  border-top: 1px dashed #ccc;
  padding-top: 10px;
}

.reply-item {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 6px 10px;
  margin-bottom: 6px;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reply-content {
  margin-left: 40px;
  font-size: 14px;
}
</style>