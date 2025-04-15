<template>
    <div>
      <CommentEditor @submit="addComment" />
      <CommentList :comments="store.comments" />
    </div>
  </template>
  
  <script setup>
  import { useCommentStore } from '@/stores/commentstore'
  import CommentEditor from './CommentEditor.vue'
  import CommentList from './CommentList.vue'
  
  const store = useCommentStore()
  const addComment = (comment) => {
    store.addComment(comment)
  }
  </script>
  