<script setup lang="ts">
import { searchIssues } from '@/api'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const catelog = ref(route.params.catelog || 'All') // 使用 ref 动态绑定分类
const searchResult = ref()
const issueList = ref()

useHead(() => ({
  title: catelog.value || 'All',
}))

async function handleSearch(q: string) {
  const { data } = catelog.value !== 'All'
    ? await searchIssues(q, { milestone: catelog.value })
    : await searchIssues(q)
  searchResult.value = data.value
  issueList.value = insertYearToPosts(data.value?.items)
}

// 监听路由参数变化
watch(
  () => route.params.catelog,
  (newCatelog) => {
    catelog.value = newCatelog || 'All' // 更新分类
    handleSearch('') // 重新加载数据
  },
  { immediate: true } // 初始化时立即触发
)
</script>

<template>
  <div>
    <sub-nav />
    <div class="flex items-center m-y-2em">
      <div class="flex-auto border-b-1 border-dashed border-current op-30" />
      <div class="m-x-1em">
        A total of <b> {{ searchResult?.total_count || '?' }} </b> articles
      </div>
      <div class="flex-auto border-b-1 border-dashed border-current op-30" />
    </div>

    <ul>
      <template v-for="(issue, index) in issueList" :key="issue.id">
        <div
          v-if="issue.isMarked" class="relative pointer-events-none select-none h-20"
          slide-enter :style="{ '--stagger': index + 1 }"
        >
          <span
            class="text-8em font-bold font-mono op-15 absolute -top-0.2em -left-0.3em color-transparent text-stroke-2 text-stroke-hex-aaa"
          >{{ issue.year }}</span>
        </div>
        <IssueCell
          v-else
          slide-enter :style="{ '--stagger': index + 1 }"
          :issue="issue"
        />
      </template>
    </ul>
  </div>
</template>