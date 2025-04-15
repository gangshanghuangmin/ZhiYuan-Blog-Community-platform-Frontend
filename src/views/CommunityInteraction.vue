<template>
  <div class="community-interaction">
    <h1>社区互动</h1>
    <CommentEditor @submit="addComment" />
    <CommentList :comments="comments" />
  </div>
</template>

<script setup>
import CommentEditor from '@/components/CommentEditor.vue'
import CommentList from '@/components/CommentList.vue'
import { useCommentStore } from '@/stores/commentStore'
import { storeToRefs } from 'pinia'

// 使用 Pinia store
const commentStore = useCommentStore()
const { comments } = storeToRefs(commentStore) // 保证响应式
const addComment = commentStore.addComment
</script>

<style scoped>
.community-interaction {
  padding: 20px;
}
</style>
