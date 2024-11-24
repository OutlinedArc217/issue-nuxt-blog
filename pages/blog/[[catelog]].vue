<script setup lang="ts">
import { searchIssues } from '@/api'
import { watch, ref } from 'vue'
import { useRoute, useHead } from 'vue-router'

const route = useRoute()
// 设置初始分类，默认值为 'All'
const catelog = ref(route.params.catelog || 'All')

useHead({
  title: catelog.value,
})

const searchResult = ref()
const issueList = ref()

// 搜索函数
async function handleSearch(q: string) {
  const { data } = catelog.value !== 'All' 
    ? await searchIssues(q, { milestone: catelog.value }) 
    : await searchIssues(q)
  searchResult.value = data.value
  issueList.value = insertYearToPosts(data.value?.items)
}

// 初次加载
handleSearch('')

// 监听路由参数变化
watch(
  () => route.params.catelog,
  (newCatelog) => {
    catelog.value = newCatelog || 'All'
    handleSearch('') // 重新触发搜索
  },
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