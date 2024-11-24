<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useHead } from '#imports' // 使用 Nuxt 3 提供的全局方法

// 获取当前路由参数
const route = useRoute()

// 设置初始分类，默认值为 'All'
const catelog = ref(route.params.catelog || 'All')

// 动态设置页面标题
useHead({
  title: catelog.value,
})

const searchResult = ref()
const issueList = ref()

// 搜索函数
async function handleSearch(q: string) {
  // 如果分类是 'All'，不传 milestone 参数
  const { data } = catelog.value !== 'All'
    ? await $fetch('/api/searchIssues', { params: { q, milestone: catelog.value } })
    : await $fetch('/api/searchIssues', { params: { q } })

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
    useHead({ title: catelog.value }) // 更新页面标题
    handleSearch('') // 重新触发搜索
  }
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